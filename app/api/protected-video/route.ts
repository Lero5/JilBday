import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isValidBirthdaySessionToken, SESSION_COOKIE_NAME } from "@/lib/birthday-auth";

export const runtime = "nodejs";

async function resolveVideoPath(): Promise<string> {
  const candidates = [
    join(process.cwd(), "media", "biginjapan.mp4"),
    join(process.cwd(), "media", "BigInJapan.mp4"),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }

  throw new Error("Video file not found");
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!isValidBirthdaySessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoPath = await resolveVideoPath();
  const videoStats = await stat(videoPath);
  const fileSize = videoStats.size;
  const rangeHeader = request.headers.get("range");

  if (!rangeHeader) {
    const stream = createReadStream(videoPath);
    const webStream = Readable.toWeb(stream) as ReadableStream;

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(fileSize),
        "Accept-Ranges": "bytes",
        "Cache-Control": "private, no-store, no-cache, must-revalidate",
      },
    });
  }

  const bytesPrefix = "bytes=";

  if (!rangeHeader.startsWith(bytesPrefix)) {
    return new NextResponse("Invalid range", { status: 416 });
  }

  const [rangeStart, rangeEnd] = rangeHeader.replace(bytesPrefix, "").split("-");
  const start = Number.parseInt(rangeStart, 10);
  const end = rangeEnd ? Number.parseInt(rangeEnd, 10) : fileSize - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileSize) {
    return new NextResponse("Invalid range", { status: 416 });
  }

  const chunkSize = end - start + 1;
  const stream = createReadStream(videoPath, { start, end });
  const webStream = Readable.toWeb(stream) as ReadableStream;

  return new NextResponse(webStream, {
    status: 206,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(chunkSize),
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
    },
  });
}