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

export async function createNewUserSession(userID: string, username: string, redirectLink: string) {
    const newSession = await storage.getSession();
    newSession.set("userID", userID);
    newSession.set("userName", username)
    console.log("redirecting?")
    return redirect(redirectLink, {
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

export async function getCurrentUserName(req: Request) {
    const currSession = await storage.getSession(req.headers.get("Cookie"));
    const currUser = currSession.get("userName");

    if (!currUser || typeof currUser !== "string") {
        return null;
    }
    return currUser;
}

export async function getLoggedInUser(req: Request) {
    const currUserID = await getCurrentUserID(req);
    const currUserName = await getCurrentUserName(req)

    if (!currUserID || typeof currUserID !== "string") {
        return null
    }
    return {UserID: currUserID, Name: currUserName ? currUserName : ""}
}

