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
    nombre: "Martina Sosa",
    comentario:
      "Rápido y seguro. Muy conforme con la atención.",
    fecha: "2025-12-11",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Tilcara",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "David Herrera",
    comentario:
      "Recomendables al 100%",
    fecha: "2025-12-11",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bucaramanga",
    metodo: "COP → PayPal",
  },
  {
    nombre: "João Silva",
    comentario:
      "Vendi meu saldo do PayPal de uma maneira simples e, em poucos minutos, enviaram o dinheiro para minha conta. Esse serviço realmente funciona, eu recomendo.",
    fecha: "2025-12-11",
    estrellas: 5,
    bandera: "br",
    ciudad: "Brasília",
    metodo: "BRL → PayPal",
  },
  
  {
    nombre: "Lucas Moreira",
    comentario:
      "Comprei saldo para o PayPal e consegui recarregar com a minha moeda de forma simples e rápida. Recomendo esse ótimo serviço.",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "br",
    ciudad: "Sao Pablo",
    metodo: "BRL → PayPal",
  },
  {
    nombre: "Agustin Garcia",
    comentario:
      "Todo impecable desde el inicio al final",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Palermo",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Sofía Martínez",
    comentario:
      " Súper recomendable este servicio, estoy sorprendida!",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Monterrey",
    metodo: "PayPal → MXN",
  },
  {
    nombre: "Mateo Castro",
    comentario:
      " Cargaron mi cuenta din problemas y rápidamente. Seguire usando su servicio",
    fecha: "2025-12-10",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bogotá",
    metodo: "COL → PayPal",
  },
  
  {
    nombre: "Mariana Souza",
    comentario:
      "É verdade que pagam rápido. Enviaram meu dinheiro para minha conta Pix em 20 minutos.",
    fecha: "2025-12-08",
    estrellas: 5,
    bandera: "br",
    ciudad: "Curitiba",
    metodo: "PayPal → BRL",
  },
  {
    nombre: "Ramón Diaz",
    comentario:
      "Servicio muy recomendable!!",
    fecha: "2025-12-09",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Puebla",
    metodo: "MXN → PayPal",
  },
  {
    nombre: "Luis Hernández",
    comentario:
      "Chevere, le pagué con un link, se acreditó de inmediato y me enviaron los USD bastante rapido también. Gracias, ahora puedo comprar mi juego en Ebay 😁",
    fecha: "2025-12-08",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Guadalajara",
    metodo: "MXN → PayPal",
  },
  {
    nombre: "Carlos López",
    comentario:
      " Funciona muy bien y la acreditación de mi saldo fue rápida. saludos DF",
    fecha: "2025-12-06",
    estrellas: 5,
    bandera: "mx",
    ciudad: "Ciudad de México",
    metodo: "MXN → PayPal",
  },
  {
    nombre: "Juani Ponce",
    comentario:
      "Le pongo 4 estrellas porque me mandaron el dinero en 45 minutos siendo que pagan en 30 minutos máximo, pero aun así todo bien salió, y además se disculparon por la demora.",
    fecha: "2025-12-06",
    estrellas: 4,
    bandera: "ar",
    ciudad: "Bariloche",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Matias Moreno",
    comentario:
      "Todo perfecto, salió todo bien. Muy bueno el servicio, pensé que era estafa jaja, pero me arriesgué y salió todo bien",
    fecha: "2025-12-06T08:30:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Concordia",
    metodo: "PayPal → ARS",
  },
  {
    nombre: "Luchi Luz",
    comentario:
      "Estoy sorprendida por la velocidad en que cargaron mi cuenta y además la buena atención en todo momento del proceso. Gracias 😊",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Córdoba",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Ricardo Lopez",
    comentario:
      "La operación salió muy bien. Fue rápida y estuvimos en contacto en todo momento.",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bogota",
    metodo: "COP → PayPal",
  },
  {
    nombre: "Catalina Pérez",
    comentario:
      " El intercambio fue rápido y sencillo",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "co",
    ciudad: "Medellín",
    metodo: "COP → PayPal",
  },
  {
    nombre: "Juan Pérez",
    comentario:
      "Son personas serias y responsables por qué me acreditaron mis pesos en mi cuenta de forma muy rápida,recomiendo este servicio",
    fecha: "2025-12-04T18:25:00",
    estrellas: 5,
    bandera: "co",
    ciudad: "Bogotá",
    metodo: "PayPal → COP",
  },
  {
    nombre: "Paula Olivera",
    comentario:
      "El servicio es excelente. No tuve ningun inconveniente durante el cambio",
    fecha: "2025-12-05",
    estrellas: 5,
    bandera: "ar",
    ciudad: "Mar del Plata",
    metodo: "ARS → PayPal",
  },
  {
    nombre: "Ana Beatriz Ferreira",
    comentario:
      "Me atenderam pelo WhatsApp com muita cordialidade e me ajudaram em todo o processo, além de que tudo foi muito rápido.",
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

  // Aplicar filtro
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
    const d = fecha.getDate().toString().padStart(2, "0");
    const m = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const y = fecha.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const review = reseñasFiltradas[index] || reseñasFiltradas[0];

  return (
    <div className="w-full flex flex-col items-center mb-10 bg-white">

      {/* Título */}
      <h2 className="text-xl italic font-medium text-center text-gray-800 mb-2">
        Opiniones de nuestros clientes
      </h2>

      {/* Filtro */}
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

      {/* Promedio */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-yellow-400 bg-white">
        <span className="text-yellow-600 font-bold text-lg">
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
              {/* Estrellas */}
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

              {/* Comentario */}
              <p className="italic text-gray-700 text-md mb-8">
                “{review.comentario}”
              </p>

              {/* Info inferior */}
              <div className="flex flex-col mt-3 space-y-2">

                {/* Nombre + fecha + bandera */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col text-left">
                    <p className="font-semibold text-gray-900">
                      {review.nombre}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFecha(review.fecha)}
                    </p>
                  </div>

                  <img
                    src={FLAGS[review.bandera]}
                    alt="Bandera"
                    className="w-9 h-6 rounded-sm object-cover"
                  />
                </div>

                <div className="flex justify-center gap-6 text-xs text-gray-500">

                  {/* Ciudad */}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {review.ciudad}
                  </span>

                  {/* Método: PayPal → ARS, ARS → PayPal, etc */}
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