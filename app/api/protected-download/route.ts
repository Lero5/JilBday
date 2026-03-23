import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidBirthdaySessionToken, SESSION_COOKIE_NAME } from "@/lib/birthday-auth";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!isValidBirthdaySessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pdfPath = join(process.cwd(), "media", "Balett.pdf");
  const pdfBuffer = await readFile(pdfPath);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Balett.pdf"',
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
    },
  });
}