import { useState } from "react";

export const useNavbarModals = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const showAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const switchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const switchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  return {
    isLoginModalOpen,
    isSignUpModalOpen,
    isLogoutModalOpen,
    isAboutModalOpen,
    closeLoginModal,
    closeSignUpModal,
    closeLogoutModal,
    closeAboutModal,
    showLogoutModal,
    showAboutModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  };
};
