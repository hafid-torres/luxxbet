import React from "react";
import "./Pages.css";

export default function Casino() {
  return (
    <div className="page">
      <h1>🎰 Cassino Online</h1>
      <p>Aqui você encontrará os melhores jogos de slots e mesa!</p>
      <div className="games-grid">
        <div className="game-card">Slot Machine 1</div>
        <div className="game-card">Slot Machine 2</div>
        <div className="game-card">Roleta</div>
        <div className="game-card">Blackjack</div>
      </div>
    </div>
  );
}
