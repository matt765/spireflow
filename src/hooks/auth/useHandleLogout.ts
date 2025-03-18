import { useState } from "react";

export const useHandleLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      await destroySession();
    } catch (err) {
      console.error("Logout error:", err);
      if (err instanceof Error) {
        setError(`Logout error: ${err.message}`);
      } else {
        setError("Logout failed due to an unknown error");
      }
    } finally {
      location.reload();
    }
  };

  return { handleLogout, loading, error };
};
