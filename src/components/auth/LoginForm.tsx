import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { SpinnerIcon } from "../../assets/icons/Spinner";
import { HandleLoginProps } from "../../hooks/useHandleLogin";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { GoogleIcon } from "../../assets/icons/GoogleIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";

export interface LoginData {
  username: string;
  password: string;
}

interface LoginFormProps {
  handleLogin: SubmitHandler<HandleLoginProps>;
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
      <div className="mb-2 w-full relative">
        <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[1rem] left-3">
          <MailIcon />
        </div>
        <input
          type="email"
          {...register("username", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          className="mt-1 p-2 w-full border rounded-md !outline-0 border border-inputBorder dark:border-inputBorderDark bg-inputBg dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark  transition  pl-11 hover:dark:border-mainColorDark hover:border-mainColor"
          placeholder="Your e-mail"
        />
        {errors.username && (
          <p className="text-red-500">Please enter a valid email.</p>
        )}
      </div>
      <div className="mb-2 relative">
        <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[0.95rem] left-3">
          <PasswordIcon />
        </div>
        <input
          type="password"
          {...register("password", { required: true })}
          className="mt-1 p-2 w-full border rounded-md !outline-0 border border-inputBorder dark:border-inputBorderDark bg-inputBg dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark  transition  pl-11 hover:dark:border-mainColorDark hover:border-mainColor"
          placeholder="Your password"
        />
      </div>
      <div className="w-full text-sm flex justify-start gap-2 mt-4">
        <div className="text-primaryText dark:text-primaryTextDark">Don&apos;t have an account yet?</div>
        <div
          onClick={switchToSignUp}
          className="text-mainColor dark:text-mainColorDark text-semibold cursor-pointer"
        >
          Register here...
        </div>
      </div>
      {authError && <p className="text-red-500">{authError}</p>}
      <div className="w-full flex justify-center flex-col items-center">
        <button
          type="submit"
          disabled={loading}
          className="disabled:opacity-75 pt-0 pt-2 flex items-center justify-center h-10 max-h-10 transition mt-4 w-4/5 button-contained"
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
          type="button"
          disabled={loading}
          onClick={() => {
            handleLogin({
              username: "user@test.com",
              password: "user@test.com",
              isDemo: true,
            });
            setLoading(true);
          }}
          className="disabled:opacity-75 pt-0 pt-2 flex items-center justify-center h-10 max-h-10 transition mt-4 w-4/5 button-contained"
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

      <div className="flex items-center justify-center mt-6">
        <hr className="w-8 border-neutral-400 mt-1 mx-4" />
        <div className="text-primaryText dark:text-primaryTextDark">
          Login with social media
        </div>
        <hr className="w-8 border-neutral-400 mt-1 mx-4" />
      </div>
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="mt-2 w-32 k p-2 pl-5 button-outlined rounded-md flex items-center gap-2 stroke-grayIcon fill-grayIcon  dark:stroke-grayIconDark dark:fill-grayIconDark"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="mt-2 w-32 p-2 pl-5 rounded-md button-outlined flex items-center gap-2 stroke-grayIcon  fill-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark"
        >
          <GithubIcon />
          GitHub
        </button>
      </div>
    </form>
  );
};
