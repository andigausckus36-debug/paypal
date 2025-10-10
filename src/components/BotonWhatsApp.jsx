import React from "react";

export default function BotonWhatsApp() {
  const numero = "+5493548563662";
  const mensaje = "Hola SaldoPayPal 👋 Quiero hacer una consulta";
  const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg animate-bounce hover:animate-none transition-all z-50"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-10 h-10"
      />
    </a>
  );
}