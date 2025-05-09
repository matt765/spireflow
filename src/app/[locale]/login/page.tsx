"use client";

import { useRouter } from "next/navigation";

import { LoginForm } from "../../../components/auth/LoginForm";

const Login = () => {
  const router = useRouter();

  const switchToSignUp = () => {
    router.push("/register");
  };

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-secondaryBg">
        <div className="border border-mainBorder w-screen h-screen sm:w-auto sm:h-auto bg-loginModalBg px-[6vw] xsm:px-[18vw] sm:px-12 pt-24 sm:pt-[3rem] pb-12 flex flex-col items-center justify-start sm:rounded-2xl relative">
          <LoginForm switchToSignUp={switchToSignUp} />
        </div>
      </div>
    </>
  );
};

export default Login;
