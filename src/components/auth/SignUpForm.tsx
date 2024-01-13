import React, { FormEvent } from "react";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { Input } from "../forms/Input";
import { ContainedButton } from "../common/ContainedButton";

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
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Your e-mail"
          icon={<MailIcon />}
        />
      </div>
      <div className="mb-1 w-full relative">
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          icon={<PasswordIcon />}
        />
      </div>
      <div className="flex justify-center items-center w-4/5 mt-6">       
        <ContainedButton handleClick={() => demoSignupHandler}>
          Create account
        </ContainedButton>
      </div>

      <div className="w-full text-sm flex justify-center gap-2 mt-4">
        <div className="text-primaryText dark:text-primaryTextDark">
          Already have an account?
        </div>
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
