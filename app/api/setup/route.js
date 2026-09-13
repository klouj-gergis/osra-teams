import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// One-time setup endpoint: creates the admin user if it doesn't exist yet.
// Protected by SETUP_SECRET so random visitors can't trigger it.
// Visit: https://your-site.vercel.app/api/setup?secret=YOUR_SETUP_SECRET
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (!process.env.SETUP_SECRET) {
      return NextResponse.json(
        { error: "SETUP_SECRET is not set in your environment variables." },
        { status: 500 }
      );
    }

    if (secret !== process.env.SETUP_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "password123";
    const email = process.env.ADMIN_EMAIL || "admin@example.com";

    const existing = await prisma.adminUser.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({
        message: `Admin user "${username}" already exists. No changes made.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({
      data: { username, email, password: hashedPassword },
    });

    return NextResponse.json({
      message: `Admin user "${username}" created successfully. You can now log in at /dashboard/login.`,
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Setup failed", details: error.message },
      { status: 500 }
    );
  }
}
