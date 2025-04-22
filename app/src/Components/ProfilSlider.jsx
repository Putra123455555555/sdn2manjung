import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../services/apiClient';

const Slider = ({ slides }) => {
  const [currentId, setCurrentId] = useState(null);

  // Atur slide pertama setelah slides tersedia
  useEffect(() => {
    if (slides.length > 0) {
      setCurrentId(slides[0].id);
    }
  }, [slides]);

  // Fungsi mencari index berdasarkan ID
  const getIndexById = (id) => slides.findIndex((slide) => slide.id === id);

  // Fungsi tombol prev
  const prevSlide = () => {
    setCurrentId((prevId) => {
      const currentIndex = getIndexById(prevId);
      return currentIndex === 0 ? slides[slides.length - 1].id : slides[currentIndex - 1].id;
    });
  };

  // Fungsi tombol next
  const nextSlide = () => {
    setCurrentId((prevId) => {
      const currentIndex = getIndexById(prevId);
      return currentIndex === slides.length - 1 ? slides[0].id : slides[currentIndex + 1].id;
    });
  };

  // Auto slide setiap 4 detik
  useEffect(() => {
    if (!currentId) return; // Pastikan ada slide yang aktif
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [currentId, slides]);

  if (!slides.length) {
    return <p className="text-center text-lg">Memuat gambar...</p>;
  }

  return (
    <div className="relative max-w-[400px] h-[500px] w-full m-auto py-16 px-4 group">
      {slides.map((slide) =>
        slide.id === currentId ? (
          <div key={slide.id} className="w-full h-full rounded-xl overflow-hidden duration-500">
            <img src={`${apiClient.defaults.baseURL}/${slide.img}`} alt={`Slide ${slide.id}`} className="w-full h-full object-cover rounded-xl" />
          </div>
        ) : null
      )}

      {/* Tombol Prev */}
      <div className="hidden group-hover:block absolute top-[45%] left-5 text-2xl p-2 hover:text-white text-white/70 cursor-pointer" onClick={prevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </div>

      {/* Tombol Next */}
      <div className="hidden group-hover:block absolute top-[45%] right-5 text-2xl p-2 hover:text-white text-white/70 cursor-pointer" onClick={nextSlide}>
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </div>
    </div>
  );
};

export default Slider;
