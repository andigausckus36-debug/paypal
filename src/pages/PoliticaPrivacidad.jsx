import React from "react";

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8">
          Política de Privacidad
        </h1>

        <section className="space-y-6 text-gl leading-relaxed">
          <p>
            En <strong>SaldoPayPal</strong> valoramos la privacidad de nuestros
            usuarios. Esta política explica cómo recopilamos, utilizamos y
            protegemos la información personal proporcionada durante el uso de
            nuestro sitio web y los servicios de intercambio ofrecidos.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            1. Información que recopilamos
          </h2>
          <p>
            Solo solicitamos la información necesaria para realizar los
            intercambios de saldo PayPal, específicamente:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Nombre y apellido</li>
            <li>Correo electrónico asociado a la cuenta PayPal</li>
            <li>Número de teléfono WhatsApp</li>
            <li>DNI (Documento Nacional de Identidad)</li>
            <li>CBU o CVU y nombre del banco o billetera virtual</li>
          </ul>

          <p>
            No requerimos registro ni creación de cuenta. Los datos se recopilan
            únicamente cuando el usuario completa el formulario de cotización y
            envía su pedido por WhatsApp.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            2. Uso de la información
          </h2>
          <p>
            La información proporcionada se utiliza exclusivamente para:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Identificar correctamente a las partes del intercambio.</li>
            <li>Contactar al usuario por WhatsApp para coordinar la operación.</li>
            <li>Verificar la titularidad de las cuentas involucradas.</li>
            <li>Garantizar el correcto envío y recepción de fondos.</li>
          </ul>

          <p>
            En ningún caso compartimos, vendemos o cedemos tus datos a terceros
            fuera del proceso de intercambio. Solo los agentes autorizados de{" "}
            <strong>SaldoPayPal</strong> acceden a esta información.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            3. Comunicación por WhatsApp
          </h2>
          <p>
            Todas las operaciones se gestionan mediante WhatsApp. Al enviar tu
            solicitud de cotización, aceptás que te contactemos a través del
            número que hayas proporcionado para coordinar la transacción.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            4. Protección de datos
          </h2>
          <p>
            Tomamos medidas razonables de seguridad para proteger tus datos
            personales frente a accesos no autorizados, pérdidas o
            modificaciones. Sin embargo, recordá que ningún sistema de
            transmisión de información por Internet es 100% seguro.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            5. Conservación de la información
          </h2>
          <p>
            Los datos se conservan únicamente durante el tiempo necesario para
            gestionar la transacción y resolver cualquier inconveniente o
            reclamo posterior. Luego, son eliminados de nuestros registros.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            6. Veracidad de la información
          </h2>
          <p>
            El usuario declara que toda la información proporcionada es veraz,
            completa y actualizada. En caso de detectar datos falsos o
            inconsistentes, <strong>SaldoPayPal</strong> podrá cancelar la
            operación y bloquear futuras solicitudes.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            7. Enlaces externos
          </h2>
          <p>
            Nuestro sitio puede contener enlaces a plataformas externas como
            PayPal, bancos o billeteras virtuales. <strong>SaldoPayPal</strong>{" "}
            no se responsabiliza por las políticas de privacidad ni el uso de
            datos en dichos sitios.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            8. Actualización de la política
          </h2>
          <p>
            Esta política puede ser modificada o actualizada en cualquier
            momento. Las versiones vigentes estarán disponibles siempre en esta
            misma página.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            9. Contacto
          </h2>
          <p>
            Si tenés dudas o querés ejercer tus derechos de acceso, rectificación
            o eliminación de datos, podés escribirnos a nuestro canal de contacto
            oficial de WhatsApp disponible en el sitio.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            <strong>Última actualización:</strong> Octubre 2025
          </p>
        </section>
      </div>
    </div>
  );
}