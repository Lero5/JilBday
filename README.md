# JilBday

Passwortgeschützte Birthday-Seite mit serverseitig geschütztem Gutschein-Download.

## Schutz-Logik

- Die Seite unter `/birthday` zeigt zuerst ein Passwort-Formular.
- Bei korrektem Passwort wird serverseitig ein signiertes, `httpOnly` Cookie gesetzt.
- Der PDF-Download läuft über `/api/protected-download` und prüft dieses Cookie serverseitig.
- Das PDF liegt in `media/Balett.pdf` und wird **nicht** aus `/public` serviert.

Damit ist der Schutz bewusst simpel, aber klar stärker als ein reiner Frontend-Check.

## Dateien platzieren

- PDF: `media/Balett.pdf`
- Video lokal (Fallback): `media/biginjapan.mp4` oder `media/BigInJapan.mp4`

## Großes Video (~180 MB) auf Vercel

Für Deployment auf Vercel sollte das Video nicht als großes Repo-Asset im Server-Bundle liegen.
Empfohlen:

1. Video extern hosten (z. B. Vercel Blob oder S3-kompatibel).
2. URL als Environment Variable `BIRTHDAY_VIDEO_URL` setzen.
3. Die Seite nutzt dann diese URL im `<video>` Player.

Ohne `BIRTHDAY_VIDEO_URL` wird als Fallback `/api/protected-video` genutzt (lokale Datei aus `media/`).

## Vercel Environment Variables

- `BIRTHDAY_PASSWORD` (optional, default: `bamboleo123`)
- `BIRTHDAY_SESSION_SECRET` (dringend setzen, langer zufälliger Wert)
- `BIRTHDAY_VIDEO_URL` (empfohlen für große Datei auf Vercel)