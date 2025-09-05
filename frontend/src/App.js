import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import GamesGrid from "./components/GamesGrid";
import Footer from "./components/Footer";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";
import SuccessModal from "./components/SuccessModal";
import ProfileModal from "./components/ProfileModal";
import AgeVerificationModal from "./components/AgeVerificationModal";
import "./styles.css";
import DepositHistoryModal from "./components/DepositHistoryModal";
import WithdrawHistoryModal from "./components/WithdrawHistoryModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const [jwt, setJwt] = useState(null);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(true);

  const [saques, setSaques] = useState([]);
  const [deposits] = useState([]); // removi setDeposits porque não está em uso

  const openSuccessModal = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  const refreshBalance = () => setBalance((prev) => prev);

  const handleRegister = (data) => {
    setIsLoggedIn(true);
    setShowRegisterModal(false);
    setShowDepositModal(true);
  };

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setJwt(data.jwt);
    setShowLoginModal(false);
    setShowDepositModal(true);
  };

  // ===== Alteração Stripe Backend com logs =====
  const handleDeposit = async (amount) => {
    try {
      const user_id = jwt;
      console.log("🔹 handleDeposit chamado com valor:", amount, "user_id:", user_id);

      if (!user_id) {
        openSuccessModal("Erro: usuário não identificado. Faça login novamente.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, amount }),
      });

      console.log("🔹 Resposta do fetch raw:", response);

      const data = await response.json();
      console.log("🔹 Resposta do fetch JSON:", data);

      if (data.url) {
        console.log("🔹 Redirecionando para Stripe:", data.url);
        window.location.href = data.url;
      } else {
        openSuccessModal("Erro ao criar sessão de pagamento.");
      }
    } catch (err) {
      console.error("❌ Erro ao criar sessão de checkout:", err);
      openSuccessModal("Erro ao criar sessão de pagamento.");
    }
  };

  const handleWithdraw = (amount) => {
    if (amount < 100) {
      openSuccessModal("Saque mínimo obrigatório R$100");
      return;
    }
    if (amount > balance) {
      openSuccessModal("Saldo insuficiente para saque");
      return;
    }
    setBalance((prev) => prev - amount);
    setSaques((prev) => [...prev, { amount, date: new Date(), status: "Pendente" }]);
    setShowWithdrawModal(false);
    openSuccessModal(`Saque de R$${amount.toLocaleString("pt-BR")} solicitado com sucesso!`);
  };

  const openRegisterFromLogin = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const openLoginFromRegister = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleCardClick = () => {
    if (!isLoggedIn) setShowRegisterModal(true);
    else if (balance > 0) setLoading(true);
    else setShowDepositModal(true);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        balance={balance}
        openRegister={() => setShowRegisterModal(true)}
        openLogin={() => setShowLoginModal(true)}
        openDeposit={() => setShowDepositModal(true)}
        openWithdraw={() => setShowWithdrawModal(true)}
        refreshBalance={refreshBalance}
        loading={loading}
        setLoading={setLoading}
        onProfileClick={handleProfileClick}
        deposits={deposits}
        saques={saques}
      />

      <Categories onCardClick={handleCardClick} />
      <GamesGrid
        isLoggedIn={isLoggedIn}
        onRegister={handleRegister}
        onDeposit={handleDeposit}
        openLogin={openLoginFromRegister}
        balance={balance}
        setLoading={setLoading}
      />

      <Footer />

      {/* Modais */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
        openLogin={openLoginFromRegister}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        openRegister={openRegisterFromLogin}
      />

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
        openSuccessModal={openSuccessModal}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onWithdraw={handleWithdraw}
        balance={balance}
        openSuccessModal={openSuccessModal}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        saques={saques}
        deposits={deposits}
      />

      <DepositHistoryModal
        isOpen={showDepositHistory}
        onClose={() => setShowDepositHistory(false)}
        jwt={jwt}
      />

      <WithdrawHistoryModal
        isOpen={showWithdrawHistory}
        onClose={() => setShowWithdrawHistory(false)}
        jwt={jwt}
      />

      <AgeVerificationModal
        isOpen={showAgeModal}
        onClose={() => setShowAgeModal(false)}
      />
    </>
  );
}

export default App;
