import { cookies } from "next/headers";
import { UnlockForm } from "./UnlockForm";
import { isValidBirthdaySessionToken, SESSION_COOKIE_NAME } from "@/lib/birthday-auth";

function BirthdayContent() {
  const videoSource = "/api/protected-video";

  return (
    <main
      className="min-h-screen bg-stone-100 bg-cover bg-center bg-no-repeat px-4 py-8 sm:py-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 246, 240, 0.24), rgba(252, 246, 240, 0.4)), url('/api/protected-background')",
      }}
    >
      <div
        className="mx-auto w-full max-w-2xl animate-fade-in-up rounded-[2rem] border border-white/90 p-5 shadow-[0_26px_70px_rgba(85,55,35,0.22)] sm:p-8"
        style={{ backgroundColor: "rgba(255, 251, 248, 0.97)" }}
      >
        <header className="border-b border-stone-200/70 pb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-rose-500/80">
            Für dich
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Zu deinem Geburtstag...
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-[1.05rem]">
            Ein paar Worte, ein kleines bisschen Musik und etwas Schönes.
          </p>
        </header>

        <div className="mt-8 space-y-6">
          <section className="space-y-4 rounded-[1.75rem] border border-rose-100/90 bg-gradient-to-br from-[rgba(255,255,255,0.99)] to-[rgba(255,244,246,0.98)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-medium tracking-wide text-rose-700">
              Erstmal etwas Entertainment
            </div>
            <p className="text-base leading-8 text-stone-700 sm:text-[1.04rem]">
              Zum Geburstag wollte ich dir meinen eigenen Gesang ersparen - also habe ich jemanden gefragt, das für mich zu übernehmen.</p>
            <p>
                <a
                  href="https://www.instagram.com/p/DVVyHjxjpBR/"
                  target="_blank"
                  style={{ color: "blue" }}
                  rel="noreferrer"
                  className="font-medium text-rose-700 underline decoration-rose-300 underline-offset-4 transition hover:text-rose-800"
                >
                  Oliver
                </a>
                's Selbstvertrauen ist wirklich beeindruckend. Ich finde sogar, er ist ein tolles Vorbild für alle Leute, die einem Traum hinterherjagen.
              
              
            </p> 
            <p> 
              PS: Seine besten Glückwünsche zum Geburtstag!
            </p>

            <video
              controls
              preload="metadata"
              className="w-full rounded-[1.4rem] border border-black/10 bg-black shadow-sm"
              src={videoSource}
            >
              Dein Browser unterstützt das Video-Tag nicht.
            </video>

            <div className="flex justify-center pt-1">
              <a
                href="/api/protected-video-download"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/90 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-white"
              >
                Download Video
              </a>
            </div>
          </section>

          <section className="space-y-4 rounded-[1.75rem] border border-amber-100/90 bg-gradient-to-br from-[rgba(255,255,255,0.99)] to-[rgba(255,250,235,0.98)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium tracking-wide text-amber-800">
              Und etwas Schönes dazu
            </div>
            <p className="text-base leading-8 text-stone-700 sm:text-[1.04rem]">
              Ich wollte dir etwas schenken, das man wirklich erlebt und nicht nur irgendwo hinstellt.
              Ob du das mit mir machst, mit Franzi oder mit irgendwem sonst, ist komplett dir überlassen.
            </p>

            <div className="flex justify-center pt-1">
              <a
                href="/api/protected-download"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/90 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-white"
              >
                Download
              </a>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-stone-200/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6" style={{ backgroundColor: "rgba(255, 255, 255, 0.98)" }}>
            <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-medium tracking-wide text-stone-700">
              Und jetzt noch ehrlich
            </div>
            <p className="mt-4 text-base leading-8 text-stone-700 sm:text-[1.04rem]">
              Kein Mensch über 21 findet es wirklich toll, älter zu werden - aber verhindern können wir&apos;s leider auch nicht.
              Also bleibt eigentlich nur, die Zeit dazwischen so schön zu machen, wie wir nur können.
              Mir hilfst du dabei und dafür bin ich sehr dankbar.
            </p>
            <p className="mt-4 text-base leading-8 text-stone-700 sm:text-[1.04rem]">
              Ich wünsche dir von Herzen alles Gute und ein fantastisches nächstes Jahr.
            </p>
          </section>
        </div>
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
