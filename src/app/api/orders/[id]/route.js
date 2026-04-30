import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// PATCH — update order status (admin only)
export async function PATCH(request, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  const order = await Order.findOneAndUpdate(
    { orderId: id },
    { status: body.status },
    { new: true }
  ).lean();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}

// DELETE — remove an order (admin only)
export async function DELETE(request, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const result = await Order.findOneAndDelete({ orderId: id });

  if (!result) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
