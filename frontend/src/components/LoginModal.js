import React, { useState } from "react";
import "./LoginModal.css";
import { createClient } from "@supabase/supabase-js";
import ForgotPasswordModal from "./ForgotPasswordModal";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function LoginModal({ isOpen, onClose, onLogin, openRegister }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      const jwt = data.session?.access_token;
      if (!jwt) {
        alert("Não foi possível capturar o token JWT");
        return;
      }
      // envia id real do usuário junto com jwt
      onLogin({ id: data.user.id, jwt, email: data.user.email });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro inesperado ao fazer login");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Usuário (email)"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary">Entrar</button>
          </form>

          <button
            className="link-btn"
            onClick={() => setShowForgotPassword(true)}
          >
            Esqueceu sua senha?
          </button>

          <p className="register-link">
            Ainda não possui usuário?{" "}
            <span
              className="link-text"
              style={{ cursor: "pointer", color: "#ffd400", textDecoration: "underline" }}
              onClick={() => {
                onClose();
                openRegister();
              }}
            >
              Clique Aqui
            </span>
          </p>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </>
  );
}

export default LoginModal;
