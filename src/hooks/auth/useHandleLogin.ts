import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";

import { auth } from "../../services/firebaseClient";
import { LoginData } from "../../components/auth/LoginForm";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

  // This function calls '/api/session' route to initialize session in encrypted cookie
  const updateSession = async (userData: LoginData) => {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("password", userData.password);

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update session");

      const sessionData = await response.json();
      console.log("Session updated:", sessionData);
    } catch (error) {
      console.error("Session update error:", error);
      throw new Error("Session update failed");
    }
  };

  const handleLogin = async (data: HandleLoginProps) => {
    setLoading(true);
    const { username, password, isDemo } = data;

    const email = isDemo ? "user@test.com" : username;
    const passwordToUse = isDemo ? "user@test.com" : password;

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;

      if (user) {
        await updateSession({ username: email, password: passwordToUse });
        currentPathname === "/pl/login" && router.push("/pl");
        currentPathname === "/login" && router.push("/");
        if (currentPathname !== "/login" && currentPathname !== "/pl/login") {
          location.reload();
        }
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
    username: Yup.string()
      .required(t("emailFieldIsRequired"))
      .email(t("pleaseEnterAValidEmail")),
    password: Yup.string()
      .required(t("passwordFieldIsRequired"))
      .min(6, t("passwordMinimumLength")),
  });
  
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
