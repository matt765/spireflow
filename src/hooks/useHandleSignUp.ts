import { FormEvent } from "react";
import { useRouter } from "next/router";

import { auth } from "../services/firebaseClient";
import { signIn } from "next-auth/react";

export const useHandleSignUp = () => {
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
        const idToken = await user.getIdToken(true);

        signIn("credentials", {
          idToken,
          callbackUrl: "/",
        });

        console.log("Successfully signed up:", user);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return { handleSignUp };
};
