import { cookies } from "next/headers";
import { UnlockForm } from "./UnlockForm";
import { isValidBirthdaySessionToken, SESSION_COOKIE_NAME } from "@/lib/birthday-auth";

function BirthdayContent() {
  const videoSource = "/api/protected-video";

  return (
    <main
      className="min-h-screen bg-stone-300 px-4 py-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(120, 124, 132, 0.24), rgba(120, 124, 132, 0.24)), linear-gradient(rgba(240, 240, 240, 0.2), rgba(240, 240, 240, 0.35)), url('/api/protected-background')",
        backgroundBlendMode: "saturation, normal, normal",
        backgroundRepeat: "repeat, repeat, repeat",
        backgroundSize: "auto, auto, 520px auto",
        backgroundPosition: "0 0, 0 0, center top",
      }}
    >
      <div
        className="mx-auto w-full max-w-[620px] animate-fade-in-up border border-stone-500 p-5 shadow-[0_10px_26px_rgba(20,20,20,0.18)] sm:p-7"
        style={{ backgroundColor: "rgba(245, 245, 245, 0.96)" }}
      >
        <header className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-stone-700">
            Für dich, Jiliane
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Zu deinem Geburtstag...
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-[1.05rem]">
            Ein paar Worte, ein kleines bisschen Musik und etwas Schönes.
          </p>
        </header>

        <div className="mt-8 space-y-0">
          <section className="border border-stone-500 bg-[rgba(250,250,250,0.96)]">
            <div className="border-b border-stone-500 px-3 py-2 text-lg font-semibold text-stone-800">
              Erstmal etwas Entertainment
            </div>

            <div className="space-y-4 px-4 py-4 text-base leading-8 text-stone-800">
              <p>
                Zum Geburtstag wollte ich dir meinen eigenen Gesang ersparen - also habe ich jemanden gefragt, das für mich zu übernehmen.
              </p>
              <p>
                <a
                  href="https://www.instagram.com/p/DVVyHjxjpBR/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-700 no-underline transition hover:text-blue-800"
                >
                  Oliver
                </a>
                s Selbstvertrauen ist wirklich beeindruckend. Ich finde sogar, er ist ein tolles Vorbild für alle Leute, die einem Traum hinterherjagen.
              </p>
              <p>PS: Seine besten Glückwünsche zum Geburtstag!</p>
            </div>

            <video
              controls
              preload="metadata"
              className="w-full border-y border-stone-500 bg-black"
              src={videoSource}
            >
              Dein Browser unterstützt das Video-Tag nicht.
            </video>

            <div className="flex justify-center px-4 py-4">
              <a
                href="/api/protected-video-download"
                className="inline-flex items-center justify-center border border-stone-500 bg-white px-6 py-2.5 text-base font-medium text-stone-900 transition hover:bg-stone-100"
              >
                Download Video
              </a>
            </div>
          </section>

          <section className="border-x border-b border-stone-500 bg-[rgba(250,250,250,0.96)]">
            <div className="border-b border-stone-500 px-3 py-2 text-lg font-semibold text-stone-800">
              Und etwas Schönes dazu
            </div>

            <div className="px-4 py-4 text-base leading-8 text-stone-800">
              <p>
                Ich wollte dir etwas schenken, das man wirklich erlebt und nicht nur irgendwo hinstellt.
                Ob du das mit mir machst, mit Franzi oder mit irgendwem sonst, ist komplett dir überlassen.
              </p>
            </div>

            <div className="flex justify-center px-4 pb-4">
              <a
                href="/api/protected-download"
                className="inline-flex items-center justify-center border border-stone-500 bg-white px-6 py-2.5 text-base font-medium text-stone-900 transition hover:bg-stone-100"
              >
                Download
              </a>
            </div>
          </section>

          <section className="border-x border-b border-stone-500 bg-[rgba(250,250,250,0.96)] px-4 py-4 text-base leading-8 text-stone-800">
            <div className="mb-4 inline-flex bg-stone-100 px-3 py-1 text-sm font-medium tracking-wide text-stone-700">
              Und jetzt noch ehrlich
            </div>
            <p>
              Kein Mensch über 21 findet es wirklich toll, älter zu werden - aber verhindern können wir&apos;s leider auch nicht.
              Also bleibt eigentlich nur, die Zeit dazwischen so schön zu machen, wie wir nur können.
              Mir hilfst du dabei und dafür bin ich sehr dankbar.
            </p>
            <p className="mt-4">
              Jiliane, ich wünsche dir von Herzen alles Gute und ein fantastisches nächstes Jahr.
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
