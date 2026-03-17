import content from "@/content.json";

type TeaserContent = typeof content.teaser;
type RevealContent = typeof content.reveal;

function TeaserSection({ data }: { data: TeaserContent }) {
  return (
    <section
      className="mx-auto max-w-lg rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-sm animate-fade-in-up animate-delay-400"
      aria-label="Gift teaser"
    >
      <div
        className="mb-4 text-5xl animate-float"
        role="img"
        aria-label="sparkles"
      >
        {data.giftIcon}
      </div>
      <h2 className="mb-3 text-2xl font-bold text-rose-700">{data.giftTitle}</h2>
      <p className="mb-4 text-base leading-relaxed text-gray-700">
        {data.giftMessage}
      </p>
      <div className="rounded-2xl bg-rose-50 px-6 py-4">
        <p className="text-sm leading-relaxed text-rose-800">{data.giftHint}</p>
      </div>
    </section>
  );
}

function RevealSection({ data }: { data: RevealContent }) {
  return (
    <section
      className="mx-auto max-w-lg rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-sm animate-fade-in-up animate-delay-400"
      aria-label="Gift reveal"
    >
      <div
        className="mb-4 text-5xl animate-float"
        role="img"
        aria-label="gift icon"
      >
        {data.giftIcon}
      </div>
      <h2 className="mb-3 text-2xl font-bold text-rose-700">{data.giftTitle}</h2>
      <p className="mb-5 text-base leading-relaxed text-gray-700">
        {data.giftMessage}
      </p>
      <ul className="space-y-2">
        {data.giftDetails.map((detail, i) => (
          <li
            key={i}
            className="rounded-xl bg-rose-50 px-5 py-3 text-sm text-rose-800"
          >
            {detail}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function BirthdayPage() {
  const { mode, teaser, reveal } = content;
  const isReveal = mode === "reveal";
  const active = isReveal ? reveal : teaser;

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 px-4 py-12">
      {/* Hero */}
      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-rose-400 animate-fade-in-up">
          For Jil
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl animate-fade-in-up animate-delay-100">
          {active.heroTitle}
        </h1>
        <p className="mb-4 text-lg font-medium text-rose-600 animate-fade-in-up animate-delay-200">
          {active.heroSubtitle}
        </p>
        <p className="mx-auto max-w-md text-base leading-relaxed text-gray-600 animate-fade-in-up animate-delay-300">
          {active.heroMessage}
        </p>
      </header>

      {/* Gift section */}
      {isReveal ? (
        <RevealSection data={reveal} />
      ) : (
        <TeaserSection data={teaser} />
      )}

      {/* Footer */}
      <footer className="mt-12 text-center animate-fade-in-up animate-delay-500">
        <p className="text-sm text-gray-400">{active.footerNote}</p>
      </footer>
    </main>
  );
}
