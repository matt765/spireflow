import React from "react";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { Input } from "../forms/Input";
import { ContainedButton } from "../common/ContainedButton";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useHandleSignUp } from "../../hooks/auth/useHandleSignUp";

export interface SignUpData {
  email: string;
  password: string;
}

interface SignUpFormProps {
  switchToSignIn: () => void;
}

export const SignUpForm = ({ switchToSignIn }: SignUpFormProps) => {
  const {
    loading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    handleSubmit,
    onSubmit,
    control,
    errors,
  } = useHandleSignUp();

  const t = useTranslations("navbar");

  return (
    <div className="min-w-full sm:min-w-[20rem] flex flex-col items-center mb-2">
      <h1 className="text-4xl font-bold mb-16 mt-4 text-primaryText dark:text-primaryTextDark">
        {t("signUp")}
      </h1>
      <form
        className="w-full flex flex-col gap-4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-1 w-full relative h-[2.7rem]">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder={t("yourEmail")}
                icon={<MailIcon />}
                onInput={() => setShowPasswordError(false)}
              />
            )}
          />
        </div>
        {errors.email && showEmailError && (
          <div className="hidden md:block absolute left-[23.5rem] top-[11rem] z-50 min-w-[20rem] w-auto">
            <div className="relative">
              <div className="bg-secondaryBg dark:bg-inputBgDark text-white inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md dark:border-inputBorderDark">
                {errors.email.message}
                <svg
                  className="absolute text-inputBg dark:text-inputBgDark h-0 left-0 ml-3 top-[1.9rem] "
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                >
                  <polygon
                    className="fill-current border border-inputBorder dark:border-inputBorderDark"
                    points="0,0 127.5,127.5 255,0"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className="mb-1 w-full relative h-[2.7rem]">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder={t("yourPassword")}
                icon={<PasswordIcon />}
                onInput={() => setShowEmailError(false)}
              />
            )}
          />
        </div>
        {errors.password && showPasswordError && (
          <div className="absolute  hidden md:block left-[23.5rem] top-[14.5rem] 1xl:top-[14.9rem] z-50 min-w-[20rem] w-auto">
            <div className="relative mb-8">
              <div className="bg-secondaryBg dark:bg-inputBgDark text-white text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md dark:border-inputBorderDark">
                {errors.password.message}
                <svg
                  className="absolute text-inputBg dark:text-inputBgDark h-0 left-0 ml-3 top-[1.9rem] "
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                >
                  <polygon
                    className="fill-current border border-inputBorder dark:border-inputBorderDark"
                    points="0,0 127.5,127.5 255,0"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        {/* On mobile I used for errors standard red text instead of tooltips to save space */}
        {errors.email && showEmailError && (
          <p className="text-red-500 -mb-2 md:hidden text-left w-full">
            {errors.email.message}
          </p>
        )}
        {errors.password && showPasswordError && (
          <p className="text-red-500 -mb-3  md:hidden  text-left w-full">
            {errors.password.message}
          </p>
        )}
        <div className="flex justify-center items-center w-4/5 mt-6">
          <ContainedButton
            disabled={loading}
            type="submit"
            className="ignore-error-hide"
          >
            {loading ? <SpinnerIcon /> : t("createAccount")}
          </ContainedButton>
        </div>
        <div className="w-full text-sm flex justify-center gap-2 mt-6">
          <div className="text-primaryText dark:text-primaryTextDark">
            {t("alreadyHaveAccount")}
          </div>
          <div
            onClick={switchToSignIn}
            className="text-coloredText dark:text-coloredTextDark text-semibold cursor-pointer dark:hover:text-coloredTextHoverDark hover:text-coloredTextHover ignore-error-hide"
          >
            {t("signInHere")}
          </div>
        </div>
      </form>
    </div>
  );
};
