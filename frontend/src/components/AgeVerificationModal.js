import React from "react";
import "../styles.css"; // Corrigido o caminho

function AgeVerificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleYes = () => {
    onClose(); // Fecha o modal ao clicar em "Sim"
  };

  const handleNo = () => {
    onClose(); // Fecha o modal ao clicar em "Não"
    // Você pode redirecionar aqui se desejar:
    // window.location.href = "https://www.google.com";
  };

  return (
    <div className="modal-overlay age-modal">
      <div className="modal">
        <h3>Você tem 18 anos ou mais?</h3>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleYes}>Sim</button>
          <button className="btn btn-danger" onClick={handleNo}>Não</button>
        </div>
      </div>
    </div>
  );
}

export default AgeVerificationModal;
