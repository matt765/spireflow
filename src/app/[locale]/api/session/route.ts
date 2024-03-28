import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";

import { defaultSession, sessionOptions } from "../../../../services/ironSessionConfig";
import { SessionData } from "../../../../services/ironSessionConfig";

export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const formData = await request.formData();

  session.isLoggedIn = true;
  session.username = (formData.get("username") as string) ?? "No username";
  await session.save();

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303
  // not using redirect() yet: https://github.com/vercel/next.js/issues/51592#issuecomment-1810212676
  return Response.redirect(
    `${request.nextUrl.origin}/api/session`,
    303,
  );
}


export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const action = new URL(request.url).searchParams.get("action");

  // This code can be called like this: /api/session?action=logout
  if (action === "logout") {
    session.destroy();
    return redirect(
      "/api/session",
    );
  }

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}