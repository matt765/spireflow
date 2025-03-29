import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginData } from "../../components/auth/LoginForm";

export interface HandleLoginProps extends LoginData {
  isDemo?: boolean;
}

export const useHandleLogin = () => {
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [authErrorDisplayed, setAuthErrorDisplayed] = useState("");
  const t = useTranslations("navbar");

  const clearAuthError = () => setAuthError("");

  const currentPathname = usePathname();

  const handleLogin = async (data: HandleLoginProps) => {
    setLoading(true);
    const { email, password, isDemo } = data;

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          isDemo: isDemo || false,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      currentPathname === "/pl/login" && router.push("/pl");
      currentPathname === "/login" && router.push("/");
      if (currentPathname !== "/login" && currentPathname !== "/pl/login") {
        location.reload();
      }
    } catch (error) {
      console.error("Firebase login error:", error);
      setAuthError("Invalid email or password.");
    } finally {
      if (authError) {
        setLoading(false);
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
        setLoading(false);
      }, 700);
    } else {
      setAuthErrorDisplayed("");
    }
  }, [authError]);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setLoading(true);

    try {
      await handleLogin(data);
    } catch (error) {
      console.error("Login process error:", error);
    } finally {
      setTimeout(() => setLoading(false), 700);
    }
  };

  return {
    handleLogin,
    authError,
    clearAuthError,
    validationSchema,
    loading,
    setLoading,
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
