// components/ReseñasFB.jsx
import { useEffect } from "react";

export default function ReseñasFB() {
  useEffect(() => {
    // Revisar si ya existe el SDK
    if (document.getElementById("facebook-jssdk")) return;

    // Crear contenedor fb-root
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.prepend(fbRoot);
    }

    // Cargar SDK de Facebook
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    // Reemplaza APP_ID por tu app real de Facebook
    script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v24.0&appId=APP_ID";
    document.body.appendChild(script);

    // Inicializar plugin después de cargar SDK
    script.onload = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <div
        className="fb-comments"
        data-href="https://www.saldopaypal.com.ar/"
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
}