"use client";

import { LoginForm } from "../../../components/auth/LoginForm";
import { useHandleLogin } from "../../../hooks/auth/useHandleLogin";
import { useRouter } from "next/navigation";

const Login = () => {
  const { handleLogin, authError, clearAuthError } = useHandleLogin(false);
  const router = useRouter();

  const switchToSignUp = () => {
    router.push("/register")
  };

  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0  backdrop-blur-md" />
      <div className=" fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-secondaryBg dark:bg-secondaryBgDark ">
        <div    
          className="border border-mainBorder dark:border-mainBorderDark w-screen h-screen sm:w-[30rem] sm:h-auto bg-loginModalBg dark:bg-loginModalBgDark px-[6vw] xsm:px-[18vw] sm:px-16  pt-24 sm:pt-[4rem] pb-20 flex flex-col items-center justify-start sm:rounded-2xl relative"
        >    
          <LoginForm
            handleLogin={async (data) => handleLogin(data)}
            authError={authError}   
            clearAuthError={clearAuthError}
            switchToSignUp={switchToSignUp}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
