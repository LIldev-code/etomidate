import bcrypt from "bcryptjs";
import dbConnect from "./mongodb";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET || "etomidate-secret-key-change-me";

// Simple token generation (base64-encoded — swap for jsonwebtoken in production)
export function generateToken(payload) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })
  );
  const signature = btoa(JWT_SECRET + header + body);
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token) {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return null;
    const expectedSig = btoa(JWT_SECRET + parts[0] + parts[1]);
    if (parts[2] !== expectedSig) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function validateAdmin(username, password) {
  await dbConnect();
  const admin = await Admin.findOne({ username });
  if (!admin) return false;
  const match = await bcrypt.compare(password, admin.password);
  return match;
}
