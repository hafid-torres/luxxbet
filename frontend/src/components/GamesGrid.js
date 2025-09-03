import React, { useState } from "react";
import GameCard from "./GameCard";
import RegisterModal from "./RegisterModal";
import DepositModal from "./DepositModal";

function GamesGrid({ isLoggedIn, balance, setLoading, onRegister, onDeposit, openLogin }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const games = [
    { badge: "🔥", img: "/imagens/jogo1.jpg", title: "FORTUNE TIGER", provider: "Pragmatic Play" },
    { badge: "🔥", img: "/imagens/jogo2.jpg", title: "FORTUNE RABBIT", provider: "Pragmatic Play" },
    { badge: "🔥", img: "/imagens/jogo3.jpg", title: "FORTUNE OX", provider: "Pragmatic Play" },
    { badge: "🔥", img: "/imagens/jogo4.jpg", title: "FORTUNE MOUSE", provider: "Pragmatic Play" },
    { badge: "🔥", img: "/imagens/jogo5.jpg", title: "GATES OF OLYMPUS", provider: "Pragmatic Play" }
  ];

  const handleCardClick = () => {
    if (!isLoggedIn) setShowRegisterModal(true);
    else if (balance > 0) setLoading(true);
    else setShowDepositModal(true);
  };

  const handleCTA = () => {
    if (!isLoggedIn) setShowRegisterModal(true);
    else setShowDepositModal(true);
  };

  return (
    <>
      <section className="games-grid">
        {games.map((game, idx) => (
          <GameCard key={idx} {...game} onClick={handleCardClick} />
        ))}
      </section>

      <div className="cta">
        <h3>
          {isLoggedIn
            ? "Ganhe 50 rodadas grátis em seu primeiro depósito"
            : "GANHE 50 GIROS AO SE CADASTRAR!"}
        </h3>
        <button className="btn btn-primary" onClick={handleCTA}>
          {isLoggedIn ? "DEPOSITE AGORA!" : "Cadastre-se Agora"}
        </button>
      </div>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={onRegister}
        openLogin={() => {
          setShowRegisterModal(false);
          openLogin();
        }}
      />

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={onDeposit}
      />
    </>
  );
}

export default GamesGrid;
