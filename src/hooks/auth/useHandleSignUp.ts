import { FormEvent, useEffect, useState } from "react";
import * as Yup from "yup";

import { auth } from "../../services/firebaseClient";
import { useTranslations } from "next-intl";
import { SignUpData } from "../../components/auth/SignUpForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const useHandleSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const t = useTranslations("navbar");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.username.value;
    const password = form.password.value;

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        console.log("Successfully signed up:", user);
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
    const handleDocumentClick = () => {
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
