import React from 'react';
import Calculadora from '../components/Calculadora';
import ContactForm from '../components/ContactForm';
import CarouselDots from '../components/CarouselDots';

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
        <p className="text-4xl md:text-2xl font-bold italic text-gray-600 mt-2 max-w-2xl mx-auto text-center">
          Compra y vende tu saldo PayPal de forma simple y segura con excelentes cotizaciones y un tiempo récord de 10 a 30 minutos en los intercambios.
        </p>
      </header>

      {/* Sección "Cómo funciona" */}
      <section className="max-w-4xl w-full mb-16 shadow-md">
        <div className="bg-white p-6 grid md:grid-cols-3 gap-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">1</div>
            <h3 className="font-semibold">Elegí operación</h3>
            <p className="text-sm text-gray-500 mt-1">
              Seleccioná si querés comprar o vender saldo PayPal y escribí el monto.
            </p>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">2</div>
            <h3 className="font-semibold">Completá tus datos</h3>
            <p className="text-sm text-gray-500 mt-1">
              Ingresá tu nombre, email de PayPal, WhatsApp y enlace a tu perfil.
            </p>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">3</div>
            <h3 className="font-semibold">Envianos tu pedido</h3>
            <p className="text-sm text-gray-500 mt-1">
              Te abrimos un chat de WhatsApp con los datos prellenados para confirmar la operación.
            </p>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <main className="w-full max-w-md mb-12">
        <Calculadora />
      </main>

      {/* Carrusel sin flechas */}
      <CarouselDots images={imagenes} interval={5000} />

      {/* Formulario de contacto con ID para scroll */}
      <section id="contacto" className="w-full max-w-md mb-12">
        <ContactForm />
      </section>
    </div>
  );
}