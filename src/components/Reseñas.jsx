import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Repeat } from "lucide-react";

// Banderas
const FLAGS = {
  ar: "https://i.postimg.cc/MGNgBvQ7/Flag-of-Argentina-svg.png",
  mx: "https://i.postimg.cc/6pQP1dVd/Flag-of-Mexico-svg.png",
  br: "https://i.postimg.cc/cHGtX3z7/Flag-of-Brazil-svg.png",
  co: "https://i.postimg.cc/j2y84bkZ/images.webp",
};

// Reseñas
const reseñasData = [
  {
    nombre: "Marcelo Luna",
    comentario: "Compre $10 usd para probar y todo salió bien",
    fecha: "2025-02-02",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Pergamino",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Marcelo Luna",
    comentario: "Serios y responsables a la hora de operar",
    fecha: "2025-02-01",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Campana",
    metodo: "ARS → PayPal",
  },
  
  {
    nombre: "Marcelo Luna",
    comentario: "Serios y responsables a la hora de operar",
    fecha: "2025-02-01",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Olavarría",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Caro Ludueña",
    comentario: "Buena cotización y tiempo de respuesta",
    fecha: "2025-01-26",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Zarate",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Lucas Lomaz",
    comentario: "Impecable!!!",
    fecha: "2025-01-24",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Bigand",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Lucas Lomaz",
    comentario: "Demoraron 45 minutos en enviarme el saldo pero qun así es buen tiempo",
    fecha: "2025-01-20",
    estrellas: 4,
    bandera: "ar",
    ciudad: "Rosario",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Marito Salas",
    comentario: "Buenisimo!! los recomiendo!!",
    fecha: "2025-01-16",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Tandil",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Lu Gausini",
    comentario: "me recomendó la página una amiga y decidí probarla y la verdad que me sorprendió lo rápido de la atención",
    fecha: "2025-01-15",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Río Cuarto",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Marcos Einis",
    comentario: "el cambio fué rápido y seguro",
    fecha: "2025-01-14",
    estrellas: 5,
    bandera: "ar",
    ciudad: "La Plata",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Lucia Guisi",
    comentario: "Pude cargar mi cuenta PayPal sin problemas",
    fecha: "2025-12-30",
    estrellas: 5,
    bandera: "ar",
    ciudad: " Bermejo",
    metodo: "ARS → PayPal",
  },
  
  {
    nombre: "Gabriela Aguirre",
    comentario: "Recomiendo este servicio todo salió bien",
    fecha: "2025-12-29",
    estrellas: 5,
    bandera: "ar",
    ciudad: " Córdoba",
    metodo: "ARS → PayPal",
  },
  {
  nombre: " Juan Moreira",
    comentario: " Gracias Andrés por el buen trato y la disponibilidad es usted muy responsable gracias",
    fecha: "2025-12-20",
    estrellas: 5,
    bandera: "co",
    ciudad: " Cartagena",
    metodo: "COP → PayPal",
  },
  {
    nombre: " María Lorenzi",
    comentario: " Me guiaron en todo el proceso y pude cargar mi cuenta de PayPal sin problema y bastante rápido buen servicio",
    fecha: "2025-12-20",
    estrellas: 5,
    bandera: "ar",
    ciudad: " Ayacucho",
    metodo: "ARS → PayPal",
  },
  {
    nombre: " Andrés Olivera",
    comentario: " Todo salió bien buen servicio lo recomiendo",
    fecha: "2025-12-19",
    estrellas: 5,
    bandera: "ar",
    ciudad: " Córdoba",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Paula Liz",
    comentario: "Todo perfecto, buena atención y cotización también.",
    fecha: "2025-12-16",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Viedma",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Carlos Guerrico",
    comentario:
      "Primera vez que compro saldo con ellos y todo salió bien, la carga fue inmediata.",
    fecha: "2025-12-13",
    estrellas: 5,
    bandera: "ar",
    ciudad: "San Nicolás",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Nico",
    comentario: "Todo perfecto y rápido, los recomiendo.",
    fecha: "2025-12-12",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Carlos Paz",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Martina Sosa",
    comentario: "Rápido y seguro. Muy conforme con la atención.",
    fecha: "2025-12-11",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Tilcara",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "David Herrera",
    comentario: "Recomendables al 100%.",
    fecha: "2025-12-11",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bucaramanga",
    metodo: "COP → PayPal",
  },
  {
    nombre: "João Silva",
    comentario:
      "Vendi meu saldo do PayPal de uma maneira simples e em poucos minutos enviaram o dinheiro.",
    fecha: "2025-12-11",
    estrellas: 5,
    bandera: "br",
    ciudad: "Brasília",
    metodo: "BRL → PayPal",
  },
  {
    nombre: "Lucas Moreira",
    comentario:
      "Comprei saldo para o PayPal de forma simples e rápida. Recomendo.",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "br",
    ciudad: "São Paulo",
    metodo: "BRL → PayPal",
  },
  {
    nombre: "Agustín García",
    comentario: "Todo impecable desde el inicio hasta el final.",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Palermo",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Sofía Martínez",
    comentario: "Súper recomendable este servicio, estoy sorprendida.",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Monterrey",
    metodo: "PayPal → MXN",
  },
  {
    nombre: "Mateo Castro",
    comentario:
      "Cargaron mi cuenta sin problemas y rápidamente. Seguiré usando el servicio.",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bogotá",
    metodo: "COP → PayPal",
  },
  {
    nombre: "Mariana Souza",
    comentario:
      "É verdade que pagam rápido. Enviaram meu dinheiro em 20 minutos.",
    fecha: "2025-12-08",
    estrellas: 5,
    bandera: "br",
    ciudad: "Curitiba",
    metodo: "PayPal → BRL",
  },
  {
    nombre: "Ramón Díaz",
    comentario: "Servicio muy recomendable.",
    fecha: "2025-12-09",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Puebla",
    metodo: "MXN → PayPal",
  },
  {
    nombre: "Luis Hernández",
    comentario:
      "Se acreditó de inmediato y me enviaron los USD rápido. Gracias.",
    fecha: "2025-12-08",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Guadalajara",
    metodo: "MXN → PayPal",
  },
  {
    nombre: "Carlos López",
    comentario:
      "Funciona muy bien y la acreditación fue rápida. Saludos.",
    fecha: "2025-12-06",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Ciudad de México",
    metodo: "MXN → PayPal",
  },
  {
    nombre: "Juani Ponce",
    comentario:
      "Hubo una pequeña demora, pero avisaron y cumplieron. Todo bien.",
    fecha: "2025-12-06",
    estrellas: 4,
    bandera: "ar",
    ciudad: "Bariloche",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Matías Moreno",
    comentario:
      "Todo perfecto, pensé que era estafa pero salió todo bien.",
    fecha: "2025-12-06T08:30:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Concordia",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Luchi Luz",
    comentario:
      "Sorprendida por la velocidad y la buena atención. Gracias.",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Córdoba",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Ricardo López",
    comentario:
      "La operación salió muy bien y fue rápida.",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bogotá",
    metodo: "COP → PayPal",
  },
  {
    nombre: "Catalina Pérez",
    comentario: "El intercambio fue rápido y sencillo.",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "co",
    ciudad: "Medellín",
    metodo: "COP → PayPal",
  },
  {
    nombre: "Juan Pérez",
    comentario:
      "Personas serias y responsables, todo fue muy rápido.",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bogotá",
    metodo: "PayPal → COP",
  },
  {
    nombre: "Paula Olivera",
    comentario:
      "Excelente servicio, no tuve ningún inconveniente.",
    fecha: "2025-12-05",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Mar del Plata",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Ana Beatriz Ferreira",
    comentario:
      "Atendimento excelente e processo muito rápido.",
    fecha: "2025-12-04",
    estrellas: 5,
    bandera: "br",
    ciudad: "Rio de Janeiro",
    metodo: "BRL → PayPal",
  },
];

