import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { SpinnerIcon } from "../../assets/icons/Spinner";

interface LoginData {
  username: string;
  password: string;
}

interface LoginFormProps {
  handleLogin: SubmitHandler<LoginData>;
  authError: string;
  switchToSignUp: () => void;
}

export const LoginForm = ({
  handleLogin,
  authError,
  switchToSignUp,
}: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setLoading(true);
    await handleLogin(data);
    setLoading(false);
  };

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-2 w-full">
        <input
          type="email"
          {...register("username", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          className="mt-1 p-2 w-full border rounded-md bg-[#f4f4f4] border-[#e1e1e1]"
          placeholder="Your e-mail"
        />
        {errors.username && (
          <p className="text-red-500">Please enter a valid email.</p>
        )}
      </div>
      <div className="mb-2">
        <input
          type="password"
          {...register("password", { required: true })}
          className="mt-1 p-2 w-full border rounded-md bg-[#f4f4f4] border-[#e1e1e1]"
          placeholder="Your password"
        />
      </div>
      <div className="w-full text-sm flex justify-start gap-2 mt-4">
        <div className="">Don&apos;t have an account yet?</div>
        <div
          onClick={switchToSignUp}
          className="text-[#5c9aff] text-semibold cursor-pointer"
        >
          Register here...
        </div>
      </div>
      {authError && <p className="text-red-500">{authError}</p>}
      <div className="w-full flex justify-center flex-col items-center">
        <button
          type="submit"
          disabled={loading}
          className="disabled:opacity-75 pt-0 pt-2 flex items-center justify-center h-10 max-h-10 transition mt-6 w-4/5 bg-[#5c9aff] text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          {loading ? (
            <div className="w-12 h-12 pb-1">
              <SpinnerIcon />
            </div>
          ) : (
            "Login"
          )}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="disabled:opacity-75 pt-0 pt-2 flex items-center justify-center h-10 max-h-10 transition mt-4 w-4/5 bg-[#5c9aff] text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          {loading ? (
            <div className="w-12 h-12 pb-1">
              <SpinnerIcon />
            </div>
          ) : (
            "Demo Account"
          )}
        </button>
      </div>

      <div className="flex items-center justify-center mt-4">
        <hr className="w-8 border-neutral-400 mt-1 mx-4" />
        <div className="text-neutral-600">Login with social media</div>
        <hr className="w-8 border-neutral-400 mt-1 mx-4" />
      </div>
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="mt-2 w-1/3 text-black border border-[#5c9aff] black p-2 rounded-md hover:bg-white focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="mt-2 w-1/3 text-black border  border-[#5c9aff] p-2 rounded-md hover:bg-white focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          GitHub
        </button>
      </div>
    </form>
  );
};
