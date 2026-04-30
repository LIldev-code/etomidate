import { NextResponse } from "next/server";
import { validateAdmin, generateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const isValid = await validateAdmin(username, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({ username, role: "admin" });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
