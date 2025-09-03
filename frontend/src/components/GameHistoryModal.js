// GameHistoryModal.js
import React from "react";
import "./Modal.css"; // pode reutilizar CSS de outros modais

function GameHistoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Histórico de Jogos</h2>
        <table>
          <thead>
            <tr>
              <th>Jogo</th>
              <th>Data</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {/* Aqui ficará o histórico, por enquanto vazio */}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default GameHistoryModal;
