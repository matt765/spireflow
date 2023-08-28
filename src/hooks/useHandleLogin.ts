import { useState } from "react";
import { useRouter } from "next/router";

import { auth } from "../services/firebaseClient";
import { useLoginStore } from "../store/loginStore";

export const useHandleLogin = (isModal: boolean, closeModal: () => void) => {
  const [authError, setAuthError] = useState<string>("");
  const { setUser, setLoading } = useLoginStore();
  const router = useRouter();

  const handleLogin = async (data: { username: string; password: string }) => {
    setLoading(true);
    const { username: email, password } = data;
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

  return { handleLogin, authError };
};
