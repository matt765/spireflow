import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const Card = ({ children, className, id }: CardProps) => {
  return (
    <div
      id={id}
      className={`border border-mainBorder rounded-[12px] !border-mainBorder bg-primaryBg
                relative w-full text-left p-6 h-full   
                ${className} `}
    >
      {children}
    </div>
  );
};
