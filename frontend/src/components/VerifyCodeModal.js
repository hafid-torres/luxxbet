import React, { useState } from "react";

function VerifyCodeModal({ isOpen, onClose }) {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleChangePassword = () => {
    alert("CÓDIGO INVÁLIDO");
    setCode("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Alterar Senha</h3>
        <input
          type="text"
          placeholder="Digite o código recebido"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => !e.target.value && (e.target.placeholder = "Digite o código recebido")}
        />
        <button className="btn btn-primary" onClick={handleChangePassword}>
          Alterar Senha
        </button>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default VerifyCodeModal;
