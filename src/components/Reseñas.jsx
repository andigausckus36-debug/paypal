import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Repeat, Clock } from "lucide-react";

// ✅ Banderas
const FLAGS = {
  ar: "https://i.postimg.cc/MGNgBvQ7/Flag-of-Argentina-svg.png",
  mx: "https://i.postimg.cc/6pQP1dVd/Flag-of-Mexico-svg.png",
};

// ✅ Reseñas con mejoras
const reseñasData = [
  {
    nombre: "Luis Hernández",
    comentario: "Chevere, le pagué con un link, se acreditó de inmediato y me enviaron los USD bastante rapido también. Gracias, ahora puedo comprar mi juego en Ebay 😁",
    fecha: "2025-12-08",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Guadalajara",
    metodo: "MXN → PayPal",
    tiempo: "25 min",
  },
  {
    nombre: "Juani Ponce",
    comentario: "Le pongo 3 estrellas porque me mandaron el dinero en 45 minutos siendo que pagan en 30 minutos máximo, pero aun así todo bien salió, y además se disculparon por la demora.",
    fecha: "2025-12-06",
    estrellas: 3,
    bandera: "ar",
    ciudad: "Bariloche",
    metodo: "PayPal → ARS",
    tiempo: "15 min",
  },
  {
    nombre: "Matias",
    comentario: "Todo perfecto, salió todo bien. Muy bueno el servicio, pensé que era estafa jaja, pero me arriesgué y salió todo bien",
    fecha: "2025-12-06T08:30:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Bariloche",
    metodo: "PayPal → ARS",
    tiempo: "15 min",
  },
  {
    nombre: "Luchi",
    comentario:
      "Estoy sorprendida por la velocidad en que cargaron mi cuenta y además la buena atención en todo momento del proceso. Gracias 😊",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Córdoba",
    metodo: "ARS → PayPal",
    tiempo: "20 min",
  },
  {
    nombre: "Diego Aguirre",
    comentario:
      "Super recomendables! Usaré nuevamente el servicio para cargar mi cuenta porque me funcionó y me mandaron el saldo bastante rapido.",
    fecha: "2025-12-03T07:30:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Moreno",
    metodo: "ARS → PayPal",
    tiempo: "25 min",
  },
  {
    nombre: "Luis",
    comentario: "primera venta de saldo y todo impecable!",
    fecha: "2025-12-02T14:15:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Pergamino",
    metodo: "PayPal → ARS",
    tiempo: "18 min",
  },
  {
    nombre: "Paula",
    comentario: "Super recomendables ❤️",
    fecha: "2025-11-29T15:26:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Rosario",
    metodo: "PayPal → ARS",
    tiempo: "40 min",
  },
  {
    nombre: "Lucia Almada",
    comentario:
      "Después de ver los comentarios probé con vender $20 y me mandaron los pesos a mi Ualá en 10 minutos.",
    fecha: "2025-11-29T15:26:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Guaymallen",
    metodo: "PayPal → ARS",
    tiempo: "10 min",
  },
];

export default function SliderReseñas() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % reseñasData.length);
    }, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    
    return `${dia}/${mes}/${año}`;
  };

  const review = reseñasData[index];

  return (
    <div className="w-full flex flex-col items-center mb-10 bg-white">
      {/* ✅ Título */}
      <h2 className="text-xl italic font-medium text-center text-gray-800 mb-3">
        Opiniones de nuestros clientes
      </h2>

      {/* ⭐ Promedio de puntuación */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-yellow-400 bg-white">
        <span className="text-yellow-600 font-bold text-gl">
          {(
            reseñasData.reduce((acc, r) => acc + r.estrellas, 0) /
            reseñasData.length
          ).toFixed(1)}
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex justify-center items-center">
        <div className="w-full max-w-xl h-96 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full text-center px-8"
            >
              {/* ⭐ Estrellas */}
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < review.estrellas
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 fill-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* 💬 Comentario más cerca del título */}
              <p className="italic text-gray-700 text-md mb-8">
                “{review.comentario}”
              </p>

              {/* ✅ Bloque inferior con 2 renglones */}
              <div className="flex flex-col mt-3 space-y-2">

                {/* 🧍 Primera fila: Nombre + fecha/hora + bandera */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col text-left">
                    <p className="font-semibold text-gray-900">
                      {review.nombre}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFecha(review.fecha)}
                    </p>
                  </div>

                  {/* 🇦🇷 / 🇲🇽 Bandera */}
                  {review.bandera && (
                    <img
                      src={FLAGS[review.bandera]}
                      alt="Bandera"
                      className="w-9 h-6 rounded-sm object-cover"
                    />
                  )}
                </div>

                {/* 🌎 Segunda fila: Ciudad + tiempo + tipo de operación */}
                <div className="flex justify-center gap-6 text-xs text-gray-500">

                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {review.ciudad}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.tiempo}
                  </span>

                  <span className="flex items-center gap-1">
                    <Repeat className="w-3 h-3" />
                    {review.metodo}
                  </span>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}