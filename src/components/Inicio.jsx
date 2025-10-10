import React from 'react';
import Calculadora from '../components/Calculadora';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
      <header className="text-center mb-8 mt-6">
        
        <p className="text-4xl md:text-2xl font-bold italic text-gray-600 mt-2 max-w-2xl mx-auto text-center">
  Compra y vende tu saldo PayPal de forma simple, rápida y segura con cotizaciones actualizadas en tiempo real.
</p>
      </header>

      {/* Sección "Cómo funciona" (arriba de la calculadora) */}
      <section className="max-w-4xl w-full mb-8">
        <div className="bg-white p-6 grid md:grid-cols-3 gap-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">1</div>
            <h3 className="font-semibold">Elegí operación</h3>
            <p className="text-sm text-gray-500 mt-1">Selecciona si queres comprar o vender saldo PayPal y escribi el monto.</p>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">2</div>
            <h3 className="font-semibold">Completá tus datos</h3>
            <p className="text-sm text-gray-500 mt-1">Ingresa tu nombre, email de PayPal, WhatsApp y enlace a tu perfil.</p>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-2">3</div>
            <h3 className="font-semibold">Envianos tu pedido</h3>
            <p className="text-sm text-gray-500 mt-1">Te abrimos un chat a WhatsApp con los datos prellenados para confirmar la operación.</p>
          </div>
        </div>
      </section>

      <main className="w-full max-w-md">
        <Calculadora />
      </main>

      
    </div>
  );
}