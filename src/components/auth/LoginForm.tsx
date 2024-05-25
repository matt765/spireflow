import React from "react";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useHandleLogin } from "../../hooks/auth/useHandleLogin";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { ContainedButton } from "../common/ContainedButton";
import { Input } from "../forms/Input";

export interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  switchToSignUp?: () => void;
}

export const LoginForm = ({ switchToSignUp }: LoginFormProps) => {
  const {
    handleLogin,
    loading,
    setLoading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    authErrorDisplayed,
    handleSubmit,
    onSubmit,
    control,
    errors,
  } = useHandleLogin();

  const t = useTranslations("navbar");

  return (
    <div className="w-full xsm:w-[22rem] flex flex-col items-center py-4">
      <h1
        className={`text-4xl font-bold text-primaryText dark:text-primaryTextDark`}
      >
        {t("signIn")}
      </h1>
      <form
        className="w-full flex flex-col gap-3 py-12 pt-14"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="new-password"
      >
        <div className="mb-2 w-full relative">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="new-password"
                type="text"
                placeholder={t("yourEmail")}
                icon={<MailIcon />}
                onInput={() => setShowPasswordError(false)}
              />
            )}
          />
        </div>
        {errors.email && showEmailError && (
          <div className="hidden md:block absolute md:left-[25.8rem]  top-[10.4rem] z-50 min-w-[20rem] w-auto pointer-events-none">
            <div className="relative">
              <div className="bg-secondaryBg dark:bg-inputBgDark text-white inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md dark:border-inputBorderDark">
                {errors.email.message}
              </div>
            </div>
          </div>
        )}
        <div className="mb-2 relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="new-password"
                type="password"
                placeholder={t("yourPassword")}
                icon={<PasswordIcon />}
                onInput={() => setShowEmailError(false)}
              />
            )}
          />
        </div>
        {errors.password && showPasswordError && (
          <div className="hidden md:block absolute left-[25.8rem] top-[14rem] 1xl:top-[14.4rem] z-50 min-w-[20rem] w-auto pointer-events-none">
            <div className="relative mb-8">
              <div className="bg-secondaryBg dark:bg-inputBgDark text-white text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md dark:border-inputBorderDark">
                {errors.password.message}
              </div>
            </div>
          </div>
        )}
        {/* On mobile I used standard red text for errors instead of tooltips to save space */}
        {!authErrorDisplayed && errors.email && showEmailError && (
          <p className="text-red-500 -mb-2 md:hidden">
            {errors.email.message}
          </p>
        )}
        {!authErrorDisplayed && errors.password && showPasswordError && (
          <p className="text-red-500 -mb-3  md:hidden">
            {errors.password.message}
          </p>
        )}
        {authErrorDisplayed && (
          <p className="text-red-500 -mb-3">
            {t("eitherEmailOrPasswordIsIncorrect")}
          </p>
        )}
        <div className="w-10/12 lg:w-12/12 flex gap-4 justify-center flex-col items-center mx-auto mt-6">
          <div className="w-full h-10 max-h-10">
            <ContainedButton disabled={loading} type="submit">
              {loading ? (
                <div className="w-6 h-6 -mt-4 -ml-5">
                  <SpinnerIcon />
                </div>
              ) : (
                "Login"
              )}
            </ContainedButton>
          </div>
          <div className="w-full h-10 max-h-10">
            <ContainedButton
              disabled={loading}
              className="ignore-error-hide"
              handleClick={() => {
                handleLogin({
                  email: process.env.NEXT_PUBLIC_SAMPLE_ACCOUNT_EMAIL as string,
                  password: process.env.NEXT_PUBLIC_SAMPLE_ACCOUNT_PASSWORD as string,
                  isDemo: true,
                });
                setLoading(true);
              }}
              type="submit"
            >
              {loading ? (
                <div className="w-6 h-6 -mt-4 -ml-5">
                  <SpinnerIcon />
                </div>
              ) : (
                t("sampleAccount")
              )}
            </ContainedButton>
            <div className="w-full text-xs sm:text-sm flex justify-center gap-2 mt-10 ">
              <div className="text-primaryText dark:text-primaryTextDark">
                {t("noAccount")}
              </div>
              <div
                onClick={switchToSignUp}
                className="text-coloredText dark:text-coloredTextDark text-semibold 
                cursor-pointer dark:hover:text-coloredTextHoverDark hover:text-coloredTextHover ignore-error-hide"
              >
                {t("registerHere")}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
