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

function WithdrawHistoryModal({ isOpen, onClose, jwt }) {
  const [saques, setSaques] = useState([]);

  useEffect(() => {
    if (isOpen && jwt) {
      fetchWithAuth("http://localhost:8080/api/transactions", jwt)
        .then(data => {
          // Filtra apenas saques
          const withdrawData = data.filter(tx => tx.type === "withdraw");
          setSaques(withdrawData);
        })
        .catch(err => {
          console.error("Erro ao buscar saques:", err);
          setSaques([]);
        });
    }
  }, [isOpen, jwt]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Histórico de Saques</h2>
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
            {saques.length === 0 ? (
              <tr><td colSpan="4">Nenhum saque realizado</td></tr>
            ) : (
              saques.map((s, idx) => {
                const date = new Date(s.created_at);
                return (
                  <tr key={idx}>
                    <td>R${s.amount.toLocaleString("pt-BR")}</td>
                    <td>{date.toLocaleDateString("pt-BR")}</td>
                    <td>{date.toLocaleTimeString("pt-BR")}</td>
                    <td>{s.status}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {saques.length > 0 && (
          <p>Seu saque está sendo processado e será depositado em até 72h.</p>
        )}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default WithdrawHistoryModal;
