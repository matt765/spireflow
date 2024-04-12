import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "./useClickOutside";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const close = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  useClickOutside(ref, close);

  return { isOpen, toggle, close, ref, open };
};
