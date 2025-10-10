import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} SaldoPayPal. Todos los derechos reservados.
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/politica-privacidad" className="text-gray-600 hover:text-gray-800 text-sm">Política de privacidad</a>
          <a href="/terminos" className="text-gray-600 hover:text-gray-800 text-sm">Términos y condiciones</a>
          <a href="https://www.instagram.com/" target="_blank" className="text-gray-600 hover:text-gray-800 text-sm">Instagram</a>
          <a href="https://www.facebook.com/" target="_blank" className="text-gray-600 hover:text-gray-800 text-sm">Facebook</a>
        </div>
      </div>
    </footer>
  );
}