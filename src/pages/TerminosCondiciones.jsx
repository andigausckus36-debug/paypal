import React from "react";

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8">
          Términos y Condiciones
        </h1>

        <section className="space-y-6 text-md leading-relaxed">
          <p>
            Bienvenido a <strong>SaldoPayPal</strong>. Al utilizar nuestro sitio
            web y realizar una cotización o intercambio, aceptás los siguientes
            términos y condiciones. Si no estás de acuerdo con alguno de ellos,
            por favor no utilices el servicio.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            1. Introducción
          </h2>
          <p>
            SaldoPayPal ofrece un servicio de intermediación entre personas que
            desean <strong>comprar o vender saldo PayPal en dólares (USD)</strong> a cambio de{" "}
            <strong>pesos argentinos (ARS)</strong>. Todas las operaciones se
            gestionan mediante <strong>WhatsApp</strong>. Nuestro rol es conectar
            a las partes, coordinar la transacción y garantizar que ambas
            cumplan correctamente con el intercambio.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            2. Cómo funciona
          </h2>
          <p>
            El usuario realiza una <strong>cotización</strong> desde el sitio,
            completa sus datos personales (nombre y apellido, correo de PayPal,
            WhatsApp, DNI, CBU o CVU y banco o billetera virtual), y envía su pedido. Un agente de{" "}
            <strong>SaldoPayPal</strong> lo contactará por WhatsApp para coordinar
            la operación y buscar una contraparte disponible.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            3. Moneda y medios de pago
          </h2>
          <p>
            SaldoPayPal <strong>solo trabaja con pesos argentinos (ARS)</strong>.
            Los pagos se realizan mediante <strong>depósito bancario</strong> o{" "}
            <strong>transferencia CBU o CVU</strong>.
          </p>
          <p>
            Antes de confirmar la operación, se consulta a la persona que
            recibirá los pesos si está de acuerdo con el medio de pago
            propuesto. El vendedor debe ingresar correctamente su{" "}
            <strong>CBU o CVU</strong> y el nombre del{" "}
            <strong>banco o billetera virtual</strong> al completar el formulario.
            SaldoPayPal no se responsabiliza por datos bancarios incorrectos.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            4. Cotización congelada
          </h2>
          <p>
            Una vez enviado el pedido, la cotización queda{" "}
            <strong>congelada y garantizada</strong>. Si el valor del dólar blue
            cambia después, se respetará la cotización mostrada al momento del
            pedido, tanto para compras como para ventas.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            5. Disponibilidad
          </h2>
          <p>
            Puede suceder que, al momento del pedido, no haya una contraparte
            disponible para realizar el intercambio. En ese caso, la solicitud
            quedará en espera hasta que encontremos a alguien interesado. Te
            notificaremos por WhatsApp apenas la operación pueda concretarse.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            6. Envío de saldo PayPal
          </h2>
          <p>
            El vendedor debe enviar el saldo PayPal como{" "}
            <strong>donación</strong> o{" "}
            <strong>pago sin dirección (sin domicilio)</strong>, según las
            indicaciones brindadas por el agente durante el intercambio. Esto
            evita retenciones o bloqueos por parte de PayPal.
          </p>

          <h2 className="text-2xl font-semibold text-blue-600">
            7. Veracidad de los datos
          </h2>
          <p>
            El usuario que vende saldo PayPal debe ser el{" "}
            <strong>titular real de la cuenta PayPal</strong> desde la cual se
            enviarán los fondos. Todos los datos personales deben ser{" "}
            <strong>reales, verificables y coincidir con el DNI</strong>. Si se
            detectan inconsistencias, suplantación de identidad o actividad
            sospechosa, SaldoPayPal podrá cancelar la operación.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            8. Rol de SaldoPayPal
          </h2>
          <p>
            SaldoPayPal <strong>no es una entidad financiera</strong> ni ofrece
            cambio oficial. Actuamos solo como{" "}
            <strong>intermediarios y mediadores</strong> entre particulares, para
            garantizar transacciones seguras y rápidas. No nos hacemos
            responsables por demoras causadas por PayPal, bancos o billeteras
            virtuales.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            9. Comunicación
          </h2>
          <p>
            Toda la comunicación durante el proceso se realiza{" "}
            <strong>únicamente por WhatsApp</strong>, desde los números oficiales
            indicados en nuestro sitio.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            10. Cancelaciones
          </h2>
          <p>
            SaldoPayPal puede cancelar o suspender una operación si:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Se detecta actividad sospechosa o intento de fraude.</li>
            <li>El usuario no envía el dinero en el tiempo establecido.</li>
            <li>Se proporcionan datos falsos o incorrectos.</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">
  11. Reembolsos
</h2>
<p>
  Una vez que el usuario ha enviado los fondos en USD a través de PayPal para vender su saldo,
  la operación se considera <strong>finalizada y no reembolsable</strong> bajo ningún concepto,
  incluyendo disputas por arrendamiento, servicios no recibidos u otros motivos.
  Esto se debe a que los reembolsos o disputas injustificadas pueden afectar negativamente a la
  contraparte que recibe los fondos y generar restricciones en las cuentas PayPal involucradas.
</p>

<p className="mt-2">
  Cualquier intento de abrir una disputa falsa o con el objetivo de recuperar los USD luego de haber
  recibido los pesos será considerado un <strong>acto de mala fe y una estafa</strong>.

  En tales casos, SaldoPayPal se reserva el derecho de iniciar las acciones legales correspondientes,
  incluyendo la presentación de denuncias por fraude o apropiación indebida ante las autoridades competentes.
</p>

<p className="mt-2">
  SaldoPayPal media las operaciones de forma imparcial y garantiza que los fondos sean entregados
  según lo acordado entre las partes. Se solicita a los usuarios verificar cuidadosamente los montos,
  direcciones y datos antes de confirmar el envío, ya que una vez ejecutada la operación no podrá revertirse.
</p>

<h2 className="text-xl font-semibold text-blue-600 mt-8">
  12. Modificaciones
</h2>
<p>
  SaldoPayPal puede modificar estos términos en cualquier momento. Las actualizaciones se
  publicarán en esta página y tendrán vigencia inmediata desde su publicación.
</p>

<p className="text-sm text-gray-500 mt-8">
  <strong>Última actualización:</strong> Octubre 2025
</p>
        </section>
      </div>
    </div>
  );
}