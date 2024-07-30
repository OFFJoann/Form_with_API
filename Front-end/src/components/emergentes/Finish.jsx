import React, { useState, useEffect } from 'react';
import '../../styles/modal.css'; // Asegúrate de tener este archivo CSS
import Check from '../../styles/images/check.png';

const Finish = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto'; // Restaura al desmontar
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose(); // Llama a la función pasada para cerrar el modal desde el padre
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <img src={Check} alt="Alert" width="40px" />
            <h1>!SE ENVIO CON EXITO!</h1>
            <p>Recopilar esta información puede ayudar a la empresa a tomar decisiones informadas sobre gestión del talento, desarrollo profesional, políticas de bienestar y diversidad e inclusión.</p>
            <button onClick={handleCloseModal}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Finish;