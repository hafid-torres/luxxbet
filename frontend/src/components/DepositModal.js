import React, { useState } from "react";
import "./DepositModal.css";

function DepositModal({ isOpen, onClose, onDeposit, openSuccessModal }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const quickValues = [
    { value: 20, hot: false },
    { value: 30, hot: false },
    { value: 50, hot: true },
    { value: 70, hot: false },
    { value: 100, hot: true },
    { value: 120, hot: false },
    { value: 150, hot: true },
    { value: 250, hot: false },
    { value: 500, hot: true },
    { value: 1000, hot: false }
  ];

  if (!isOpen) return null;

  const handleDeposit = () => {
    const num = parseFloat(amount.replace(",", "."));
    if (isNaN(num) || num < 20) {
      setError("O valor mínimo para depósito é R$20,00");
      return;
    }
    if (num > 50000) {
      setError("O valor máximo para depósito é R$50.000,00");
      return;
    }
    setError("");
    onDeposit(num);
    setAmount("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal deposit-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Depositar</h2>
        <p className="subtitle">Escolha um valor para depositar e comece a jogar!</p>

        <input
          type="text"
          placeholder="R$20,00 - R$50.000,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onFocus={() => setAmount("")}
        />
        {error && <p className="error">{error}</p>}

        <p className="quick-title">Valores mais depositados:</p>
        <div className="quick-values">
          {quickValues.map((v, idx) => (
            <button
              key={idx}
              className={`quick-btn ${v.hot ? "hot" : ""}`}
              onClick={() => setAmount(v.value.toString())}
            >
              {v.hot && <span className="hot-badge">🔥</span>}
              R${v.value},00
            </button>
          ))}
        </div>

        <button className="btn btn-primary deposit-btn" onClick={handleDeposit}>
          Depositar via PIX!
        </button>
      </div>
    </div>
  );
}

export default DepositModal;
