import React from "react";
import { useRouter } from "next/router";

import { LoginForm } from "../components/auth/LoginForm";
import { useHandleLogin } from "../hooks/useHandleLogin";

export default function Login() {
  const { handleLogin, authError } = useHandleLogin(false, () => {});
  const router = useRouter();
  const switchToSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="w-screen h-screen bg-[#F0F0F5] flex justify-center items-center">
      <div className="w-1/4 h-2/3 bg-white bg-opacity-85 shadow-xl px-16 pt-12 py-20 flex flex-col items-center justify-start pt-16 rounded-2xl relative">
        <h1 className="text-3xl font-semibold mb-12">Sign In</h1>
        <LoginForm
          handleLogin={async (data) => handleLogin(data)}
          authError={authError}
          switchToSignUp={switchToSignUp}
        />
      </div>
    </div>
  );
}
