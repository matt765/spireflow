import React, { useEffect, useRef } from "react"; 

import { useHandleLogin } from "../../hooks/useHandleLogin";
import { LoginForm } from "./LoginForm";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
}

export const LoginModal = ({ closeModal, switchToSignUp }: LoginModalProps) => {
  const { handleLogin, authError } = useHandleLogin(true, closeModal);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        return;
      }
      closeModal();
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md"></div>
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 ">
        <div
          ref={modalRef}
          className="w-1/4 h-2/3 bg-white bg-opacity-85 shadow-xl px-16 pt-[3.5rem] pb-12 flex flex-col items-center justify-start pt-16 rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-6 text-xl"
          >
            X
          </button>
          <h1 className="text-4xl font-bold mb-8">Sign In</h1>
          <LoginForm
            handleLogin={handleLogin}
            authError={authError}
            switchToSignUp={switchToSignUp}
          />
        </div>
      </div>
    </>
  );
};
