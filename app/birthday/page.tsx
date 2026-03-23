import { cookies } from "next/headers";
import { UnlockForm } from "./UnlockForm";
import { isValidBirthdaySessionToken, SESSION_COOKIE_NAME } from "@/lib/birthday-auth";

function BirthdayContent() {
  const videoSource = process.env.BIRTHDAY_VIDEO_URL ?? "/api/protected-video";

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl animate-fade-in-up space-y-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Zu deinem Geburtstag...
          </h1>
        </header>

        <section className="space-y-4">
          <p className="text-base leading-relaxed text-zinc-700">
            Wollte ich dir meinen Gesang ersparen... also hab ich diesen Dude gefragt ob er für dich singt.
            Ich bewundere sein Selbstvertrauen. Habs trotzdem nicht geschafft das zu Ende zu hören haha
          </p>

          <video
            controls
            preload="metadata"
            className="w-full rounded-2xl border border-black/10 bg-black"
            src={videoSource}
          >
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </section>

        <section className="space-y-4">
          <p className="text-base leading-relaxed text-zinc-700">
            Wollte ich ein schönes Erlebnis schenken.
            Ob du das mit mir machst, oder mit Franzi oder sonst wem, liegt ganz bei dir.
          </p>

          <a
            href="/api/protected-download"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Download
          </a>
        </section>

        <section>
          <p className="text-base leading-relaxed text-zinc-700">
            Möchte ich ehrlich sein. Kein Mensch über 21 mag es älter zu werden, aber aufhalten können wir&apos;s trotzdem nicht.
            Wir können uns nur dabei helfen, die schönste Zeit zu haben, die wir uns vorstellen können.
            Du hilfst mir dabei. Danke dafür.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700">
            Ich wünsche dir alles Gute und ein unvergessliches nächstes Jahr.
          </p>
        </section>
      </div>
    </main>
  );
}

export default async function BirthdayPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const isUnlocked = isValidBirthdaySessionToken(session);

  if (!isUnlocked) {
    return <UnlockForm />;
  }

  return <BirthdayContent />;
}
