import React, { useEffect, useRef } from "react";
import { CloseIcon } from "../../assets/icons/CloseIcon";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export const Modal = ({ children, onClose, className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0   backdrop-blur-md z-40" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 z-50">
        <div
          ref={modalRef}
          className="bg-loginModalBg dark:bg-loginModalBgDark shadow-xl px-[6vw] xsm:px-[18vw] sm:px-12  pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-xl
            fill-secondaryText
            dark:stroke-secondaryTextDark       
            dark:fill-secondaryTextDark
            hover:dark:stroke-secondaryTextHoverDark
            hover:dark:fill-secondaryTextHoverDark
            hover:fill-secondaryTextHover          
            hover:stroke-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
