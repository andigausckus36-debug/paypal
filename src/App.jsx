import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"; // <-- importamos Navbar
import Inicio from "./components/Inicio";
import BotonWhatsApp from "./components/BotonWhatsApp";
import Footer from "./components/Footer";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import GarantiaCompradores from "./pages/GarantiaCompradores";
import FAQ from "./pages/FAQ";
import "./index.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("inicio"); // estado global de página

  // scroll hacia arriba al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // función para cambiar página (la pasaremos al Footer o a cualquier menú)
  const goToPage = (page) => setCurrentPage(page);

  return (
    <>
      {/* Navbar siempre visible */}
      <Navbar goToPage={goToPage} />

      {/* Contenido según página */}
      {currentPage === "inicio" && <Inicio />}
      {currentPage === "terminos" && <TerminosCondiciones />}
      {currentPage === "politica" && <PoliticaPrivacidad />}
      {currentPage === "garantia" && <GarantiaCompradores />}
      {currentPage === "faq" && <FAQ />}

      {/* Botón flotante de WhatsApp */}
      <BotonWhatsApp />

      {/* Footer */}
      <Footer goToPage={goToPage} />
    </>
  );
}