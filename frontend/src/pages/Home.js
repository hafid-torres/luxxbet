import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import GamesGrid from "../components/GamesGrid";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import "../styles.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRegister = (formData) => {
    console.log("Usuário cadastrado:", formData);
    setIsLoggedIn(true);
    setShowRegisterModal(false);
  };

  const handleLogin = (formData) => {
    console.log("Usuário logado:", formData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        openRegister={() => setShowRegisterModal(true)}
        openLogin={() => setShowLoginModal(true)}
      />
      <Categories onCardClick={() => setShowRegisterModal(true)} />
      <div className="page">
        <Sidebar />
        <main className="content container">
          <GamesGrid
            isLoggedIn={isLoggedIn}
            openRegister={() => setShowRegisterModal(true)}
          />
        </main>
        <Chat />
      </div>
      <Footer />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

export default Home;