export default function SliderReseñas() {
  const [index, setIndex] = useState(0);
  const [paisFiltro, setPaisFiltro] = useState("todos");

  const reseñasFiltradas =
    paisFiltro === "todos"
      ? reseñasData
      : reseñasData.filter((r) => r.bandera === paisFiltro);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % reseñasFiltradas.length);
    }, 8000);
    return () => clearInterval(intervalo);
  }, [reseñasFiltradas]);

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return `${fecha.getDate().toString().padStart(2, "0")}/${(
      fecha.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${fecha.getFullYear()}`;
  };

  const review = reseñasFiltradas[index] || reseñasFiltradas[0];

  return (
    <div className="w-full flex flex-col items-center mb-10 bg-white">
      <h2 className="text-xl italic font-medium text-center text-gray-800 mb-2">
        Opiniones de nuestros clientes
      </h2>

      <select
        value={paisFiltro}
        onChange={(e) => {
          setPaisFiltro(e.target.value);
          setIndex(0);
        }}
        className="border border-gray-300 rounded-md outline-none px-3 py-2 text-sm mb-5"
      >
        <option value="todos">Filtrar por país</option>
        <option value="ar">Argentina</option>
        <option value="br">Brasil</option>
        <option value="co">Colombia</option>
        <option value="mx">México</option>
      </select>

      <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-yellow-400 bg-white mb-6">
        <span className="text-yellow-600 font-bold text-lg">
          {(
            reseñasData.reduce((acc, r) => acc + r.estrellas, 0) /
            reseñasData.length
          ).toFixed(1)}
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex justify-center">
        <div className="w-full max-w-xl h-96 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute w-full text-center px-8"
            >
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < review.estrellas
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="italic text-gray-700 text-md mb-8">
                “{review.comentario}”
              </p>

              <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                  <p className="font-semibold">{review.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {formatFecha(review.fecha)}
                  </p>
                </div>
                <img
                  src={FLAGS[review.bandera]}
                  className="w-9 h-6 rounded-sm"
                />
              </div>

              <div className="flex justify-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {review.ciudad}
                </span>
                <span className="flex items-center gap-1">
                  <Repeat className="w-3 h-3" />
                  {review.metodo}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}