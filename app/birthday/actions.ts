"use server";

import { cookies } from "next/headers";
import {
  createBirthdaySessionToken,
  getBirthdayPassword,
  SESSION_COOKIE_NAME,
} from "@/lib/birthday-auth";

export type UnlockState = {
  error: string | null;
  unlocked: boolean;
};

export async function unlockBirthdayPageAction(
  _previousState: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const submittedPassword = formData.get("password");

  if (submittedPassword !== getBirthdayPassword()) {
    return { error: "Wrong password", unlocked: false };
  }

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, createBirthdaySessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { error: null, unlocked: true };
}