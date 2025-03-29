import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {
  SessionData,
  sessionOptions,
} from "../../../../../services/ironSessionConfig";

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
  firebaseApp = firebase.initializeApp(firebaseConfig, "server-auth");
} catch (error) {
  firebaseApp = firebase.app("server-auth");
}

const auth = firebase.auth(firebaseApp);

export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const data = await request.json();
  const { email, password, isDemo } = data;

  try {
    let userCredential;

    if (isDemo) {
      const demoEmail = process.env.SAMPLE_ACCOUNT_EMAIL;
      const demoPassword = process.env.SAMPLE_ACCOUNT_PASSWORD;

      if (!demoEmail || !demoPassword) {
        throw new Error("Demo account not configured");
      }

      userCredential = await auth.signInWithEmailAndPassword(
        demoEmail,
        demoPassword
      );
    } else {
      userCredential = await auth.signInWithEmailAndPassword(email, password);
    }

    const user = userCredential.user;

    // Check if user exists before using its properties
    if (!user) {
      throw new Error("User is null after authentication");
    }

    // Update session
    session.isLoggedIn = true;
    session.username = user.email || "";
    await session.save();

    return Response.json({ success: true });
  } catch (error) {
    console.error("Authentication error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 401 });
  }
}
