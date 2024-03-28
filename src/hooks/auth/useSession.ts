import { useEffect, useState } from "react";

interface Session {
  username?: string;
  isLoggedIn?: boolean;
}

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) throw new Error("Failed to fetch session data");
        const data = await response.json();
        setSession(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, loading, error };
};
