import { useState } from "react";
import { useRouter } from 'next/navigation'

import { auth } from "../services/firebaseClient";
import { useLoginStore } from "../store/loginStore";
import { LoginData } from "../components/auth/LoginForm";

export interface HandleLoginProps extends LoginData {
  isDemo?: boolean;
}

export const useHandleLogin = (isModal: boolean, closeModal: () => void) => {
  const [authError, setAuthError] = useState<string>("");
  const { setUser, setLoading } = useLoginStore();
  const router = useRouter();

  const clearAuthError = () => setAuthError("");

  const handleLogin = async (
    data: { username: string; password: string },
    isDemo?: boolean
  ) => {
    setLoading(true);

    const email = isDemo ? "user@test.com" : data.username;
    const password = isDemo ? "user@test.com" : data.password;

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        setUser(user);
        if (isModal && closeModal) {
          closeModal();
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setAuthError("Invalid email or password.");
    }

    setLoading(false);
  };

  return { handleLogin, authError, clearAuthError };
};
