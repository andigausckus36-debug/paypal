import React, { useState, useEffect, useMemo } from "react";

/**

Calculadora de compra/venta PayPal

Dual input: USD editable y ARS editable (ambos sincronizados)


Spreads aplicados sobre Dólar Blue (siempre < blue)


Mínimo 30 USD


PayPal fee: 5.4% + 0.30 USD (se aplica cuando corresponde)


Formulario obligatorio (WhatsApp solo numérico)


Reemplaza el fetchDolarBlue() por la llamada real a tu API (ej.: DolarAPI o Bluelytics)
*/


/* -----------------------
MOCK / Replace with real API call
----------------------- */
const fetchDolarBlue = async () => {
  try {
    const res = await fetch("https://dolarapi.com/v1/dolares/blue");
    const data = await res.json();
    return { compra: parseFloat(data.compra), venta: parseFloat(data.venta) };
  } catch (error) {
    console.error(error);
    return { compra: 0, venta: 0 };
  }
};

/* -----------------------
Helpers
----------------------- */
const formatARS = (number) => {
if (number === "" || isNaN(number)) return "";
return new Intl.NumberFormat("es-AR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
}).format(Number(number));
};

const formatUSD = (number) => {
if (number === "" || isNaN(number)) return "";
return new Intl.NumberFormat("en-US", {
minimumFractionDigits: 2,
maximumFractionDigits: 2,
}).format(Number(number));
};

/* -----------------------
PayPal fee: 5.4% + $0.30 (fija)
netReceived = grossUSD - (grossUSD * 0.054 + 0.30)
----------------------- */

const applyPayPalFee = (grossUSD) => {
const fee = grossUSD * 0.054 + 0.3;
const net = grossUSD - fee;
return net;
};

/* -----------------------
Spreads según tu pedido:

Para quien COMPRA saldo (usuario compra USD): usamos blue.venta con -3% (ejemplo)

Para quien VENDE saldo (usuario vende USD): usamos blue.compra con -12% (ejemplo)
Ajusta los valores a gusto.
----------------------- */


const SPREAD_COMPRAR = 0.06; // 3% debajo del blue.venta
const SPREAD_VENDER = 0.12;  // 12% debajo del blue.compra

export default function Calculadora() {

const [operation, setOperation] = useState("vender"); // 'vender' | 'comprar'
const [dolarBlue, setDolarBlue] = useState({ compra: 0, venta: 0 });

// Dual inputs: mantener valores numéricos
const [usd, setUsd] = useState(30); // monto en USD (si el usuario edita USD)
const [ars, setArs] = useState("");  // monto en ARS (si el usuario edita ARS)

// trackea cuál campo fue editado por última vez: 'usd' o 'ars'
const [lastEdited, setLastEdited] = useState("usd");

// Form modal
const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
fullName: "",
paypalEmail: "",
whatsapp: "",
socialProfile: "",
});

// Mensajes y validaciones
const [minMessage, setMinMessage] = useState("");

/* -----------------------
Obtener cotización (al montar y cada X segundos)
Reemplaza fetchDolarBlue por fetch real.
----------------------- */
useEffect(() => {
const getBlue = async () => {
try {
const data = await fetchDolarBlue();
setDolarBlue(data);
} catch (err) {
console.error("Error al traer cotización:", err);
}
};
getBlue();
const interval = setInterval(getBlue, 30000); // refresca cada 30s
return () => clearInterval(interval);
}, []);

/* -----------------------
Calcula los tipos aplicados (siempre por debajo del blue)
- tipoParaVentaAlCliente (cuando cliente compra USD) = blue.venta * (1 - SPREAD_COMPRAR)
- tipoParaCompraAlCliente (cuando cliente vende USD) = blue.compra * (1 - SPREAD_VENDER)
----------------------- */
const tipoAplicado = useMemo(() => {
if (operation === "comprar") {
// cliente compra USD -> usamos blue.venta
return dolarBlue.venta * (1 - SPREAD_COMPRAR);
} else {
// cliente vende USD -> usamos blue.compra
return dolarBlue.compra * (1 - SPREAD_VENDER);
}
}, [operation, dolarBlue]);

