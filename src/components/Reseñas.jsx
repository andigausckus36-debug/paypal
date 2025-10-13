import React, { useState } from "react";
import { Star } from "lucide-react";

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([
    { nombre: "Juan Diaz", estrellas: 5, mensaje: "Excelente servicio, todo bien, la operación fue rápida y segura. Buen servicio!", fecha: "13/10/2025", hora: "14:05" },
    { nombre: "Mica", estrellas: 5, mensaje: "Muy buena atención por WhatsApp. El intercambio fue todo un éxito. En el tiempo que dicen ya tenia los dolares en mi cuenta 😁", fecha: "12/10/2025", hora: "16:40" },
  ]);

  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);

  // Mostrar formulario solo si ?auth=ok en el hash
  const mostrarFormulario = new URLSearchParams(window.location.hash.split('?')[1]).get("auth") === "ok";

  const enviarReseña = (e) => {
    e.preventDefault();
    if (!nombre || !mensaje || puntuacion === 0) {
      alert("Por favor completá todos los campos y seleccioná las estrellas ⭐");
      return;
    }

    const nuevaReseña = {
      nombre,
      estrellas: puntuacion,
      mensaje,
      fecha: new Date().toLocaleDateString("es-AR"),
      hora: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };

    setReseñas([nuevaReseña, ...reseñas]);
    setNombre("");
    setMensaje("");
    setPuntuacion(0);
  };

  return (
    <section id="reseñas" className="py-8 bg-white">
      <div className="text-left mb-10">
        <h2 className="text-2xl font-medium text-gray-700 italic mb-4">Opiniones de nuestros clientes</h2>
        <p className="text-gray-600">Leé las reseñas reales de quienes ya operaron con nosotros</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {reseñas.map((r, i) => (
          <div key={i} className="bg-white p-6 shadow-md rounded-xl border border-gray-100 text-left">
            <div className="flex items-center mb-2">
              {[...Array(r.estrellas)].map((_, j) => (
                <Star key={j} size={20} className="text-yellow-500 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-800 italic mb-3">“{r.mensaje}”</p>
            <p className="text-sm text-gray-500">
              {r.nombre} <br />
              {r.fecha} · {r.hora} hs
            </p>
          </div>
        ))}

        {mostrarFormulario && (
          <form onSubmit={enviarReseña} className="mt-10 bg-white p-6 rounded-xl shadow-md space-y-4 border-t-4 border-blue-500 max-w-lg mx-auto">
            <h3 className="font-semibold text-lg text-gray-800">📝 Compartí tu opinión con los demás</h3>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Tu mensaje..."
              rows="3"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex items-center gap-2">
              <span className="text-gray-700">Puntuación:</span>
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={28}
                  onClick={() => setPuntuacion(num)}
                  className={`cursor-pointer transition ${
                    num <= puntuacion ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Enviar reseña
            </button>
          </form>
        )}
      </div>
    </section>
  );
}