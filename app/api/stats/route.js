import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all submissions
    const submissions = await prisma.formSubmission.findMany({
      orderBy: { submittedAt: "desc" },
    });

    // Team labels mapping
    const teamLabels = {
      "تيم السوشيال ميديا": "social",
      "تيم الصلاة": "prayer",
      "التيم الترفيهي": "fun",
      "تيم الترانيم": "hymns",
      "تيم المحتوى": "content",
    };

    // Count teams
    const teamCounts = {
      social: 0,
      prayer: 0,
      fun: 0,
      hymns: 0,
      content: 0,
    };

    submissions.forEach((submission) => {
      submission.teams.forEach((team) => {
        Object.entries(teamLabels).forEach(([teamName, key]) => {
          if (teamName === team) {
            teamCounts[key]++;
          }
        });
      });
    });

    // Get statistics
    const stats = {
      totalSubmissions: submissions.length,
      teamCounts,
      submissions: submissions.map((sub) => ({
        id: sub.id,
        name: sub.name,
        phone: sub.phone,
        teams: sub.teams,
        prevServed: sub.prevServed,
        prevTeams: sub.prevTeams,
        currentServed: sub.currentServed,
        currentTeams: sub.currentTeams,
        skills: sub.skills,
        notes: sub.notes,
        wantTry: sub.wantTry,
        submittedAt: sub.submittedAt,
      })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
