import React, { useEffect, useState } from "react";

// Função utilitária para requisições autenticadas
const fetchWithAuth = async (url, jwt) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json"
    }
  });
  return res.json();
};

function DepositHistoryModal({ isOpen, onClose, jwt }) {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    if (isOpen && jwt) {
      fetchWithAuth("http://localhost:8080/api/transactions", jwt)
        .then(data => {
          // Filtra apenas depósitos
          const depositData = data.filter(tx => tx.type === "deposit");
          setDeposits(depositData);
        })
        .catch(err => {
          console.error("Erro ao buscar depósitos:", err);
          setDeposits([]);
        });
    }
  }, [isOpen, jwt]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Histórico de Depósitos</h2>
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deposits.length === 0 ? (
              <tr><td colSpan="4">Nenhum depósito realizado</td></tr>
            ) : (
              deposits.map((d, idx) => {
                const date = new Date(d.created_at);
                return (
                  <tr key={idx}>
                    <td>R${d.amount.toLocaleString("pt-BR")}</td>
                    <td>{date.toLocaleDateString("pt-BR")}</td>
                    <td>{date.toLocaleTimeString("pt-BR")}</td>
                    <td>{d.status}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default DepositHistoryModal;
