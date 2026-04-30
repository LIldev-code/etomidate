import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP, GIF, or SVG." }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    // Convert to base64 and store in MongoDB
    await dbConnect();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const image = await Image.create({
      filename: file.name,
      contentType: file.type,
      data: base64,
    });

    // Return the API URL that serves the image
    const url = `/api/images/${image._id}`;
    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
