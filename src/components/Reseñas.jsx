import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reseñasData = [
  {
    nombre: "Nacho",
    comentario:
      "Excelente experiencia de cambio! Primera vez que utilizo el servicio y todo joya, cargaron mi cuenta literalmente en 4 minutos",
    fecha: "2025-10-15T14:02:00",
    estrellas: 5,
  },
  {
    nombre: "Sofi",
    comentario:
      "Muy rápido y confiable, la transacción se completó sin problemas. Recomendado!",
    fecha: "2025-10-14T11:47:00",
    estrellas: 5,
  },
  {
    nombre: "Martín",
    comentario:
      "Todo perfecto, atención clara y carga inmediata de saldo. Volveré a usar el servicio.",
    fecha: "2025-10-13T16:20:00",
    estrellas: 5,
  },
];

export default function SliderReseñas() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % reseñasData.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${año} • ${horas}:${minutos}`;
  };

  return (
    <div className="w-full flex flex-col items-center mb-10 bg-white">
      {/* ✅ Título agregado */}
      <h2 className="text-xl italic font-medium text-center text-gray-800 mb-6">
        Opiniones de nuestros clientes
      </h2>

      <div className="relative w-full overflow-hidden flex justify-center items-center">
        <div className="w-full max-w-xl h-72 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full text-center px-8"
            >
              {/* Estrellas */}
              <div className="flex justify-center mb-4">
                {[...Array(reseñasData[index].estrellas)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Comentario */}
              <p className="italic text-gray-700 text-lg mb-6">
                “{reseñasData[index].comentario}”
              </p>

              {/* Nombre */}
              <p className="font-semibold text-gray-900">
                {reseñasData[index].nombre}
              </p>

              {/* Fecha */}
              <p className="text-gray-500 text-sm mt-1">
                {formatFecha(reseñasData[index].fecha)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}