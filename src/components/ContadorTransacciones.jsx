import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Check } from "lucide-react";

export default function ContadorTransacciones() {
  const [valor, setValor] = useState(3842); // número inicial
  const [display, setDisplay] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [temp, setTemp] = useState(valor);

  // Animación suave al número final
  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = 30;
    let current = 0;

    const interval = setInterval(() => {
      current += Math.ceil(valor / (duration / step));

      if (current >= valor) {
        current = valor;
        clearInterval(interval);
      }
      setDisplay(current);
    }, step);

    return () => clearInterval(interval);
  }, [valor]);

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mb-10 text-center relative">

      {/* Número animado */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-blue-700 tracking-tight"
      >
        {display.toLocaleString("es-ES")}
      </motion.div>

      <p className="text-gray-600 mt-1 text-sm">
        transacciones completadas con éxito
      </p>

      {/* Botón editar */}
      <button
        onClick={() => setEditMode(true)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <Edit size={18} />
      </button>

      {/* Modo edición */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 flex justify-center gap-2"
          >
            <input
              type="number"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="border rounded-lg p-2 text-center w-32"
            />

            <button
              onClick={() => {
                setValor(Number(temp));
                setEditMode(false);
              }}
              className="bg-blue-600 text-white rounded-lg px-3 py-2 flex items-center gap-1"
            >
              <Check size={16} /> Guardar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}