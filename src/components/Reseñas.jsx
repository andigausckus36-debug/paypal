import React, { useEffect, useRef } from "react";

export default function Reseñas() {
  const fbRef = useRef(null);

  useEffect(() => {
    // Crear script solo si no existe
    if (!window.FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v24.0";
      document.body.appendChild(script);
      script.onload = () => window.FB?.XFBML.parse(fbRef.current);
    } else {
      window.FB.XFBML.parse(fbRef.current);
    }
  }, []);

  return (
    <section id="reseñas" className="py-8 bg-white">
      <div className="text-left mb-10">
        <h2 className="text-2xl font-medium text-gray-700 italic mb-4">
          Opiniones de nuestros clientes
        </h2>
      </div>

      <div className="max-w-3xl mx-auto" ref={fbRef}>
        <div
          className="fb-comments"
          data-href="https://www.saldopaypal.com.ar/"
          data-width="100%"
          data-numposts="5"
        ></div>
      </div>
    </section>
  );
}