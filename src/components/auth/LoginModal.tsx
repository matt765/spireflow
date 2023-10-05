import React, { useEffect, useRef } from "react";

import { useHandleLogin } from "../../hooks/useHandleLogin";
import { LoginForm } from "./LoginForm";
import { CloseIcon } from "../../assets/icons/CloseIcon";

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
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 ">
        <div
          ref={modalRef}
          className="w-screen h-screen sm:w-[29rem] sm:h-auto bg-primaryBg dark:bg-primaryBgDark shadow-xl px-[6vw] xsm:px-[18vw] sm:px-12  pt-24 sm:pt-16 pb-12 flex flex-col items-center justify-start rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-6 text-xl stroke-secondaryText dark:stroke-secondaryTextDark fill-secondaryText dark:fill-secondaryTextDark"
          >
            <CloseIcon />
          </button>
          <h1 className={`text-4xl font-bold mb-8 `}>
            Sign In
          </h1>
          <LoginForm
            handleLogin={async (data) => handleLogin(data)}
            authError={authError}
            switchToSignUp={switchToSignUp}
          />
        </div>
      </div>
    </>
  );
};
