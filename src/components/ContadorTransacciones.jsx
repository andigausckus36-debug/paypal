import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function ContadorTransacciones() {
  // CAMBIÁ ESTE NÚMERO CUANDO QUIERAS
  const totalTransacciones = 28;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white shadow-lg rounded-2xl p-6 max-w-xl mx-auto my-8 text-center"
    >
      {/* Número arriba del todo */}
      <CountUp
        start={0}
        end={totalTransacciones}
        duration={2}
        separator=","
        className="text-5xl font-bold text-blue-600 drop-shadow-sm mb-2"
      />

      {/* Primer texto */}
      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mt-2">
        Intercambios completados
      </p>

      {/* Segundo texto */}
      <p className="text-gray-600 text-sm mt-1">
        En los últimos 30 días
      </p>
    </motion.div>
  );
}