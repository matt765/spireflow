import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  SessionData,
  sessionOptions,
} from "../../../../../services/ironSessionConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Server-side Firebase initialization
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let firebaseApp;
try {
  firebaseApp = firebase.initializeApp(firebaseConfig, "server-auth-signup");
} catch (error) {
  firebaseApp = firebase.app("server-auth-signup");
}

const auth = firebase.auth(firebaseApp);

export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const data = await request.json();
  const { email, password } = data;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const user = userCredential.user;

    if (!user) {
      throw new Error("User creation failed");
    }

    // Update session
    session.isLoggedIn = true;
    session.username = user.email || "";
    await session.save();

    return Response.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Signup failed" }, { status: 400 });
  }
}
