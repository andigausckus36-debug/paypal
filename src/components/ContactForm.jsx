import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bnnzebb", // tu Service ID
        "template_sejvcqo", // tu Template ID
        form.current,
        "bPyuluLbPnsrzdGQz" // tu Public Key / User ID de EmailJS
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Mensaje enviado correctamente. Te responderemos lo antes posible.");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("Error al enviar el mensaje. Intenta nuevamente.");
        }
      );
  };

  return (
    <section className="w-full max-w-md bg-white p-6 mb-12 rounded shadow-md mt-12">
      <h2 className="text-2xl italic font-medium mb-4 text-left text-gray-700">¿Dudas? Contactanos</h2>

      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        {/* Nombre */}
        <input
          type="text"
          name="from_name"
          placeholder="Nombre"
          required
          className="p-4 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        {/* Email */}
        <input
          type="email"
          name="from_email"
          placeholder="Email"
          required
          className="p-4 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        {/* Asunto */}
        <input
          type="text"
          name="subject"
          placeholder="Asunto"
          required
          className="p-4 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        {/* Mensaje */}
        <textarea
          name="message"
          placeholder="Mensaje"
          rows="5"
          required
          className="p-4 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 transition-colors"
        >
          Enviar mensaje
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-green-500 italic font-medium">{status}</p>
      )}
    </section>
  );
}