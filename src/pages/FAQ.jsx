import React, { useState } from "react";

const faqs = [
  {
    section: "Para compradores",
    items: [
      {
        question: "¿Cómo funciona el proceso de compra de saldo PayPal?",
        answer:
          "Haces tu cotización en la calculadora, envías tus datos y el pedido por WhatsApp, y nosotros mediamos la operación con un vendedor confiable.",
      },
      {
        question: "¿Cuánto tarda en llegar el saldo a mi cuenta?",
        answer: "Entre 10 y 30 minutos después de que envies tus pesos.",
      },
      {
        question: "¿Debo registrarme para comprar saldo?",
        answer: "No, no es necesario registrarse. Solo necesitas completar tu cotización y enviar tu pedido por WhatsApp.",
      },
      {
        question: "¿Qué pasa si no pago en el tiempo acordado?",
        answer:
          "Si no envías el pago en el plazo máximo de 30 minutos, la operación se cancela automáticamente.",
      },
      {
        question: "¿Qué pasa si hay algún problema con la transacción?",
        answer:
          "Nosotros mediamos y garantizamos la operación. En caso de disputa malintencionada, nos hacemos cargo y reembolsamos los pesos pagados.",
      },
    ],
  },
  {
    section: "Para vendedores",
    items: [
      {
        question: "¿Qué información debo proporcionar para vender saldo?",
        answer:
          "Nombre completo, email de PayPal, WhatsApp, DNI, CBU/CVU y Banco o billetera virtual para recibir pagos.",
      },
      {
        question: "¿Cómo me aseguro que recibiré los fondos correctamente?",
        answer:
          "Solo mediamos operaciones con compradores confiables y garantizamos la entrega de los pesos acordados.",
      },
      {
        question: "¿Debo enviar los pagos como donación o normal?",
        answer:
          "Te indicamos en cada operación cómo enviar los fondos correctamente, sin dirección física.",
      },
      {
        question: "¿Se aceptan reembolsos una vez enviado el saldo?",
        answer:
          "No, una vez que envías el saldo, no se aceptan reembolsos bajo ningún motivo, ya que esto perjudica a la contraparte y puede generar problemas con PayPal.",
      },
      {
        question: "¿En cuánto tiempo recibiré los pesos acordados?",
        answer:
          "Recibirás tus pesos entre 10 y 30 minutos luego de comprobar que la contraparte recibió el saldo en su cuenta.",
      },
    ],
  },
  {
    section: "Sobre la plataforma",
    items: [
      {
        question: "¿La cotización está actualizada?",
        answer:
          "Sí, la cotización se actualiza automáticamente cada 30 segundos, por lo que siempre tendrás el valor correcto al momento de tu operación.",
      },
      {
        question: "¿Es seguro operar en la plataforma?",
        answer:
          "Todos los vendedores con los que trabajamos son clientes confiables de años, nunca ha habido problemas, y mediamos cada operación para garantizar que se cumpla lo acordado.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Preguntas Frecuentes (FAQ)</h1>
      {faqs.map((section, sectionIdx) => (
        <div key={section.section} className="mb-10">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">{section.section}</h2>
          <div className="space-y-2">
            {section.items.map((item, itemIdx) => {
              const key = `${sectionIdx}-${itemIdx}`;
              const isOpen = openIndex === key;
              return (
                <div key={key} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggle(sectionIdx, itemIdx)}
                    className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-normal"
                  >
                    <span>{item.question}</span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 bg-white text-gray-700 text-sm">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}