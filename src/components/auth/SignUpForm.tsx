import React, { FormEvent } from "react";

import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { Input } from "../forms/Input";
import { ContainedButton } from "../common/ContainedButton";
import { useTranslations } from "next-intl";

interface SignUpFormProps {
  handleSignUp: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  switchToSignIn: () => void;
}

export const SignUpForm = ({
  handleSignUp,
  switchToSignIn,
}: SignUpFormProps) => {
  const t = useTranslations("navbar");

  const demoSignupHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Creating accounts on demo application is disabled, sorry");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-14 mt-0 text-primaryText dark:text-primaryTextDark">
        {t("signUp")}
      </h1>
      <form
        className="w-full flex flex-col gap-4 items-center"
        onSubmit={demoSignupHandler}
      >
        <div className="mb-1 w-full relative">
          <Input
            type="text"
            id="username"
            name="username"
            placeholder={t("yourEmail")}
            icon={<MailIcon />}
          />
        </div>
        <div className="mb-1 w-full relative">
          <Input
            type="password"
            id="password"
            name="password"
            placeholder={t("yourPassword")}
            icon={<PasswordIcon />}
          />
        </div>
        <div className="flex justify-center items-center w-4/5 mt-6">
          <ContainedButton handleClick={() => demoSignupHandler}>
           {t("createAccount")}
          </ContainedButton>
        </div>

        <div className="w-full text-sm flex justify-center gap-2 mt-4">
          <div className="text-primaryText dark:text-primaryTextDark">
            Already have an account?
          </div>
          <div
            onClick={switchToSignIn}
            className="text-coloredText dark:text-coloredTextDark text-semibold 
          cursor-pointer dark:hover:text-coloredTextHoverDark hover:text-coloredTextHover"
          >
            Sign in here...
          </div>
        </div>
      </form>
    </>
  );
};
