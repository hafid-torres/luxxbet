import React, { useState } from "react";
import VerifyCodeModal from "./VerifyCodeModal";

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showVerifyCode, setShowVerifyCode] = useState(false);

  if (!isOpen) return null;

  const handleReceiveCode = () => {
    setShowVerifyCode(true);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h3>Recuperar Senha</h3>
          <input
            type="email"
            placeholder="Email cadastrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone cadastrado"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleReceiveCode}>
            Receber Código
          </button>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      {/* Modal de verificação de código */}
      <VerifyCodeModal
        isOpen={showVerifyCode}
        onClose={() => setShowVerifyCode(false)}
      />
    </>
  );
}

export default ForgotPasswordModal;