/* -----------------------
Sincronización dual USD <-> ARS
- Si el user editó USD: recalcular ARS = usd * tipoAplicado
- Si editó ARS: recalcular USD = ars / tipoAplicado
----------------------- */
useEffect(() => {
if (!tipoAplicado || tipoAplicado === 0) return;

if (lastEdited === "usd") {  
  const valUsd = parseFloat(usd) || 0;  
  const calcArs = valUsd * tipoAplicado;  
  setArs(Number.isFinite(calcArs) ? calcArs.toFixed(2) : "");  
} else {  
  const valArs = parseFloat(ars) || 0;  
  const calcUsd = valArs / tipoAplicado;  
  setUsd(Number.isFinite(calcUsd) ? Number(calcUsd.toFixed(2)) : "");  
}  

// Validación mínimo 30 USD  
const currUsd = lastEdited === "usd" ? Number(usd) : Number((parseFloat(ars) || 0) / tipoAplicado);  
if (isNaN(currUsd) || currUsd < 30) {  
  setMinMessage("Ingresa un mínimo de 30 USD");  
} else {  
  setMinMessage("");  
}  
// eslint-disable-next-line react-hooks/exhaustive-deps

}, [usd, ars, tipoAplicado, lastEdited]);

/* -----------------------
Cuando el usuario cambia el modo (comprar/vender) mantenemos los valores pero recalculamos según el nuevo tipo.
----------------------- */
useEffect(() => {
// forzar recalculo (cambia tipoAplicado)
if (lastEdited === "usd") {
setUsd((u) => Number(u)); // trigger
} else {
setArs((a) => a);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [operation]);

/* -----------------------
PayPal neto para la calculadora de quien COMPRA saldo:
- Si cliente compra USD (operation === 'comprar'), él paga ARS y recibe USD en su PayPal.
Debajo mostramos los USD NETOS que le llegarán luego de la comisión PayPal.
----------------------- */
const usdGrossForBuyer = useMemo(() => {
// Cuando operation === 'comprar', usd representa la cantidad bruta de USD que el usuario recibirá (antes de fee).
return Number(usd) || 0;
}, [usd, operation]);

const usdNetForBuyer = useMemo(() => {
if (operation !== "comprar") return 0;
const net = applyPayPalFee(usdGrossForBuyer);
return net > 0 ? Number(net.toFixed(2)) : 0;
}, [usdGrossForBuyer, operation]);

/* -----------------------
Handlers
----------------------- */
const onChangeUsd = (e) => {
setLastEdited("usd");
const v = e.target.value;
setUsd(v === "" ? "" : Number(v));
};

const onChangeArs = (e) => {
setLastEdited("ars");
const v = e.target.value;
// aceptar solo números y puntos (decimales). Aquí se guarda en string.
setArs(v.replace(/[^0-9.,]/g, "").replace(",", "."));
};

const handleFormChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleFormSubmit = (e) => {
e.preventDefault();
// validaciones finales
if (!formData.fullName || !formData.paypalEmail || !formData.whatsapp || !formData.socialProfile) {
alert("Completa todos los campos obligatorios.");
return;
}
if (Number(usd) < 30) {
alert("Ingresa un mínimo de 30 USD");
return;
}

  const message = `
  ¡Hola! Quiero iniciar una operación.
  Tipo de Operación: ${operation === "vender" ? "Vender saldo" : "Comprar saldo"}
  Monto USD (bruto): ${formatUSD(usd)} USD
  Monto ARS (${operation === "vender" ? "recibirás" : "pagarás"}): $ ${formatARS(ars)} ARS
  ${operation === "comprar" ? `USD netos en PayPal (después de fees): ${formatUSD(usdNetForBuyer)} USD` : ""}

  Mis Datos:
  Nombre y Apellido: ${formData.fullName}
  Email de PayPal: ${formData.paypalEmail}
  WhatsApp: ${formData.whatsapp}
  Perfil Social: ${formData.socialProfile}

  Nota: El titular de la cuenta de PayPal debe ser el mismo que realiza la operación.
  `;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=5493548563662&text=${encodeURIComponent(message.trim())}`;  
  window.open(whatsappUrl, "_blank");  
  setShowForm(false);

};

/* -----------------------
UI
----------------------- */
const venderBtnClasses = operation === "vender" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800";
const comprarBtnClasses = operation === "comprar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800";

return (
<>
<div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-md mx-auto w-full">

  {/* Texto antes de la calculadora */}
      <h2 className="text-3xl md:text-3xl font-bold italic text-gray-600 text-center mb-6">
        Realiza tu cotización
      </h2>
  
<div className="grid grid-cols-2 gap-4 mb-6">
  <button
    onClick={() => setOperation("vender")}
    className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors duration-300 ${venderBtnClasses}`}
  >
    Vender
  </button>

  <button
    onClick={() => setOperation("comprar")}
    className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors duration-300 ${comprarBtnClasses}`}
  >
    Comprar
  </button>
</div>

<div className="space-y-12">  
      {/* USD input */}  
      <div>  
        <label className="block text-sm font-medium text-gray-700 mb-1">  
          {operation === "vender" ? "Tú envías (USD)" : "Tú recibes (USD)"}  
        </label>  
        <div className="relative">  
          <img src="https://i.postimg.cc/Dyt3zDBw/1000011533.png" alt="PayPal Logo" className="absolute left-4 top-1/2 -translate-y-1/2 h-18 w-28" />  
          <input  
            type="number"  
            inputMode="decimal"  
            min="0"  
            step="0.01"  
            value={usd}  
            onChange={onChangeUsd}  
            className="w-full p-4 pl-14 text-2xl font-bold border border-gray-400 rounded-lg focus:outline-none focus:border-gray-500 text-center"  
            placeholder="30"  
          />  
          <span className="absolute inset-y-0 right-4 flex items-center text-xl text-gray-500">USD</span>  
        </div>  
      </div>  

      {/* ARS input (now editable) */}  
      <div>  
        <div className="flex justify-between items-center mb-1">  
          <label className="block text-sm font-medium text-gray-700">  
            {operation === "vender" ? "Tú recibes (ARS)" : "Tú pagas (ARS)"}  
          </label>  
          {operation === "vender" ? (  
            <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-full">-{SPREAD_VENDER * 100}% Blue</span>  
          ) : (  
            <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-full">-{SPREAD_COMPRAR * 100}% Blue</span>  
          )}  
        </div>  
        <div className="relative">  
          <input  
            type="text"  
            inputMode="decimal"  
            value={ars ? ars : ""}  
            onChange={onChangeArs}  
            className="w-full p-4 text-2xl font-bold bg-gray-50 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-500 text-center"  
            placeholder="0.00"  
          />  
          <span className="absolute inset-y-0 right-4 flex items-center text-xl text-gray-500">ARS</span>  
        </div>  
        <p className="mt-3 text-center text-gray-800 bg-gray-100 border border-gray-200 rounded-lg py-1 px-4 font-semibold text-sm shadow-sm">
          {operation === "vender"
            ? <>Te enviamos los pesos en 10 a 30 minutos <span className="text-2xl">⚡</span></>
            : <>Cargamos tu cuenta en 5 10 30 minutos <span className="text-2xl">⚡</span></>}
        </p>  
      </div>  
    </div>  

    <div className="text-center mt-6 text-sm text-gray-500">  
        
      <p>Compra ${dolarBlue.compra} / Venta ${dolarBlue.venta}</p>  
      <p className="mt-2">Tipo cambio aplicado ${tipoAplicado ? tipoAplicado.toFixed(2) : "—"} ARS</p>  
    </div>  

    {/* Mensaje mínimo */}  
    {minMessage && (  
      <div className="mt-4 text-center text-sm text-red-600 font-medium">  
        {minMessage}  
      </div>  
    )}  

    {operation === "comprar" && (  
      <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200 text-sm">  
        <strong>USD netos a recibir en tu cuenta PayPal</strong>  
        <div className="text-xl font-bold mt-1">{formatUSD(usdNetForBuyer)} USD</div>  
        <div className="text-xs text-gray-600 mt-1">Si compras {formatUSD(usdGrossForBuyer)} USD, PayPal retendrá {(usdGrossForBuyer * 0.054 + 0.3).toFixed(2)} USD en comisiones (5.4% + 0.30 USD)</div>  
      </div>  
    )}  

    <div className="mt-6">  
      <button  
        onClick={() => setShowForm(true)}  
        className="w-full block text-center bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-transform transform hover:scale-105 disabled:opacity-60"  
        disabled={!!minMessage}  
      >  
        Iniciar Operación  
      </button>  
    </div>  
  </div>  

  {/* FORM Modal */}  
  {showForm && (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">  
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">  
        <button onClick={() => setShowForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>  
        <h3 className="text-xl font-bold mb-4 text-gray-800">Completa tus datos para continuar</h3>  
        <form onSubmit={handleFormSubmit} className="space-y-4">  
          <div>  
            <label className="block text-sm font-medium text-gray-700">Nombre y apellido</label>  
            <input type="text" name="fullName" onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700">E-mail de PayPal</label>  
            <input type="email" name="paypalEmail" onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>  
            <p className="text-xs text-gray-500 mt-1">El titular de la cuenta de PayPal debe ser el mismo que realiza la operación.</p>  
          </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700">WhatsApp</label>  
              <input   
                type="tel"   
                name="whatsapp"   
                onChange={handleFormChange}   
                required   
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
              />  
            </div>  

            <div>  
              <label className="block text-sm font-medium text-gray-700">Red social (Instagram o Facebook)</label>  
              <input   
                type="text"   
                name="socialProfile"   
                onChange={handleFormChange}   
                placeholder="@usuario o enlace"  
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
              />  
            </div>  

            <button   
              type="submit"   
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"  
            >  
              Enviar pedido  
            </button>  
            </form>  
            </div>  
            </div>  
            )}  
            </>  
            );  
            }