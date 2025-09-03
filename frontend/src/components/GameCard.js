import React from "react";

function GameCard({ badge, img, title, provider, onClick }) {
  return (
    <article className="game-card" onClick={onClick}>
      {badge && <div className="badge">{badge}</div>}
      <div className="thumb">
        <img src={img} alt={title} className="thumb-img" />
      </div>
      <div className="game-info">
        <div className="game-title">{title}</div>
        <div className="game-provider">{provider}</div>
      </div>
    </article>
  );
}

export default GameCard;
