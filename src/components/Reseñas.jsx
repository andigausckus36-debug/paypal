import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reseñasData = [
  {
    nombre: "Mati",
    comentario:
      "Todo perfecto, salió todo bien. Muy bueno el servicio",
    fecha: "2025-12-06T08:30:00",
    estrellas: 5,
  },
  {
    nombre: "LUCHI",
    comentario:
      "ESTOY MUY SORPRENDIDA POR LA VELOCIDAD EN QUE CARGARON MI CUENTA ♥ Y ADEMÁS LA EXCELENTE ATENCIÓN EN TODO MOMENTO. OBVIAMENTE QUE USARÉ DE NUEVO EL SERVICIO!",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
  },
  {
    nombre: "Diego Aguirre",
    comentario:
      "Super recomendables! Usaré nuevamente el servicio para cargar mi cuenta porque me funcionó y me mandaron el saldo bastante rapido. ojalá sigan así!!",
    fecha: "2025-12-03T07:30:00",
    estrellas: 5,
  },
  {
    nombre: "Luis",
    comentario:
      "primera venta de saldo y todo impecable!",
    fecha: "2025-12-02T14:15:00",
    estrellas: 5,
  },
  {
    nombre: "Paula",
    comentario:
      "Super recomendables ❤️",
    fecha: "2025-11-29T15:26:00",
    estrellas: 5,
  },
  {
    nombre: "Lucia Almada",
    comentario:
      "Despues de ver los comentarios probé con vender $20 y me mandaron los pesos a mi Uala en 10 minutos y además tienen muy buena cotización. Me dan confianza, voy a seguir cambiando con ellos.",
    fecha: "2025-11-29T15:26:00",
    estrellas: 5,
  },
  {
    nombre: "Matias Romero",
    comentario:
      "Por miedo a estafa compré lo minimo para ver si era real y en cuánto tiempo llegaba el saldo y me sorprendió la velocidad!! recomendados!",
    fecha: "2025-11-28T11:00:00",
    estrellas: 5,
  },
  {
    nombre: "Manuel",
    comentario:
      "probé para vender $50 usd y me mandaron los pesos bastante rapido. los recomiendo :)",
    fecha: "2025-11-25T10:00:55",
    estrellas: 5,
  },
  
  {
    nombre: "male",
    comentario:
      "Vendí mi saldo paypal sin problema, todo joya",
    fecha: "2025-11-22T14:20:18",
    estrellas: 5,
  },
    {
    nombre: "Luciana",
    comentario:
      "Cargué mi cuenta paypal sin problema. super recomendables los chicos",
    fecha: "2025-11-10T10:34:48",
    estrellas: 5,
  },
  {
    nombre: "fede ramirez",
    comentario:
      "100% recomendados",
    fecha: "2025-11-01T11:10:00",
    estrellas: 5,
  },
  {
    nombre: "Lucas",
    comentario:
      "Me sorprendió el servicio, no confiaba jaja, pero todo bien. me mandaron los pesos bastante rapido, en unos 15 minutos. recomendados!",
    fecha: "2025-10-22T17:50:00",
    estrellas: 5,
  },
  {
    nombre: "Fer Palacios",
    comentario:
      "La verdad es que dudaba al principio pero todo salio como habiamos acordado. Le pongo 4 estrellas porque demoraron unos 45 minutos en enviarme el dinero, cuando dicen que demoran maximo 30, pero aun asi llegó bien!",
    fecha: "2025-10-18T14:22:00",
    estrellas: 4,
  },
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
    }, 10000);
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
              {/* Estrellas */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < reseñasData[index].estrellas
                        ? "text-yellow-400 fill-yellow-400" // ⭐ Estrella rellena
                        : "text-gray-300 fill-transparent" // ☆ Estrella vacía
                    }`}
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