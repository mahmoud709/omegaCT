import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.HR_SECRET || "omega_hr_secure_key_2024";
export const COOKIE_NAME = "hr_session";
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const check = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return hash === check;
  } catch { return false; }
}

export function createSessionToken(userId: string, userName: string): string {
  const payload = JSON.stringify({ userId, userName, exp: Date.now() + SESSION_DURATION });
  const encoded = Buffer.from(payload).toString("base64");
  const sig = crypto.createHmac("sha256", SECRET).update(encoded).digest("hex");
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string): { userId: string; userName: string } | null {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const encoded = token.substring(0, dot);
    const sig = token.substring(dot + 1);
    const expected = crypto.createHmac("sha256", SECRET).update(encoded).digest("hex");
    if (sig !== expected) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64").toString());
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, userName: payload.userName };
  } catch { return null; }
}

export async function getHRSession(): Promise<{ userId: string; userName: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
