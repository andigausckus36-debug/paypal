import React from 'react';
import Calculadora from '../components/Calculadora';
import ContactForm from '../components/ContactForm';
import ReseñasFB from '../components/Reseñas'; // <-- Importamos el componente de reseñas

export default function Inicio() {
  const imagenes = [
    "https://i.postimg.cc/KjNWhs2t/Screenshot-20251011-132641-Whats-App.jpg",
    "https://i.postimg.cc/XY78pcRP/IMG-20251006-WA0371.jpg",
    "https://i.postimg.cc/J47Jq7pP/IMG-20251007-WA0525.jpg",
  ];

  return (
    <div id="inicio" className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">

      {/* Encabezado */}
      <header className="text-center mb-8 mt-6">
        <p className="text-2xl md:text-2xl font-bold italic text-gray-600 mt-2 max-w-2xl mx-auto text-center">
          ¡Comprá y vendé tu saldo PayPal de forma simple y segura con excelentes cotizaciones y un tiempo récord de 10 a 30 minutos en los intercambios!
        </p>

        {/* Ilustración debajo del título */}
        <div className="flex justify-center mt-6 mb-6">
          <img
            src="https://i.postimg.cc/3NDy21s5/6617.jpg"
            alt="Ilustración intercambio"
            className="w-full max-w-lg object-contain"
          />
        </div>

        {/* Calculadora */}
      <main className="w-full max-w-md mb-12">
        <Calculadora />
      </main>

        {/* Reseñas de Facebook justo debajo de la calculadora */}
<ReseñasFB />

        {/* Ventajas principales con fondo destacado */}
        <div className="mt-8 w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-6 md:p-10 rounded-xl shadow-lg flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto text-left mb-6">

          <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm flex-1">
            <span className="text-3xl">⚡</span>
            <div>
              <p className="font-semibold text-gray-800">Transacciones rápidas</p>
              <p className="text-gray-700 text-sm">Tus operaciones se concretan en 10 a 30 minutos, sin demoras ni esperas innecesarias.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm flex-1">
            <span className="text-3xl">💬</span>
            <div>
              <p className="font-semibold text-gray-800">Soporte humano por WhatsApp</p>
              <p className="text-gray-700 text-sm">Resolvemos cualquier inconveniente en el momento, sin tickets ni respuestas automáticas de bots que no te entienden.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm flex-1">
            <span className="text-3xl">🔒</span>
            <div>
              <p className="font-semibold text-gray-800">Seguro y confiable</p>
              <p className="text-gray-700 text-sm">Tus pagos se envían y reciben de forma segura, garantizando la operación correcta siempre.</p>
            </div>
          </div>

        </div>
      </header>


      {/* Cómo funciona */}
      <section className="w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-6 md:p-10 rounded-xl shadow-lg max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-primary mb-2">1</div>
            <h3 className="font-semibold text-lg">Elegí operación</h3>
            <p className="text-sm text-gray-600 mt-2">
              Seleccioná si querés comprar o vender saldo PayPal y escribí el monto.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-primary mb-2">2</div>
            <h3 className="font-semibold text-lg">Completá tus datos</h3>
            <p className="text-sm text-gray-600 mt-2">
              Ingresá tu nombre y apellido, email de PayPal, WhatsApp, CBU / CVU y Banco o billetera.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <h3 className="font-semibold text-lg">Envianos tu pedido</h3>
            <p className="text-sm text-gray-600 mt-2">
              Te abrimos un chat de WhatsApp con los datos prellenados para confirmar la operación.
            </p>
          </div>

        </div>
      </section>


      {/* Formulario de contacto */}
      <section id="contacto" className="w-full max-w-md mb-12">
        <ContactForm />
      </section>

    </div>
  );
}