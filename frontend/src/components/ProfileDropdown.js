// ProfileDropdown.js
import React, { useState } from "react";
import "./ProfileDropdown.css";

function ProfileDropdown({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const options = [
    { label: "Meu Perfil", key: "perfil" },
    { label: "Histórico de Saques", key: "saques" },
    { label: "Histórico de Depósitos", key: "depositos" },
    { label: "Histórico de Jogos", key: "jogos" },
    { label: "Ajuda", key: "ajuda", disabled: true }
  ];

  return (
    <div className="profile-dropdown">
      <button className="btn btn-ghost" onClick={toggleDropdown}>
        Perfil ▼
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(opt => (
            <button
              key={opt.key}
              className={`dropdown-item ${opt.disabled ? "disabled" : ""}`}
              onClick={() => {
                if (!opt.disabled) openModal(opt.key);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
