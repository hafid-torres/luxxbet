// SuccessModal.js
import React from "react";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal success-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Sucesso</h2>
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default SuccessModal;
