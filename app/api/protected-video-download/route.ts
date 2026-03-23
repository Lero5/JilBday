import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidBirthdaySessionToken, SESSION_COOKIE_NAME } from "@/lib/birthday-auth";

export const runtime = "nodejs";

const DEFAULT_EXTERNAL_VIDEO_URL =
  "https://q1zqow49qzn3ahtq.public.blob.vercel-storage.com/BigInJapan-FlikQp9HZuQKLM1gPmrEubcB4qnsCg.mp4";

async function getLocalVideoBuffer() {
  const candidatePaths = [
    join(process.cwd(), "media", "biginjapan.mp4"),
    join(process.cwd(), "media", "BigInJapan.mp4"),
  ];

  for (const filePath of candidatePaths) {
    try {
      return await readFile(filePath);
    } catch {
      continue;
    }
  }

  throw new Error("Video file not found");
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!isValidBirthdaySessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const externalVideoUrl = process.env.BIRTHDAY_VIDEO_URL?.trim() || DEFAULT_EXTERNAL_VIDEO_URL;

  if (externalVideoUrl) {
    const upstreamResponse = await fetch(externalVideoUrl, { cache: "no-store" });

    if (!upstreamResponse.ok) {
      return NextResponse.json({ error: "Video unavailable" }, { status: upstreamResponse.status });
    }

    return new NextResponse(upstreamResponse.body, {
      headers: {
        "Content-Type": upstreamResponse.headers.get("content-type") ?? "video/mp4",
        "Content-Disposition": 'attachment; filename="BigInJapan.mp4"',
        "Cache-Control": "private, no-store, no-cache, must-revalidate",
      },
    });
  }

  const videoBuffer = await getLocalVideoBuffer();

  return new NextResponse(videoBuffer, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": 'attachment; filename="BigInJapan.mp4"',
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
    },
  });
}