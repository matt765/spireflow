import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignUpData } from "../../components/auth/SignUpForm";

export const useHandleSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const t = useTranslations("navbar");

  const handleSignUp = async (data: SignUpData) => {
    if (!isLoaded || !signUp) {
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        router.push("/");

        console.log("Successfully signed up");
      } else {
        console.log("Signup process status:", result.status);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
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
