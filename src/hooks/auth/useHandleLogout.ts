import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../../services/firebaseClient";

export const useHandleLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const destroySession = async () => {
    try {
      const response = await fetch("/api/session?action=logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to destroy session");
    } catch (err) {
      console.error("Failed to destroy session:", err);
      setError("Failed to log out");
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      await destroySession();
    } catch (err) {
      console.error("Logout error:", err);

      if (err instanceof Error) {
        setError(`Logout error: ${err.message}`);
      } else {
        setError("Logout failed due to an unknown error");
      }
    } finally {
      setLoading(false);
      location.reload();
    }
  };

  return { handleLogout, loading, error };
};
