"use client";

import { useTranslations } from "next-intl";
import { LoginForm } from "../../../components/auth/LoginForm";
import { useHandleLogin } from "../../../hooks/auth/useHandleLogin";

const Login = () => {
  const t = useTranslations("singleCharts.scatter");
  const { handleLogin, authError, clearAuthError } = useHandleLogin(false);
  return (
    <>
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0  backdrop-blur-md" />
      <div className="fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-secondaryBg dark:bg-secondaryBgDark ">
        <div    
          className=" w-screen h-screen sm:w-[30rem] sm:h-auto bg-loginModalBg dark:bg-loginModalBgDark shadow-xl px-[6vw] xsm:px-[18vw] sm:px-16  pt-24 sm:pt-[4rem] pb-20 flex flex-col items-center justify-start sm:rounded-2xl relative"
        >    
          <LoginForm
            handleLogin={async (data) => handleLogin(data)}
            authError={authError}   
            clearAuthError={clearAuthError}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
