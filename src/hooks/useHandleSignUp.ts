import { FormEvent } from "react";

import { auth } from "../services/firebaseClient";

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
        console.log("Successfully signed up:", user);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return { handleSignUp };
};
