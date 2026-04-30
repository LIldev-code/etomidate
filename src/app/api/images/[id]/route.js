import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const image = await Image.findById(id);

    if (!image) {
      return new NextResponse("Not found", { status: 404 });
    }

    const buffer = Buffer.from(image.data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": image.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
