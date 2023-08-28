import React, { FormEvent } from "react";

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
      <div className="mb-1 w-full">
        <input
          type="text"
          id="username"
          name="username"
          className="mt-1 p-2 w-full border rounded-md bg-[#f4f4f4] border-[#e1e1e1]"
          placeholder="Your e-mail"
        />
      </div>
      <div className="mb-1 w-full">
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md bg-[#f4f4f4] border-[#e1e1e1]"
          placeholder="Your password"
        />
      </div>
      <button
        type="submit"
        className="transition  mt-8 w-4/5 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200"
      >
        Create account
      </button>
      <div className="w-full text-sm flex justify-center gap-2 mt-4">
        <div className="">Already have an account?</div>
        <div
          onClick={switchToSignIn}
          className="text-[#5c9aff] text-semibold cursor-pointer"
        >
          Sign in here...
        </div>
      </div>
    </form>
  );
};
