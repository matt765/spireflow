import { useRouter } from "next/router";

import { SignUpForm } from "../components/loginForm/SignUpForm";
import { useHandleSignUp } from "../hooks/useHandleSignUp";

export default function SignUp() {
  const { handleSignUp } = useHandleSignUp();
  const router = useRouter();

  const switchToSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="w-screen h-screen bg-[#F0F0F5] flex justify-center items-center">
      <div className="w-1/4 h-3/5 bg-white shadow-xl px-16 pt-12 py-20 flex flex-col items-center justify-start pt-16 rounded-2xl relative">
        <h1 className="text-3xl font-semibold mb-12">Sign Up</h1>
        <SignUpForm
          handleSignUp={handleSignUp}
          switchToSignIn={switchToSignIn}
        />
      </div>
    </div>
  );
}
