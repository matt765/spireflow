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
    <div className="w-full md:w-[19rem] 1xl:w-[22rem] flex flex-col items-center py-0 1xl:py-4">
      <h1
        className={`text-3xl 1xl:text-4xl font-bold text-primaryText`}
      >
        {t("signIn")}
      </h1>
      <form
        className="w-full flex flex-col gap-3 py-12 pt-10 1xl:pt-14"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="new-password"
      >
        <div className="mb-2 w-full relative h-[2.7rem]">
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
          <div className="hidden md:block absolute left-[23rem] 1xl:left-[25.8rem] top-[8.4rem] 1xl:top-[10.4rem] z-50 min-w-[20rem] w-auto pointer-events-none">
            <div className="relative">
              <div className="bg-secondaryBg bg-inputBg text-white inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md">
                {errors.email.message}
              </div>
            </div>
          </div>
        )}
        <div className="mb-2 relative h-[2.7rem]">
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
          <div className="hidden md:block absolute left-[23rem] 1xl:left-[25.8rem] top-[12rem] 1xl:top-[14rem] 1xl:top-[14.4rem] z-50 min-w-[20rem] w-auto pointer-events-none">
            <div className="relative mb-8">
              <div className="bg-secondaryBg bg-inputBg text-white text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md">
                {errors.password.message}
              </div>
            </div>
          </div>
        )}
        {/* On mobile I used standard red text for errors instead of tooltips to save space */}
        {!authErrorDisplayed && errors.email && showEmailError && (
          <p className="text-sm text-red-500 -mb-2 md:hidden">{errors.email.message}</p>
        )}
        {!authErrorDisplayed && errors.password && showPasswordError && (
          <p className="text-sm text-red-500 -mb-3 md:hidden">
            {errors.password.message}
          </p>
        )}
        {authErrorDisplayed && (
          <p className="text-sm text-red-500 -mb-3">
            {t("eitherEmailOrPasswordIsIncorrect")}
          </p>
        )}
        <div className="w-10/12 lg:w-12/12 flex gap-4 justify-center flex-col items-center mx-auto mt-4 1xl:mt-6">
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
                  email: "",
                  password: "",
                  isDemo: true,
                });
                setLoading(true);
              }}
              type="button"
            >
              {loading ? (
                <div className="w-6 h-6 -mt-4 -ml-5">
                  <SpinnerIcon />
                </div>
              ) : (
                t("sampleAccount")
              )}
            </ContainedButton>
            <div className="w-full text-[12px] 1xl:text-[12px] flex justify-center gap-2 mt-8 1xl:mt-10">
              <div className="text-primaryText">
                {t("noAccount")}
              </div>
              <div
                onClick={switchToSignUp}
                className="text-coloredText text-semibold cursor-pointer hover:text-coloredTextHover ignore-error-hide"
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
