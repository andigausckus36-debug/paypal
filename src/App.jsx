// App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Footer from "./components/Footer";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import GarantiaCompradores from "./pages/GarantiaCompradores";
import FAQ from "./pages/FAQ";
import "./index.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("inicio");

  // Scroll hacia arriba al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Insertar Tawk.to
  useEffect(() => {
    if (!window.Tawk_API) { // Evita cargarlo varias veces
      var Tawk_API = window.Tawk_API || {}, Tawk_LoadStart = new Date();
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/683658e19e6ff019108525cc/1isa4mcih";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      document.body.appendChild(s1);
    }
  }, []);

  // Función para cambiar página
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

      {/* Footer */}
      <Footer goToPage={goToPage} />
    </>
  );
}