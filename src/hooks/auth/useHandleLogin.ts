import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn } from "@clerk/nextjs";

import { LoginData } from "../../components/auth/LoginForm";
import { useAppStore } from "../../store/appStore";

export interface HandleLoginProps extends LoginData {
  isDemo?: boolean;
}

export const useHandleLogin = () => {
  const [authError, setAuthError] = useState<string>("");

  const router = useRouter();
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [authErrorDisplayed, setAuthErrorDisplayed] = useState("");
  const t = useTranslations("navbar");
  const { isLoaded, signIn, setActive } = useSignIn();

  const setIsLoggingIn = useAppStore((state) => state.setIsLoggingIn);
  const clearAuthError = () => setAuthError("");
  const currentPathname = usePathname();

  const handleLogin = async (data: HandleLoginProps) => {
    if (!isLoaded || !signIn) {
      return;
    }

    setIsLoggingIn(true);

    const { email, password, isDemo } = data;

    // Handle demo account
    const loginEmail = isDemo
      ? process.env.NEXT_PUBLIC_SAMPLE_ACCOUNT_EMAIL || ""
      : email;
    const loginPassword = isDemo
      ? process.env.NEXT_PUBLIC_SAMPLE_ACCOUNT_PASSWORD || ""
      : password;

    try {
      const result = await signIn.create({
        identifier: loginEmail,
        password: loginPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        if (currentPathname === "/pl/login") {
          router.push("/pl");
        } else if (currentPathname === "/login") {
          router.push("/");
        } else {
          location.reload();
        }
      }
    } catch (error) {
      console.log("Clerk login error:", error);

      const clerkError = error as {
        errors?: {
          message?: string;
          code?: string;
          meta?: any;
        }[];
      };

      if (clerkError.errors && clerkError.errors.length > 0) {
        const firstError = clerkError.errors[0];

        if (firstError.code) {
          const translatedError =
            t.raw(`authErrors.${firstError.code}`) !==
            `authErrors.${firstError.code}`
              ? t(`authErrors.${firstError.code}`)
              : firstError.message || t("authErrors.defaultError");

          setAuthError(translatedError);
        } else if (firstError.message) {
          setAuthError(firstError.message);
        } else {
          setAuthError(t("authErrors.defaultError"));
        }
      } else {
        setAuthError(t("authErrors.defaultError"));
      }
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("emailFieldIsRequired"))
      .email(t("pleaseEnterAValidEmail")),
    password: Yup.string()
      .required(t("passwordFieldIsRequired"))
      .min(6, t("passwordMinimumLength")),
  });

  // Hide error messages when user clicks anywhere on the screen
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // This "error-hide" logic fixes bug that forces double clicking on register/sample button on mobile when errors are visible
      const target = event.target as HTMLElement;
      if (target.closest(".ignore-error-hide")) {
        return;
      }
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  // Effects necessary to not show both error messages at the same time if not needed
  useEffect(() => {
    if (errors.email) {
      setShowEmailError(true);
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      setShowPasswordError(true);
    }
  }, [errors.password]);

  // Effects that delay showing auth error to prevent spam
  useEffect(() => {
    if (authError) {
      setTimeout(() => {
        setAuthErrorDisplayed(authError);
        setIsLoggingIn(false);
      }, 700);
    } else {
      setAuthErrorDisplayed("");
    }
  }, [authError]);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await handleLogin(data);
    } catch (error) {
      console.error("Login process error:", error);
      setIsLoggingIn(false);
    }
  };

  return {
    handleLogin,
    authError,
    clearAuthError,
    validationSchema,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    authErrorDisplayed,
    setAuthErrorDisplayed,
    onSubmit,
    handleSubmit,
    control,
    errors,
  };
};
