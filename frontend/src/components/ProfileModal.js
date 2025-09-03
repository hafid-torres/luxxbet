import React from "react";
import "./Modal.css";

function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Dados fictícios de cadastro, substitua pelos reais
  const userData = {
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    dataNascimento: "01/01/1990"
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Meu Perfil</h2>
        <div className="modal-content">
          <h3>Dados Pessoais</h3>
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Telefone:</strong> {userData.telefone}</p>
          <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
        </div>
        <button className="btn btn-close" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ProfileModal;
