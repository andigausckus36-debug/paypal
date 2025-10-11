import React, { useState, useEffect, useRef } from "react";

export default function CarouselDots({ images = [], interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const carouselRef = useRef(null);
  const startXRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleImageClick = (img) => {
    setModalImage(img);
    setShowModal(true);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        // swipe left
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        // swipe right
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Título y subtítulo */}
      <div className="mb-4 text-left">
        <h2 className="text-3xl font-medium italic text-gray-700">
          Intercambios recientes
        </h2>
        <p className="text-sm italic text-gray-500">
          Hace clic en la imagen para agrandarla
        </p>
      </div>

      {/* Carrusel */}
      <div
        className="overflow-hidden rounded-lg shadow-md"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 md:h-80 object-contain cursor-pointer transition-transform duration-300"
          onClick={() => handleImageClick(images[currentIndex])}
        />
      </div>

      {/* Puntos de paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <img
            src={modalImage}
            alt="Ampliada"
            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}