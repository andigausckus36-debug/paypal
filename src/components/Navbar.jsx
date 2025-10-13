import React, { useState } from "react";

export default function Navbar({ goToPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToContacto = () => {
    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactoClick = () => {
    // Si ya estamos en la página de inicio, solo hacemos scroll
    if (window.location.hash === "" || window.location.hash === "#inicio") {
      scrollToContacto();
    } else {
      // Si no estamos en la home, cambiamos de página y luego hacemos scroll
      goToPage("inicio");
      setTimeout(scrollToContacto, 600); // espera breve para asegurar que el DOM cargue
    }
  };

  return (
    <nav className="w-full bg-white py-5 px-6 relative shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Menú hamburguesa izquierda */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Logo centrado */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button onClick={() => goToPage("inicio")}>
            <img
              src="https://i.postimg.cc/CK5R5vjk/1000014500.png"
              alt="SaldoPayPal Logo"
              className="h-24 w-auto"
            />
          </button>
        </div>

        {/* Menú desktop */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => goToPage("inicio")}
            className="text-gray-800 hover:text-blue-600"
          >
            Inicio
          </button>
          <button
            onClick={() => goToPage("garantia")}
            className="text-gray-800 hover:text-blue-600"
          >
            Garantía para compradores
          </button>
          <button
            onClick={() => goToPage("faq")}
            className="text-gray-800 hover:text-blue-600"
          >
            FAQ
          </button>
          <button
            onClick={handleContactoClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Contacto
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 bg-white shadow-md p-4 rounded-lg">
          <button
            onClick={() => {
              goToPage("inicio");
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-blue-600 text-left"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              goToPage("garantia");
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-blue-600 text-left"
          >
            Garantía para compradores
          </button>
          <button
            onClick={() => {
              goToPage("faq");
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-blue-600 text-left"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              handleContactoClick();
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-blue-600 text-left"
          >
            Contacto
          </button>
        </div>
      )}
    </nav>
  );
}