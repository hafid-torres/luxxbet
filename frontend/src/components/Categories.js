import React from "react";

function Categories({ onCardClick }) {
  const categories = [
    { title: "Em Alta", img: "/imagens/jogo6.jpg" },
    { title: "Seleção Luxxy", img: "/imagens/jogo7.jpg" },
    { title: "Crash", img: "/imagens/jogo8.jpg" },
    { title: "Novidades", img: "/imagens/jogo9.jpg" },
    { title: "Pragmatic", img: "/imagens/jogo10.jpg" },
    { title: "Evolution", img: "/imagens/jogo11.jpg" },
    { title: "Slots", img: "/imagens/jogo12.jpg" },
    { title: "Ao Vivo", img: "/imagens/jogo13.jpg" }
  ];

  return (
    <div className="categories-top">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="cat-card-top"
          onClick={() => cat.img && onCardClick()}
        >
          {cat.img && <img src={cat.img} alt={cat.title} className="cat-img-top" />}
          <div className="cat-title">{cat.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
