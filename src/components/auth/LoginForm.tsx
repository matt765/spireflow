import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { SpinnerIcon } from "../../assets/icons/Spinner";
import { HandleLoginProps } from "../../hooks/useHandleLogin";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { ContainedButton } from "../common/ContainedButton";
import { Input } from "../forms/Input";

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
  const t = useTranslations("navbar");
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
    <>
      <h1
        className={`text-4xl font-bold text-primaryText dark:text-primaryTextDark`}
      >
        {t("signIn")}
      </h1>
      <form
        className="w-full flex flex-col gap-3 py-12 pt-14 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2 w-full relative">
          <Input
            type="email"
            {...register("username", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            // className="mt-1 p-2 w-full border rounded-md !outline-0 border border-inputBorder dark:border-inputBorderDark bg-inputBg dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark  transition  pl-11 hover:dark:border-mainColorDark hover:border-mainColor"
            placeholder={t("yourEmail")}
            icon={<MailIcon />}
          />
          {errors.username && (
            <p className="text-red-500">Please enter a valid email.</p>
          )}
        </div>
        <div className="mb-2 relative">
          <Input
            type="password"
            {...register("password", { required: true })}
            placeholder={t("yourPassword")}
            icon={<PasswordIcon />}
          />
        </div>

        {authError && <p className="text-red-500">{authError}</p>}
        <div className="w-10/12 flex gap-4 justify-center flex-col items-center mx-auto mt-6">
          <div className="w-full h-10 max-h-10">
            <ContainedButton
              handleClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
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
              handleClick={() => {
                handleLogin({
                  username: "user@test.com",
                  password: "user@test.com",
                  isDemo: true,
                });
                setLoading(true);
              }}
            >
              {loading ? (
                <div className="w-6 h-6 -mt-4 -ml-5">
                  <SpinnerIcon />
                </div>
              ) : (
                t("sampleAccount")
              )}
            </ContainedButton>
            <div className="w-full text-sm flex justify-center gap-2 mt-10">
              <div className="text-primaryText dark:text-primaryTextDark">
                {t("noAccount")}
              </div>
              <div
                onClick={switchToSignUp}
                className="text-coloredText dark:text-coloredTextDark text-semibold 
                cursor-pointer dark:hover:text-coloredTextHoverDark hover:text-coloredTextHover"
              >
                {t("registerHere")}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
