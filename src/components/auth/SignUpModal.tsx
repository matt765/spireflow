import React, { useEffect, useRef } from "react";

import { SignUpForm } from "./SignUpForm";
import { useHandleSignUp } from "../../hooks/auth/useHandleSignUp";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { Modal } from "../common/Modal";

interface SignUpModalProps {
  closeModal: () => void;
  switchToSignIn: () => void;
}

export const SignUpModal = ({
  closeModal,
  switchToSignIn,
}: SignUpModalProps) => {
  const { handleSignUp } = useHandleSignUp();

  return (
    <Modal onClose={closeModal}>
      <SignUpForm handleSignUp={handleSignUp} switchToSignIn={switchToSignIn} />
    </Modal>
  );
};
