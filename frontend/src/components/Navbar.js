import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import ProfileModal from "./ProfileModal";
import DepositHistoryModal from "./DepositHistoryModal";
import WithdrawHistoryModal from "./WithdrawHistoryModal";
import GameHistoryModal from "./GameHistoryModal";

function Navbar({
  isLoggedIn,
  balance,
  openLogin,
  openRegister,
  openDeposit,
  openWithdraw,
  refreshBalance,
  loading,
  setLoading,
  deposits,
  saques
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false);
  const [showGameHistory, setShowGameHistory] = useState(false);

  const profileRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    if (!isLoggedIn) openRegister();
    else if (balance > 0) setLoading(true);
    else openDeposit();
  };

  const toggleProfileMenu = () => setProfileOpen(prev => !prev);

  const handleNavClick = (action) => {
    if (!isLoggedIn) {
      openRegister();
      return;
    }

    switch (action) {
      case "cassino":
      case "live":
      case "esportes":
      case "ao-vivo":
      case "promocoes":
        if (balance > 0) setLoading(true);
        else openDeposit();
        break;
      case "deposito":
        openDeposit();
        break;
      case "saque":
        openWithdraw();
        break;
      default:
        break;
    }
  };

  const handleProfileDropdownClick = (option) => {
    switch(option) {
      case "meu-perfil":
        setShowProfileModal(true);
        break;
      case "depositos":
        setShowDepositHistory(true);
        break;
      case "saques":
        setShowWithdrawHistory(true);
        break;
      case "jogos":
        setShowGameHistory(true);
        break;
      default:
        break;
    }
    setProfileOpen(false);
  };

  return (
    <header className="topbar">
      <div className="container">
        <div className="brand" onClick={handleLogoClick}>
          <div className="logo">LuxxyBet</div>
        </div>

        <nav className="nav">
          <button className="nav-link" onClick={() => handleNavClick("cassino")}>Cassino</button>
          <button className="nav-link" onClick={() => handleNavClick("live")}>Cassino ao vivo</button>
          <button className="nav-link" onClick={() => handleNavClick("esportes")}>Esportes</button>
          <button className="nav-link" onClick={() => handleNavClick("ao-vivo")}>Ao vivo</button>
          <button className="nav-link" onClick={() => handleNavClick("promocoes")}>Promoções</button>
        </nav>

        <div className="actions">
          <div className="search-container">
            <input type="text" placeholder="Buscar jogos..." />
            <span className="search-icon">🔍</span>
          </div>

          {isLoggedIn ? (
            <>
              <div className="balance-box">
                R${(balance || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                <button className="refresh-btn" onClick={refreshBalance}>🔄</button>
              </div>

              <button className="btn btn-small btn-primary" onClick={() => handleNavClick("deposito")}>Depositar</button>
              <button className="btn btn-small btn-ghost" onClick={() => handleNavClick("saque")}>Saque</button>

              <div className="profile-wrapper" ref={profileRef}>
                <button className="btn btn-small btn-profile" onClick={toggleProfileMenu}>
                  Perfil <span className={`arrow ${profileOpen ? "open" : ""}`}>▼</span>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <button className="dropdown-item" onClick={() => handleProfileDropdownClick("meu-perfil")}>Meu perfil</button>
                    <button className="dropdown-item" onClick={() => handleProfileDropdownClick("depositos")}>Histórico de depósitos</button>
                    <button className="dropdown-item" onClick={() => handleProfileDropdownClick("saques")}>Histórico de saques</button>
                    <button className="dropdown-item" onClick={() => handleProfileDropdownClick("jogos")}>Histórico de jogos</button>
                    <button className="dropdown-item disabled">Ajuda</button>
                  </div>
                )}
              </div>

              <button className="btn btn-small btn-danger" onClick={() => window.location.reload()}>Sair</button>
            </>
          ) : (
            <>
              <button className="btn btn-small btn-primary" onClick={openRegister}>Registrar</button>
              <button className="btn btn-small btn-ghost" onClick={openLogin}>Entrar</button>
            </>
          )}
        </div>
      </div>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Modais */}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <DepositHistoryModal isOpen={showDepositHistory} onClose={() => setShowDepositHistory(false)} deposits={deposits} />
      <WithdrawHistoryModal isOpen={showWithdrawHistory} onClose={() => setShowWithdrawHistory(false)} saques={saques} />
      <GameHistoryModal isOpen={showGameHistory} onClose={() => setShowGameHistory(false)} />
    </header>
  );
}

export default Navbar;
