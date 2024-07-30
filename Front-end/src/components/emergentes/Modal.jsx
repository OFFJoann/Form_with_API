import React, { useState, useEffect } from 'react';
import '../../styles/modal.css'; // Asegúrate de tener este archivo CSS
import Alert from '../../styles/images/alert.png';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Desactiva el scroll
    } else {
      document.body.style.overflow = 'auto'; // Restaura el scroll
    }

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto'; // Asegúrate de restaurar al desmontar
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <img src={Alert} alt="Alert" width="30px" />
            <p>Autorizo a la Empresa Creaciones Nadar S.A. y a mi empleador el <a href="https://www.speedocolombia.com/tratamiento-de-datos-personales" target="_blank" rel="noreferrer">tratamiento de mis datos personales</a>, incluyendo los de salud, para desarrollar acciones de promoción, prevención y tratamiento para la gestión del riesgo en salud, así como para otras finalidades establecidas en la Ley 1581 de 2012. Como titular de los datos, tengo derecho a revocar la autorización, conocer, actualizar, rectificar y suprimir mi información.</p>
            <button onClick={handleCloseModal}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;