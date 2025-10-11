import React, { useState } from "react";

export default function Navbar({ goToPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white py-7 px-6 relative">
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
              className="h-32 w-auto" // tamaño más grande sin aumentar navbar
            />
          </button>
        </div>

        {/* Menú de botones derecha en desktop */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => goToPage("inicio")}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            Inicio
          </button>
          <button
            onClick={() => goToPage("garantia")}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            Garantía para compradores
          </button>
          <button
            onClick={() => goToPage("faq")}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            FAQ
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contacto")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            Contacto
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 bg-white shadow-md p-4 rounded-lg">
          <button
            onClick={() => { goToPage("inicio"); setMenuOpen(false); }}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            Inicio
          </button>
          <button
            onClick={() => { goToPage("garantia"); setMenuOpen(false); }}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            Garantía para compradores
          </button>
          <button
            onClick={() => { goToPage("faq"); setMenuOpen(false); }}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            FAQ
          </button>
          <button
            onClick={() => { 
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-blue-600 font-normal text-left"
          >
            Contacto
          </button>
        </div>
      )}
    </nav>
  );
}