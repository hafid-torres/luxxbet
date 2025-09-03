import React, { useState } from "react";
import "./WithdrawModal.css";

function WithdrawModal({ isOpen, onClose, onWithdraw, balance, openSuccessModal }) {
  const [amount, setAmount] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const valor = Number(amount);

    if (!pixKey) {
      setError("Informe a chave PIX");
      return;
    }
    if (!valor || valor < 100) {
      setError("Saque mínimo obrigatório R$100");
      return;
    }
    if (valor > balance) {
      setError("Saldo insuficiente");
      return;
    }

    setError("");
    onWithdraw(valor);
    onClose();
    openSuccessModal(`Saque de R$${valor.toLocaleString("pt-BR")} solicitado com sucesso!`);

    setAmount("");
    setPixKey("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal withdraw-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Saque</h2>

        <div className="balance-info">
          Saldo disponível: R${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Valor do saque"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max={balance}
            required
          />

          <input
            type="text"
            placeholder="Chave PIX do titular"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <div className="pix-warning">
            Saques só podem ser solicitados para mesma chave PIX do titular da conta
          </div>

          <button type="submit" className="btn btn-primary">Solicitar Saque</button>
        </form>
      </div>
    </div>
  );
}

export default WithdrawModal;
