"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { unlockBirthdayPageAction, type UnlockState } from "./actions";

const initialState: UnlockState = {
  error: null,
  unlocked: false,
};

export function UnlockForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    unlockBirthdayPageAction,
    initialState
  );

  useEffect(() => {
    if (state.unlocked && !isPending) {
      router.refresh();
    }
  }, [isPending, router, state.unlocked]);

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
      >
        <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-zinc-900">
          Passwort
        </h1>
        <p className="mb-5 text-center text-sm text-zinc-600">
          Bitte gib das Passwort ein, um die Seite zu öffnen.
        </p>

        <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none transition focus:border-zinc-500"
          required
        />

        {state.error ? (
          <p className="mt-3 text-sm text-rose-600" role="alert">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="mt-5 w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Prüfe..." : "Öffnen"}
        </button>
      </form>
    </div>
  );
}