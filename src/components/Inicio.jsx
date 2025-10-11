import React from 'react';
import Calculadora from '../components/Calculadora';
import ContactForm from '../components/ContactForm';
import CarouselDots from '../components/CarouselDots';

export default function HomePage() {
  const imagenes = [
    "https://i.postimg.cc/KjNWhs2t/Screenshot-20251011-132641-Whats-App.jpg",
    "https://i.postimg.cc/XY78pcRP/IMG-20251006-WA0371.jpg",
    "https://i.postimg.cc/J47Jq7pP/IMG-20251007-WA0525.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">

      {/* Inicio */}
      <section id="inicio" className="w-full">
        <header className="text-center mb-8 mt-6">
          <p className="text-4xl md:text-2xl font-bold italic text-gray-600 mt-2 max-w-2xl mx-auto text-center">
            Compra y vende tu saldo PayPal de forma simple, rápida y segura con excelentes cotizaciones y actualizadas en tiempo real.
          </p>
        </header>
      </section>

      {/* Sección “Cómo funciona” (solo informativa) */}
      <section className="max-w-4xl w-full mb-16 shadow-md">
        <div className="bg-white p-6 grid md:grid-cols-3 gap-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">1</div>
            <h3 className="font-semibold">Elegí operación</h3>
            <p className="text-sm text-gray-500 mt-1">Selecciona si queres comprar o vender saldo PayPal y escribi el monto.</p>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">2</div>
            <h3 className="font-semibold">Completá tus datos</h3>
            <p className="text-sm text-gray-500 mt-1">Ingresa tu nombre y apellido, email de PayPal, WhatsApp, DNI, CBU/ CVU y Banco.</p>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">3</div>
            <h3 className="font-semibold">Envianos tu pedido</h3>
            <p className="text-sm text-gray-500 mt-1">Te abrimos un chat a WhatsApp con los datos prellenados para confirmar el intercambio.</p>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="w-full max-w-md mb-12">
        <Calculadora />
      </section>

      {/* Carrusel de intercambios recientes */}
      <section id="intercambios" className="w-full max-w-4xl">
        
        <CarouselDots images={imagenes} interval={5000} />
      </section>

      {/* Formulario de contacto */}
      <section id="contacto" className="w-full max-w-md mb-12">
        <ContactForm />
      </section>

    </div>
  );
}