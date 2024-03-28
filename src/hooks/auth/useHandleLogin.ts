import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { auth } from "../../services/firebaseClient";
import { LoginData } from "../../components/auth/LoginForm";

export interface HandleLoginProps extends LoginData {
  isDemo?: boolean;
}

export const useHandleLogin = (isModal?: boolean, closeModal?: () => void) => {
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
      setLoading(false);
    }
  };

  return { handleLogin, authError, clearAuthError };
};
