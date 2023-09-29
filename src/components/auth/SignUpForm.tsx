import React, { FormEvent } from "react";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";

interface SignUpFormProps {
  handleSignUp: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  switchToSignIn: () => void;
}

export const SignUpForm = ({
  handleSignUp,
  switchToSignIn,
}: SignUpFormProps) => {
  const demoSignupHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Creating accounts on demo application is disabled, sorry");
  };

  return (
    <form
      className="w-full flex flex-col gap-4 items-center"
      onSubmit={demoSignupHandler}
    >
      <div className="mb-1 w-full relative">
        <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[1rem] left-3">
          <MailIcon />
        </div>
        <input
          type="text"
          id="username"
          name="username"
          className="mt-1 p-2 w-full border rounded-md form-element-styled pl-11"
          placeholder="Your e-mail"
        />
      </div>
      <div className="mb-1 w-full relative">
        <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[0.95rem] left-3">
          <PasswordIcon />
        </div>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md form-element-styled pl-11"
          placeholder="Your password"
        />
      </div>
      <button
        type="submit"
        className="transition  mt-8 w-4/5 b p-2 rounded-md button-contained"
      >
        Create account
      </button>
      <div className="w-full text-sm flex justify-center gap-2 mt-4">
        <div className="">Already have an account?</div>
        <div
          onClick={switchToSignIn}
          className="text-mainColor dark:text-mainColorDark text-semibold cursor-pointer"
        >
          Sign in here...
        </div>
      </div>
    </form>
  );
};
