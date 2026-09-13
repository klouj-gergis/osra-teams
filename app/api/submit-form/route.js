import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.teams || body.teams.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await prisma.formSubmission.create({
      data: {
        name: body.name,
        phone: body.phone,
        prevServed: body.prevServed || null,
        prevTeams: body.prevTeams || [],
        currentServed: body.currentServed || null,
        currentTeams: body.currentTeams || [],
        skills: body.skills || [],
        wantTry: body.wantTry || [],
        teams: body.teams,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
