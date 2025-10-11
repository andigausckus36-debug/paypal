import React from "react";

export default function Footer({ goToPage }) {
  return (
    <footer className="bg-gray-100 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">

        {/* Fila 1 */}
        <div className="flex flex-col space-y-3 text-center">
          <button
            onClick={() => goToPage("inicio")}
            className="text-gray-600 hover:text-gray-800 text-base font-medium"
          >
            Inicio
          </button>
          <button
            onClick={() => goToPage("politica")}
            className="text-gray-600 hover:text-gray-800 text-base font-medium"
          >
            Política de privacidad
          </button>
          <button
            onClick={() => goToPage("terminos")}
            className="text-gray-600 hover:text-gray-800 text-base font-medium"
          >
            Términos y condiciones
          </button>
        </div>

        {/* Fila 2 */}
        <div className="flex flex-col space-y-3 text-center">
          <button
            onClick={() => goToPage("garantia")}
            className="text-gray-600 hover:text-gray-800 text-base font-medium"
          >
            Garantía para compradores
          </button>
          <button
            onClick={() => goToPage("faq")}
            className="text-gray-600 hover:text-gray-800 text-base font-medium"
          >
            FAQ
          </button>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-300 my-6"></div>

      {/* Copyright */}
      <div className="text-gray-600 text-center text-base">
        &copy; {new Date().getFullYear()} SaldoPayPal. Todos los derechos reservados.
      </div>
    </footer>
  );
}