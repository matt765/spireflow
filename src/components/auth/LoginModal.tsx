import React from "react";

import { useHandleLogin } from "../../hooks/auth/useHandleLogin";
import { LoginForm } from "./LoginForm";
import { Modal } from "../common/Modal";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
}

export const LoginModal = ({ closeModal, switchToSignUp }: LoginModalProps) => {
  const { handleLogin, authError, clearAuthError } = useHandleLogin();

  return (
    <>
      <Modal onClose={closeModal}>
        <LoginForm
          handleLogin={async (data) => handleLogin(data)}
          authError={authError}
          switchToSignUp={switchToSignUp}
          clearAuthError={clearAuthError}
        />
      </Modal>
    </>
  );
};
