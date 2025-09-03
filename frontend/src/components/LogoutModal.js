import React from "react";
import "./LogoutModal.css";

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmar Logout</h2>
        <p>Deseja realmente sair da sua conta?</p>
        <div className="logout-actions">
          <button className="btn btn-ghost" onClick={onClose}>Não</button>
          <button className="btn btn-primary" onClick={onConfirm}>Sim</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
