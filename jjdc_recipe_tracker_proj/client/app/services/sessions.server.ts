import { createCookieSessionStorage, redirect } from "react-router";


const storage = createCookieSessionStorage({
    cookie: {
      name: "jjdc_bb_session",
      secrets: ["jjdc_mea1_88"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    }
  });

const { getSession, commitSession, destroySession } = storage

export { getSession, commitSession, destroySession };

export async function createNewUserSession(userID: string, redirectLink: string) {
    const newSession = await storage.getSession();
    newSession.set("userID", userID);
    console.log("redirecting?")
    return redirect("/", {
        headers: {
            "Set-Cookie": await storage.commitSession(newSession),
        },
    });
}

export async function getCurrentUserID(req: Request) {
    const currSession = await storage.getSession(req.headers.get("Cookie"));
    const currUser = currSession.get("userID");

    if (!currUser || typeof currUser !== "string") {
        return null;
    }
    return currUser;
}

