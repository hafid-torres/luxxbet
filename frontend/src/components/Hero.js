import React from "react";

// Componente de card de promoção
const PromoCard = ({ title, desc, color }) => {
  return (
    <div
      style={{
        minWidth: "220px",
        background: "#1b1b1b",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: `0 0 10px ${color}`,
        color: color,
        textAlign: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 0 20px ${color}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 0 10px ${color}`;
      }}
    >
      <h3 style={{ fontFamily: "Orbitron, sans-serif", marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontFamily: "Montserrat, sans-serif", color: "#ccc", margin: 0 }}>{desc}</p>
    </div>
  );
};

// Componente Hero principal
const Hero = ({ openLogin }) => {
  return (
    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        color: "#fff",
      }}
    >
      {/* Login / Cadastro central */}
      <div
        style={{
          background: "#1e1e1e",
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 0 25px #00ff99",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            color: "#00ff99",
            marginBottom: "20px",
          }}
        >
          LuxxyBet
        </h1>
        <p style={{ fontFamily: "Montserrat, sans-serif", marginBottom: "30px" }}>
          Entre ou crie sua conta de forma rápida e segura
        </p>
        <button
          onClick={openLogin}
          style={{
            padding: "15px 30px",
            background: "#00ff99",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 0 15px #00ff99",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 30px #00ff99")}
          onMouseLeave={(e) => (e.target.style.boxShadow = "0 0 15px #00ff99")}
        >
          Login / Cadastro
        </button>
      </div>

      {/* Cards de promoções */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          marginTop: "50px",
          paddingBottom: "20px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <PromoCard title="50 Giros Grátis" desc="Ao criar sua conta" color="#00ff99" />
        <PromoCard title="20% Cashback Semanal" desc="Receba parte do seu saldo de volta" color="#00ffff" />
        <PromoCard title="Promoções Semanais" desc="Segunda, Quarta e Sexta" color="#ff0055" />
        <PromoCard title="Slots Diversos" desc="Diversão garantida todos os dias" color="#ff9900" />
      </div>
    </div>
  );
};

export default Hero;
