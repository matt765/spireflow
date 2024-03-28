"use client";

import { SignUpForm } from "../../../components/auth/SignUpForm";
import { useHandleSignUp } from "../../../hooks/auth/useHandleSignUp";
import { useRouter } from "next/navigation";

const Register = () => {
  const { handleSignUp } = useHandleSignUp();
  const router = useRouter();

  const switchToSignIn = () => {
    router.push("/login")
  };

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0  backdrop-blur-md" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-secondaryBg dark:bg-secondaryBgDark ">
        <div className=" w-screen h-screen sm:w-[30rem] sm:h-auto bg-loginModalBg dark:bg-loginModalBgDark shadow-xl px-[6vw] xsm:px-[18vw] sm:px-16  pt-24 sm:pt-[4rem] pb-20 flex flex-col items-center justify-start sm:rounded-2xl relative">
          <SignUpForm
            handleSignUp={handleSignUp}
            switchToSignIn={switchToSignIn}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
