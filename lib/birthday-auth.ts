import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE_NAME = "birthday_session";

const SESSION_PAYLOAD = "birthday-unlocked";

function getSessionSecret(): string {
  return process.env.BIRTHDAY_SESSION_SECRET ?? "replace-this-in-vercel";
}

export function getBirthdayPassword(): string {
  return process.env.BIRTHDAY_PASSWORD ?? "bamboleo123";
}

function createSignature(payload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function createBirthdaySessionToken(): string {
  return `${SESSION_PAYLOAD}.${createSignature(SESSION_PAYLOAD)}`;
}

export function isValidBirthdaySessionToken(token?: string): boolean {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || payload !== SESSION_PAYLOAD) {
    return false;
  }

  const expectedSignature = createSignature(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, expectedBuffer);
}