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
  const [deposits, setDeposits] = useState([]);

  const openSuccessModal = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  const refreshBalance = () => setBalance(prev => prev);

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

  const handleDeposit = (amount) => {
    setBalance(prev => prev + amount);
    setDeposits(prev => [...prev, { amount, date: new Date(), status: "Concluído" }]);
    setShowDepositModal(false);
    openSuccessModal(`Depósito de R$${amount.toLocaleString("pt-BR")} realizado com sucesso!`);
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
    setBalance(prev => prev - amount);
    setSaques(prev => [...prev, { amount, date: new Date(), status: "Pendente" }]);
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
