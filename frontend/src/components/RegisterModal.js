import React, { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, openLogin }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    dataNascimento: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const calcularIdade = (dataNascimento) => {
    const [dia, mes, ano] = dataNascimento.split("/").map(Number);
    const nascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calcularIdade(formData.dataNascimento) < 18) {
      setError("Você deve ter 18 anos ou mais para se registrar.");
      return;
    }
    setError("");
    console.log("Cadastro OK:", formData);
    onRegister(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dataNascimento"
            placeholder="Data de nascimento (dd/mm/aaaa)"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>

        <p style={{ marginTop: "12px", fontSize: "14px" }}>
          Já tem uma conta?{" "}
          <span
            className="link-text"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
              openLogin();
            }}
          >
            Clique aqui
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
