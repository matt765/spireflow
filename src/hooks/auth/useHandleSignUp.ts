import { FormEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { SignUpData } from "../../components/auth/SignUpForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const useHandleSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const t = useTranslations("navbar");

  const handleSignUp = async (data: SignUpData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const result = await response.json();
      if (result.success) {
        console.log("Successfully signed up");
      }
    } catch (error) {
      console.error("An error occurred:", error);
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);
    try {
      // Creating accounts is disabled for demo purposes
      // await handleSignUp(data);
      demoSignupHandler();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const demoSignupHandler = () => {
    alert("Creating accounts on demo application is disabled, sorry");
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // This "error-hide" logic fixes bug that forces double clicking on login button on mobile when errors are visible
      const target = event.target as HTMLElement;
      if (target.closest(".ignore-error-hide")) {
        return;
      }
      setShowEmailError(false);
      setShowPasswordError(false);
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

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

  return {
    handleSignUp,
    loading,
    setLoading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    demoSignupHandler,
    handleSubmit,
    onSubmit,
    control,
    errors,
  };
};
