import React, { useState, useEffect, useMemo } from "react";
import { LinkIcon, Zap } from "lucide-react";

/* -----------------------
Mock / Reemplazar con llamada real a la API
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
Helpers de formato
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
PayPal fee: 5.4% + 0.30 USD
----------------------- */
const applyPayPalFee = (grossUSD) => {
  const fee = grossUSD * 0.054 + 0.3;
  const net = grossUSD - fee;
  return net;
};

/* -----------------------
Spreads
----------------------- */
// Spreads generales
const SPREAD_COMPRAR = 0.08;
const SPREAD_VENDER = 0.09;

// Tipos de cambio MXN
const MXN_RATE_VENDER = 16.00;
const MXN_RATE_COMPRAR = 16.50;

// Tipos de cambio BRL
const BRL_RATE_VENDER = 4.80;
const BRL_RATE_COMPRAR = 4.90;

// Tipos de cambio COP
const COP_RATE_VENDER = 3340;
const COP_RATE_COMPRAR = 3400;

const SHOW_BUEN_PRECIO = true;

export default function Calculadora() {
  const [operation, setOperation] = useState("vender");
  const [dolarBlue, setDolarBlue] = useState({ compra: 0, venta: 0 });

  const [variacion, setVariacion] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  const [usd, setUsd] = useState(5);
  const [ars, setArs] = useState("");
  const [lastEdited, setLastEdited] = useState("usd");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
  fullName: "",
  paypalEmail: "",
  whatsapp: "",
  cbu: "",
  bankOrWallet: "",
  clabe: "",
  pix: "",      // ← FALTA AGREGAR
  nequi: ""     // ← FALTA AGREGAR
});

  const [minMessage, setMinMessage] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  /* -----------------------
  Obtener cotización
  ----------------------- */
  useEffect(() => {
    const getBlue = async () => {
      try {
        if (!localStorage.getItem("limpiezaHecha")) {
          localStorage.clear();
          localStorage.setItem("limpiezaHecha", "true");
        }

        const data = await fetchDolarBlue();

        const lastSaved = localStorage.getItem("ultimoDolarBlue");
        const parsedLast = lastSaved ? JSON.parse(lastSaved) : null;

        if (parsedLast && parsedLast.venta > 0 && isFinite(parsedLast.venta)) {
          const cambio =
            ((data.venta - parsedLast.venta) / parsedLast.venta) * 100;

          if (isFinite(cambio) && cambio !== 0) {
            setVariacion(cambio.toFixed(2));
            localStorage.setItem("variacionDolarBlue", cambio.toFixed(2));
          } else {
            const lastVar = localStorage.getItem("variacionDolarBlue");
            if (lastVar) setVariacion(lastVar);
          }
        } else {
          setVariacion(null);
        }

        if (data.venta > 0 && isFinite(data.venta)) {
          localStorage.setItem("ultimoDolarBlue", JSON.stringify(data));
          setDolarBlue(data);
        }

        const ahora = new Date();
        const fechaFormateada = ahora.toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const horaFormateada = ahora.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setUltimaActualizacion(`${fechaFormateada} · ${horaFormateada} hs`);
      } catch (err) {
        console.error("Error al traer cotización:", err);
        setVariacion(null);
      }
    };

    getBlue();
    const interval = setInterval(getBlue, 30000);
    return () => clearInterval(interval);
  }, []);

  /* -----------------------
  Tipo aplicado según operación
  ----------------------- */
  const tipoAplicado = useMemo(() => {
    if (operation === "comprar") {
      return dolarBlue.venta * (1 - SPREAD_COMPRAR);
    } else {
      return dolarBlue.compra * (1 - SPREAD_VENDER);
    }
  }, [operation, dolarBlue]);

  /* -----------------------
  Sincronización USD <-> ARS
  ----------------------- */
  useEffect(() => {
    if (!tipoAplicado || tipoAplicado === 0) return;

    if (lastEdited === "usd") {
      const calc = (parseFloat(usd) || 0) * tipoAplicado;
      setArs(Number.isFinite(calc) ? calc.toFixed(2) : "");
    } else {
      const calc = (parseFloat(ars) || 0) / tipoAplicado;
      setUsd(Number.isFinite(calc) ? Number(calc.toFixed(2)) : "");
    }

    const currUsd =
      lastEdited === "usd"
        ? Number(usd)
        : Number((parseFloat(ars) || 0) / tipoAplicado);

    if (isNaN(currUsd) || currUsd < 5) {
      setMinMessage("Ingresa un mínimo de 5 USD");
    } else {
      setMinMessage("");
    }
  }, [usd, ars, tipoAplicado, lastEdited]);

  /* -----------------------
  Recalcular al cambiar operación
  ----------------------- */
  useEffect(() => {
    if (lastEdited === "usd") setUsd((u) => Number(u));
    else setArs((a) => a);
  }, [operation]);

  /* -----------------------
  PayPal neto
  ----------------------- */
  const usdGrossForBuyer = useMemo(() => Number(usd) || 0, [usd]);
  const usdNetForBuyer = useMemo(() => {
    if (operation !== "comprar") return 0;
    const net = applyPayPalFee(usdGrossForBuyer);
    return net > 0 ? Number(net.toFixed(2)) : 0;
  }, [usdGrossForBuyer, operation]);

  // -----------------------
  // Cálculo MXN
  // -----------------------
  const mxn =
    operation === "vender"
      ? usd * MXN_RATE_VENDER
      : usd * MXN_RATE_COMPRAR;

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
    setArs(v.replace(/[^0-9.,]/g, "").replace(",", "."));
  };

  const handleFormChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { fullName, paypalEmail, whatsapp, cbu, bankOrWallet } = formData;
    if (selectedCurrency === "ARS") {
      if (!fullName || !paypalEmail || !whatsapp || !cbu || !bankOrWallet) {
        alert("Completa todos los campos obligatorios.");
        return;
      }
    }

    if (selectedCurrency === "MXN") {
      if (!fullName || !paypalEmail || !whatsapp) {
        alert("Completa todos los campos obligatorios.");
        return;
      }

      if (operation === "vender" && !formData.clabe) {
        alert("Ingresa tu número CLABE.");
        return;
      }
    }

    if (Number(usd) < 5) {
      alert("Ingresa un mínimo de 5 USD");
      return;
    }

    let message = `¡Hola! Quiero iniciar un intercambio

Tipo de intercambio
${operation === "vender" ? "Vender saldo" : "Comprar saldo"}

Monto USD
${formatUSD(usd)} USD
`;

    if (selectedCurrency === "ARS") {
      message += `
Monto ARS
$${formatARS(ars)} ARS

Mis Datos

Nombre
${formData.fullName}

Email PayPal
${formData.paypalEmail}

WhatsApp
${formData.whatsapp}

CBU / CVU
${formData.cbu}

Banco / Billetera
${formData.bankOrWallet}
`;
    } else if (selectedCurrency === "MXN") {
      message += `
Monto MXN
$${mxn.toFixed(2)} MXN

Mis Datos

Nombre
${formData.fullName}

Email PayPal
${formData.paypalEmail}

WhatsApp
${formData.whatsapp}
`;

      if (operation === "vender") {
        message += `
Número de cuenta CLABE
${formData.clabe}
`;
      } else if (operation === "comprar") {
        message += `
Al enviar tu pedido, te daremos un link de AstroPay para que completes tu pago.
`;
      }
    }

    else if (selectedCurrency === "BRL") {
  const montoBRL =
    operation === "vender"
      ? (usd * BRL_RATE_VENDER).toFixed(2)
      : (usd * BRL_RATE_COMPRAR).toFixed(2);

  message += `
Monto BRL
$${montoBRL} BRL

Mis Datos

Nombre
${formData.fullName}

Email PayPal
${formData.paypalEmail}

WhatsApp
${formData.whatsapp}
`;

  if (operation === "vender") {
    message += `
Tu clave Pix
${formData.pix}
`;
  }

  if (operation === "comprar") {
    message += `
Al enviar tu pedido, te daremos un link para que completes tu pago.
`;
  }
    }

    else if (selectedCurrency === "COP") {
  const montoCOP =
    operation === "vender"
      ? (usd * COP_RATE_VENDER).toFixed(2)
      : (usd * COP_RATE_COMPRAR).toFixed(2);

  message += `
Monto COP
$${montoCOP} COP

Mis Datos

Nombre
${formData.fullName}

Email PayPal
${formData.paypalEmail}

WhatsApp
${formData.whatsapp}
`;

  // Si VENDE → debe ingresar su número Nequi
  if (operation === "vender") {
    message += `
Número teléfono Nequi
${formData.nequi}
`;
  }

  // Si COMPRA → mensaje de link de pago
  if (operation === "comprar") {
    message += `
Al enviar tu pedido, te daremos un link para que completes tu pago.
`;
  }
}

    const whatsappUrl =
      "https://api.whatsapp.com/send?phone=5493548610510&text=" +
      encodeURIComponent(message.trim());

    window.open(whatsappUrl, "_blank");
    setShowForm(false);
  };

  const venderBtnClasses =
    operation === "vender"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-800";

  const comprarBtnClasses =
    operation === "comprar"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-800";

  /* -----------------------
  JSX
  ----------------------- */
  return (
    <>
      <div className="bg-white mb-8 p-6 md:p-8 max-w-md mx-auto w-full shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setOperation("vender")}
            className={`w-full py-3 rounded-lg font-semibold text-lg ${venderBtnClasses}`}
          >
            Vender
          </button>

          <button
            onClick={() => setOperation("comprar")}
            className={`w-full py-3 rounded-lg font-semibold text-lg ${comprarBtnClasses}`}
          >
            Comprar
          </button>
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Compra ${dolarBlue.compra} / Venta ${dolarBlue.venta}
          </p>

          {ultimaActualizacion && (
            <p className="mt-1 mb-6 text-xs text-gray-500 italic">
              Última actualización {ultimaActualizacion}
            </p>
          )}

          <h3 className="text-3xl font-semibold text-gray-700 mt-4 mb-6">
           Elige entre ARS, MXN, BRL o COP para recibir o pagar
          </h3>
        </div>

        <div className="space-y-10">
          {/* USD Input */}
          <div>
            <label className="block text-sm font-medium text-left text-gray-700 mb-2">
              {operation === "vender" ? "Tú envías" : "Tú compras"}
            </label>
            <div className="relative">
              <img
                src="https://i.postimg.cc/Dyt3zDBw/1000011533.png"
                alt="PayPal Logo"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-18 w-28"
              />
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={usd}
                onChange={onChangeUsd}
                className="w-full p-4 pl-16 text-3xl font-medium border border-gray-400 outline-none rounded-lg text-center"
              />
              <span className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500">
                USD
              </span>
            </div>
          </div>         

          {/* MXN Input */}
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                {operation === "vender" ? "Tú recibes" : "Tú pagas"}
              </label>
            </div>

            <div className="mt-2 relative">           

              <div
                onClick={() => setSelectedCurrency("MXN")}
                className={`mb-8 relative p-3 rounded-lg cursor-pointer transition border border-gray-400 ${
                  selectedCurrency === "MXN" ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <img
                  src="https://i.postimg.cc/tgDtZFdj/Flag-of-Mexico-svg.png"
                  alt="MXN"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl h-10 w-14"
                />

                <input
                  type="text"
                  value={usd ? mxn.toFixed(2) : ""}
                  readOnly
                  className="w-full p-2 pl-6 text-3xl font-medium bg-transparent outline-none rounded-lg text-center"
                />

                <span className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500">
                  MXN
                </span>
              </div>
              

              {operation === "comprar" && (
      <div className="absolute -top-3 right-1 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow z-10">
        <LinkIcon size={14} className="text-gray-700" />
        <span className="text-xs font-medium text-gray-700">
          Paga con link o QR al instante
        </span>
      </div>
              )}

              {operation === "vender" && (
      <div className="absolute -top-3 right-1 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow z-10">
        <Zap size={14} className="text-gray-700" />
        <span className="text-xs font-medium text-gray-700">
          Envío rápido por CLABE
        </span>
      </div>
              )}
            </div>

            {/* BRL Input */}
            <div
              onClick={() => setSelectedCurrency("BRL")}
              className={`mb-8 relative p-2 rounded-lg cursor-pointer transition border border-gray-400 ${
                selectedCurrency === "BRL" ? "bg-blue-50" : "bg-gray-50"
              }`}
            >

              {/* SPAN SEGÚN OPERACIÓN */}
              {operation === "vender" ? (
                // VENDER → PIX
                <div className="absolute -top-3 right-1 flex items-center bg-white px-2 py-1 rounded-full shadow z-10">
                  <Zap size={14} className="text-gray-700 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    Envío rápido por Pix
                  </span>
                </div>
              ) : (
                // COMPRAR → LINK/QR
                <div className="absolute -top-3 right-1 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow z-10">
                  <LinkIcon size={14} className="text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">
                    Paga con link o QR al instante
                  </span>
                </div>
              )}

              <img
                src="https://i.postimg.cc/wBpJ6kG0/Flag-of-Brazil-svg.png"
                alt="BRL"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl h-10 w-14"
              />

              <input
                type="text"
                value={
                  usd
                    ? (operation === "vender" ? usd * BRL_RATE_VENDER : usd * BRL_RATE_COMPRAR).toFixed(2)
                    : ""
                }
                readOnly
                className={`w-full p-2 pl-10 text-3xl font-medium outline-none rounded-lg text-center ${
                  selectedCurrency === "BRL" ? "bg-blue-50" : "bg-gray-50"
                }`}
              />

              <span className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500">
                BRL
              </span>
            </div>

            {/* COP Input */}
<div
  onClick={() => setSelectedCurrency("COP")}
  className={`mb-8 relative p-2 rounded-lg cursor-pointer transition border border-gray-400 ${
    selectedCurrency === "COP" ? "bg-blue-50" : "bg-gray-50"
  }`}
>

  {/* BADGE ARRIBA A LA DERECHA */}
  <div className="absolute -top-3 right-1 flex items-center bg-white px-2 py-1 rounded-full shadow z-10">
    {operation === "vender" ? (
      <>
        <Zap size={14} className="text-gray-700 mr-1" />
        <span className="text-xs font-medium text-gray-700">
          Envío rápido por Nequi
        </span>
      </>
    ) : (
      <>
        <LinkIcon size={14} className="text-gray-700 mr-1" />
        <span className="text-xs font-medium text-gray-700">
          Paga con link o QR al instante
        </span>
      </>
    )}
  </div>

  <img
    src="https://i.postimg.cc/j2y84bkZ/images.webp"
    alt="COP"
    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl h-10 w-14"
  />

  <input
    type="text"
    value={
      usd
        ? (operation === "vender"
            ? usd * COP_RATE_VENDER
            : usd * COP_RATE_COMPRAR
          ).toFixed(2)
        : ""
    }
    readOnly
    className={`w-full p-2 pl-10 text-3xl font-medium outline-none rounded-lg text-center ${
      selectedCurrency === "COP" ? "bg-blue-50" : "bg-gray-50"
    }`}
  />

  <span className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500">
    COP
  </span>
</div>

            <div
              onClick={() => setSelectedCurrency("ARS")}
              className={`relative mt-6 p-1 rounded-lg cursor-pointer transition border border-gray-300 ${
                selectedCurrency === "ARS" ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              {/* SPAN SEGÚN OPERACIÓN */}
              {operation === "vender" ? (
                // VENDER → cbu
                <div className="absolute -top-3 right-1 flex items-center bg-white px-2 py-1 rounded-full shadow z-10">
                  <Zap size={14} className="text-gray-700 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    Envío rápido por CBU / CVU
                  </span>
                </div>
              ) : (
                // COMPRAR → LINK/QR
                <div className="absolute -top-3 right-1 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow z-10">
                  <LinkIcon size={14} className="text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">
                    Paga con CBU / CVU al instante
                  </span>
                </div>
              )}
            >
              <img
                src="https://i.postimg.cc/0yxDfVFF/Flag-of-Argentina-svg.png"
                alt="ARS"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl h-10 w-14"
              />

              <input
                type="text"
                readOnly
                inputMode="decimal"
                value={ars ? ars : ""}
                onChange={onChangeArs}
                className="w-full p-4 pl-10 text-3xl font-medium bg-transparent outline-none rounded-lg text-center"
                placeholder="0.00"
              />

              <span className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500">
                ARS
              </span>
            </div>
          </div>
        </div>

        {minMessage && (
          <div className="mt-4 text-center text-sm text-red-600 font-medium">
            {minMessage}
          </div>
        )}

        {operation === "comprar" && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200 text-sm">
            <strong>USD netos a recibir en PayPal </strong>
            <div className="text-xl font-bold mt-1">
              {formatUSD(usdNetForBuyer)} USD
            </div>
            <div className="text-xs text-semibold mt-1">
              PayPal te cobrará  una comisión de {(usdGrossForBuyer * 0.054 + 0.3).toFixed(2)} USD (5.4% + 0.30 USD)
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
  onClick={() => setShowForm(true)}
  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600"
  disabled={!!minMessage || !selectedCurrency}
>
  Iniciar Operación
</button>
        </div>
      </div>

      {/* FORM Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-left">
              Completa tus datos para continuar
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Nombre y Apellido */}
              <div>
                <label className="block text-sm font-medium text-left text-gray-700">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Ej: María Pérez"
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email de PayPal */}
              <div>
                <label className="block text-sm font-medium text-left text-gray-700">
                  E-mail de PayPal
                </label>
                <input
                  type="email"
                  name="paypalEmail"
                  placeholder="Ej: micorreo@gmail.com"
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 text-left italic mt-1">
                  La cuenta PayPal debe ser del mismo titular que realiza la operación.
                </p>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-left text-gray-700">
                  Número de WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  onChange={handleFormChange}
                  required
                  inputMode="numeric"
                  placeholder="Ej: +55 21 99888 7777"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Texto SOLO si compra y paga con BRL */}
{selectedCurrency === "BRL" && operation === "comprar" && (
  <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded-md border border-yellow-200">
    Al enviar tu pedido, te daremos un link para que completes tu pago con tu método de pago preferido.
  </p>
)}

              {selectedCurrency === "MXN" && operation === "vender" && (
                <div>
                  <label className="block text-sm font-medium text-left text-gray-700">
                    Número CLABE para transferencia
                  </label>
                  <input
                    type="text"
                    name="clabe"
                    onChange={handleFormChange}
                    required
                    pattern="[0-9]+"
                    placeholder="Recibirás tus pesos en esta cuenta"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Clave Pix */}
              {selectedCurrency === "BRL" && operation === "vender" && (
                <div>
                  <label className="block text-sm font-medium text-left text-gray-700">
                    Tu clave Pix
                  </label>
                  <input
                    type="text"
                    name="pix"
                    onChange={handleFormChange}
                    required
                    placeholder="Ej: miclave@pix.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Campo Nequi solo si el usuario VENDE y seleccionó COP */}
{operation === "vender" && selectedCurrency === "COP" && (
  <div>
    <label className="block text-sm font-medium text-left text-gray-700">
      Número teléfono Nequi
    </label>
    <input
      type="text"
      name="nequi"
      onChange={handleFormChange}
      required
      placeholder="Ej: 3001234567"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
)}

              {/* Texto SOLO si compra y paga con COP */}
{selectedCurrency === "COP" && operation === "comprar" && (
  <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded-md border border-yellow-200">
    Al enviar tu pedido, te daremos un link para que completes tu pago con tu método de pago preferido. 
  </p>
)}

              {selectedCurrency === "MXN" && operation === "comprar" && (
                <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded-md border border-yellow-200">
                  Al enviar tu pedido, te daremos un link para que completes tu pago con tu método de pago preferido.
                </p>
              )}

              {selectedCurrency === "ARS" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">
                      CBU / CVU
                    </label>
                    <input
                      type="text"
                      name="cbu"
                      onChange={handleFormChange}
                      required={selectedCurrency === "ARS"}
                      pattern="[0-9]+"
                      title="Ingrese solo números"
                      placeholder={
                        operation === "vender"
                          ? "Recibirás tus pesos en esta cuenta"
                          : "Pagarás desde esta cuenta"
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-left text-gray-700">
                      Banco o Billetera virtual
                    </label>
                    <input
                      type="text"
                      name="bankOrWallet"
                      placeholder="Ej: Mercado Pago"
                      onChange={handleFormChange}
                      required={selectedCurrency === "ARS"}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

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