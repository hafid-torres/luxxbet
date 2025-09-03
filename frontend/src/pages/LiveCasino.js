import React from "react";
import "./Pages.css";

export default function LiveCasino() {
  return (
    <div className="page">
      <h1>🎥 Cassino ao Vivo</h1>
      <p>Experiência real com dealers transmitidos em tempo real.</p>
      <div className="games-grid">
        <div className="game-card">Roleta ao Vivo</div>
        <div className="game-card">Bacará ao Vivo</div>
        <div className="game-card">Blackjack ao Vivo</div>
      </div>
    </div>
  );
}
