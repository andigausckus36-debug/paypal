import React from "react";

export default function GarantiaCompradores() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Garantía para compradores</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">1. Vendedores confiables</h2>
        <p>
          Todos los vendedores con los que trabajamos son clientes de <strong>varios años</strong> con
          historial impecable. Las transacciones se realizan de manera consistente, y el saldo PayPal
          siempre se envía en <strong>10 a 30 minutos</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">2. Seguridad del comprador</h2>
        <p>
          Una vez que realiza el pago, el comprador puede estar tranquilo: los USD comprados llegarán a
          su cuenta en el tiempo estipulado. Además, <strong>no se requiere dirección física</strong>,
          evitando posibles disputas.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Manejo de disputas y reembolsos</h2>
        <p>
          En caso de algún problema o disputa (muy raro), <strong>SaldoPayPal se hace responsable</strong>
          y garantiza <strong>reembolso total</strong> de los pesos enviados. Esto asegura que el
          comprador no quede perjudicado.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Justificación de la transacción</h2>
        <p>
          Para PayPal, quien envía saldo está “comprando algo”. Por ello, enviamos al comprador un
          correo con <strong>material digital</strong> (por ejemplo, ebooks o libros) que suman el
          total de la operación, junto con el <strong>comprobante de la “compra”</strong>. Esto
          sirve como evidencia en caso de que se intente abrir una disputa.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Instrucciones para el comprador</h2>
        <p>
          Al recibir el saldo, el comprador debe:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Hacer clic en <strong>"Agregar información de seguimiento"</strong>.</li>
          <li>En <strong>"Estado del pedido"</strong>, seleccionar <strong>Enviado</strong>.</li>
          <li>Marcar la casilla <strong>"Información de seguimiento no requerida"</strong> y enviar.</li>
        </ul>
        <p className="mt-2">
          Esto asegura que PayPal vea la transacción como digital, sin necesidad de envío físico,
          y evita posibles disputas por seguimiento.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Transparencia y documentación</h2>
        <p>
          Todas las operaciones quedan documentadas: correos con comprobantes y justificantes de la
          transacción se envían al comprador. Esto genera <strong>evidencia clara</strong> ante
          cualquier posible disputa.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Confirmación de datos</h2>
        <p>
          Es responsabilidad del comprador revisar cuidadosamente los <strong>montos, correo PayPal
          y demás datos</strong> antes de confirmar la operación. Esto garantiza que la transacción
          se realice sin inconvenientes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">8. Garantía de tiempo</h2>
        <p>
          Si el saldo no llega dentro del plazo estipulado (10 a 30 minutos), <strong>SaldoPayPal
          garantiza el reembolso completo de los pesos pagados</strong>.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-8">
        <strong>Última actualización:</strong> Octubre 2025
      </p>
    </div>
  );
}