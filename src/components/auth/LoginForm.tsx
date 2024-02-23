import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
  clearAuthError?: () => void;
}

export const LoginForm = ({
  handleLogin,
  authError,
  switchToSignUp,
  clearAuthError,
}: LoginFormProps) => {
  const t = useTranslations("navbar");
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [authErrorDisplayed, setAuthErrorDisplayed] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("emailFieldIsRequired"))
      .email(t("pleaseEnterAValidEmail")),
    password: Yup.string()
    .required(t("passwordFieldIsRequired"))
    .min(6, t("passwordMinimumLength")), 
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log(data);
    setLoading(true);
    await handleLogin(data);
  };

  // Hide error messages when user clicks anywhere on the screen
  useEffect(() => {
    const handleDocumentClick = () => {
      setShowEmailError(false);
      setShowPasswordError(false);
      if (clearAuthError) {
        clearAuthError();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  // Effects necessary to not show both error messages at the same time if not needed
  useEffect(() => {
    if (errors.username) {
      setShowEmailError(true);
    }
  }, [errors.username]);

  useEffect(() => {
    if (errors.password) {
      setShowPasswordError(true);
    }
  }, [errors.password]);

  // Effects that delay showing auth error to prevent spam
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        setAuthErrorDisplayed(authError);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setAuthErrorDisplayed("");
    }
  }, [authError]);

  useEffect(() => {
    if (authError) {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [authError]);

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
          <Controller
            name="username"
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
        {errors.username && showEmailError && (
          <div className="absolute left-[27rem] top-[10.5rem] z-50 min-w-[20rem] w-auto">
            <div className="relative">
              <div className="bg-secondaryBg dark:bg-inputBgDark text-white inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md dark:border-inputBorderDark">
                {errors.username.message}
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
        <div className="mb-2 relative">
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
          <div className="absolute  left-[27rem] top-[14.4rem] z-50 min-w-[20rem] w-auto">
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
        {authErrorDisplayed && (
          <p className="text-red-500 -mb-3">
            {t("eitherEmailOrPasswordIsIncorrect")}
          </p>
        )}
        <div className="w-10/12 flex gap-4 justify-center flex-col items-center mx-auto mt-6">
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
