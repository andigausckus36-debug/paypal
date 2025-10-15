import { useState, useEffect } from "react";

// Datos de reseñas: agregás o modificás aquí manualmente
const reseñasData = [
  {
    nombre: "Nacho",
    comentario: "Excelente experiencia de cambio!. Primera vez que utilizo el servicio y todo joya, cargaron mi cuenta literalmente en 4 minutos",
    fecha: "2025-10-15T14:02:00",
    estrellas: 5
  },
  {
    nombre: "Sofi",
    comentario: "Muy rápido y confiable, la transacción se completó sin problemas. Recomendado!",
    fecha: "2025-10-14T11:47:00",
    estrellas: 5
  },
  {
    nombre: "Martín",
    comentario: "Todo perfecto, atención clara y carga inmediata de saldo. Volveré a usar el servicio.",
    fecha: "2025-10-13T16:20:00",
    estrellas: 5
  }
];

// Ordenar de más nueva a más antigua
const reseñasOrdenadas = reseñasData.sort(
  (a, b) => new Date(b.fecha) - new Date(a.fecha)
);

export default function Reseñas() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reseñasOrdenadas.length);
    }, 5000); // 5 segundos
    return () => clearInterval(interval);
  }, []);

  const current = reseñasOrdenadas[index];

  // Función para mostrar estrellas
  const renderStars = (num) => "★".repeat(num) + "☆".repeat(5 - num);

  return (
    <div>
      {/* Título */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontStyle: "italic", fontWeight: "bold", color: "#111" }}>
          Opiniones de clientes
        </h2>
      </div>

      {/* Caja de reseña */}
      <div style={{
        maxWidth: "600px",
        margin: "0 auto 3rem", // separa la siguiente sección
        padding: "2rem",       // caja más alta
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
      }}>
        <div style={{ fontSize: "1.2rem", color: "#f5a623" }}>
          {renderStars(current.estrellas)}
        </div>
        <p style={{ fontSize: "1rem", margin: "0.5rem 0", color: "#333", fontStyle: "italic" }}>
          "{current.comentario}"
        </p>
        <strong style={{ display: "block", marginTop: "0.5rem", color: "#111" }}>
          {current.nombre}
        </strong>
        <span style={{ fontSize: "0.85rem", color: "#666" }}>
          {new Date(current.fecha).toLocaleDateString("es-AR")} • {new Date(current.fecha).getHours().toString().padStart(2,"0")}:{new Date(current.fecha).getMinutes().toString().padStart(2,"0")}
        </span>
      </div>
    </div>
  );
}