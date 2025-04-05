import React, { useRef } from "react";

import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useCloseModal } from "../../hooks/useCloseModal";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

export const Modal = ({
  children,
  onClose,
  ariaLabelledby,
  ariaDescribedby,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, onClose);

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md z-[999]" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 z-[9999]">
        <div
          ref={modalRef}
          role="dialog"
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          className="w-screen h-screen md:w-auto md:h-auto bg-loginModalBg shadow-xl px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative"
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-6 text-xl fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
