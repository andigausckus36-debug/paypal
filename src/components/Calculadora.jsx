import React, { useState, useEffect, useMemo } from "react";

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
const SPREAD_COMPRAR = 0.08;
const SPREAD_VENDER = 0.13;

export default function Calculadora() {
  const [operation, setOperation] = useState("vender"); // 'vender' | 'comprar'
  const [dolarBlue, setDolarBlue] = useState({ compra: 0, venta: 0 });

  // Dual inputs
  const [usd, setUsd] = useState(30);
  const [ars, setArs] = useState("");
  const [lastEdited, setLastEdited] = useState("usd");

  // Form modal y datos del formulario
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    paypalEmail: "",
    whatsapp: "",
    dni: "",
    cbu: "",
    bankOrWallet: "",
  });

  // Mensaje mínimo
  const [minMessage, setMinMessage] = useState("");

  /* -----------------------
  Obtener cotización
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
      const valUsd = parseFloat(usd) || 0;
      const calcArs = valUsd * tipoAplicado;
      setArs(Number.isFinite(calcArs) ? calcArs.toFixed(2) : "");
    } else {
      const valArs = parseFloat(ars) || 0;
      const calcUsd = valArs / tipoAplicado;
      setUsd(Number.isFinite(calcUsd) ? Number(calcUsd.toFixed(2)) : "");
    }

    const currUsd =
      lastEdited === "usd"
        ? Number(usd)
        : Number((parseFloat(ars) || 0) / tipoAplicado);

    if (isNaN(currUsd) || currUsd < 30) {
      setMinMessage("Ingresa un mínimo de 30 USD");
    } else {
      setMinMessage("");
    }
  }, [usd, ars, tipoAplicado, lastEdited]);

  /* -----------------------
  Recalculo al cambiar operación
  ----------------------- */
  useEffect(() => {
    if (lastEdited === "usd") setUsd((u) => Number(u));
    else setArs((a) => a);
  }, [operation]);

  /* -----------------------
  PayPal neto para comprador
  ----------------------- */
  const usdGrossForBuyer = useMemo(() => (Number(usd) || 0), [usd, operation]);
  const usdNetForBuyer = useMemo(() => {
    if (operation !== "comprar") return 0;
    const net = applyPayPalFee(usdGrossForBuyer);
    return net > 0 ? Number(net.toFixed(2)) : 0;
  }, [usdGrossForBuyer, operation]);

  /* -----------------------
  Handlers inputs
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    const { fullName, paypalEmail, whatsapp, dni, cbu, bankOrWallet } = formData;
    if (!fullName || !paypalEmail || !whatsapp || !dni || !cbu || !bankOrWallet) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (Number(usd) < 30) {
      alert("Ingresa un mínimo de 30 USD");
      return;
    }

    // Armar mensaje WhatsApp
    const message = `
    ¡Hola! Quiero iniciar un intercambio

    Tipo de intercambio
    ${operation === "vender" ? "Vender saldo" : "Comprar saldo"}

    Monto USD
    ${formatUSD(usd)} USD

    Monto ARS
    $${formatARS(ars)} ARS


    Mis Datos

    Nombre y Apellido
    ${formData.fullName}

    Email de PayPal
    ${formData.paypalEmail}

    WhatsApp
    ${formData.whatsapp}

    DNI
    ${formData.dni}

    CBU / CVU
    ${formData.cbu}

    Banco o Billetera virtual
    ${formData.bankOrWallet}

    Nota: El titular de la cuenta de PayPal debe ser el mismo que realiza la operación.
    `;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5493548563662&text=${encodeURIComponent(
      message.trim()
    )}`;
    window.open(whatsappUrl, "_blank");
    setShowForm(false);
  };

  /* -----------------------
  Clases para botones
  ----------------------- */
  const venderBtnClasses =
    operation === "vender" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800";
  const comprarBtnClasses =
    operation === "comprar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800";

  return (
    <>
      <div className="bg-white mb-8 p-6 md:p-8 max-w-md mx-auto w-full shadow-md">
        <h2 className="text-3xl md:text-3xl font-medium italic text-gray-700 text-center mb-6">
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

        <div className="space-y-10">
          {/* USD input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {operation === "vender" ? "Tú envías (USD)" : "Tú recibes (USD)"}
            </label>
            <div className="relative">
              <img
                src="https://i.postimg.cc/Dyt3zDBw/1000011533.png"
                alt="PayPal Logo"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-18 w-28"
              />
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
              <span className="absolute inset-y-0 right-4 flex items-center text-xl text-gray-500">
                USD
              </span>
            </div>
          </div>

          {/* ARS input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                {operation === "vender" ? "Tú recibes (ARS)" : "Tú pagas (ARS)"}
              </label>
              {operation === "vender" ? (
                <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  -{SPREAD_VENDER * 100}% Blue
                </span>
              ) : (
                <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  -{SPREAD_COMPRAR * 100}% Blue
                </span>
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
              <span className="absolute inset-y-0 right-4 flex items-center text-xl text-gray-500">
                ARS
              </span>
            </div>
            <p className="mt-3 text-center text-gray-800 bg-gray-100 border border-gray-200 rounded-lg py-1 px-4 font-normal italic text-sm shadow-sm">
              {operation === "vender"
                ? <>Te enviamos los pesos en 10 a 30 minutos <span className="text-2xl">⚡</span></>
                : <>Cargamos tu cuenta en 10 a 30 minutos <span className="text-2xl">⚡</span></>}
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Compra ${dolarBlue.compra} / Venta ${dolarBlue.venta}</p>
          <p className="mt-2">Tipo cambio aplicado ${tipoAplicado ? tipoAplicado.toFixed(2) : "—"} ARS</p>
        </div>

        {minMessage && (
          <div className="mt-4 text-center text-sm text-red-600 font-medium">{minMessage}</div>
        )}

        {operation === "comprar" && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200 text-sm">
            <strong>USD netos a recibir en tu cuenta PayPal</strong>
            <div className="text-xl font-bold mt-1">{formatUSD(usdNetForBuyer)} USD</div>
            <div className="text-xs text-gray-600 mt-1">
              Si compras {formatUSD(usdGrossForBuyer)} USD, PayPal retendrá {(usdGrossForBuyer * 0.054 + 0.3).toFixed(2)} USD en comisiones (5.4% + 0.30 USD)
            </div>
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
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Completa tus datos para continuar
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Nombre y Apellido */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700">
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
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número de WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  onChange={handleFormChange}
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  title="Ingrese exactamente 10 números"
                  placeholder="Ej: 3512345678"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número de DNI
                </label>
                <input
                  type="number"
                  name="dni"
                  onChange={handleFormChange}
                  required
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Ej: 12345678"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* CBU / CVU */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CBU / CVU
                </label>
                <input
                  type="text"
                  name="cbu"
                  onChange={handleFormChange}
                  required
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

              {/* Banco o Billetera virtual */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Banco o Billetera virtual
                </label>
                <input
                  type="text"
                  name="bankOrWallet"
                  placeholder="Ej: Mercado Pago"
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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