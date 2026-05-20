import { Link, createFileRoute } from '@tanstack/react-router'

import Terminable from '#/components/ui/Terminable'

export const Route = createFileRoute('/')({ component: Landing })

function Landing() {
  return (
    <main className="page-wrap px-4 pb-16 pt-10 sm:pt-16">
      <section className="rise-in grid min-h-[60vh] items-center gap-10 py-12 sm:py-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)] lg:gap-8 lg:py-28 xl:grid-cols-[minmax(0,0.78fr)_minmax(640px,1.22fr)] xl:gap-12">
        <div className="max-w-xl lg:max-w-[34rem]">
          <p className="island-kicker mb-4">mpv-web-control</p>
          <h1 className="display-title mb-6 text-[2.75rem] leading-[1.04] font-bold tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Control mpv from your phone.
          </h1>
          <p className="mb-10 max-w-md text-[1.0625rem] leading-[1.8] text-[var(--ink-soft)]">
            A web interface for the music player on your Raspberry Pi. Open a browser, pick a track, press play. That's it. No apps, no Bluetooth pairing, no proprietary protocols.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/docs/getting-started"
              className="group inline-flex items-center gap-2.5 rounded-full border border-transparent bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] dark:bg-[var(--accent)] dark:text-[#0f1117]"
            >
              Get started
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px dark:bg-black/10">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--chip-bg)] px-5 py-3 text-sm font-semibold text-[var(--ink)] no-underline transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="w-full max-w-3xl opacity-0 rise-in lg:max-w-none" style={{ animationDelay: '200ms' }}>
          <Terminable
            title="pi@homelab"
            titleBarVariant="linux"
            termPrompt="$"
            defaultTypingSpeed={14}
            defaultTypingRandom={25}
            defaultOutputSpeed={90}
            commandDelay={450}
            width="w-full"
            height="h-[360px]"
            startLine="Install once. Serve your local music over the LAN."
            commands={[
              {
                prompt: 'npm install -g mpv-web-control',
                output: '+ mpv-web-control@latest',
              },
              {
                prompt: 'sudo mpv-web-control install --user media --music-root /srv/music --port 3000',
                output: [
                  'mpv-web-control installer (npm)',
                  '[OK] Node.js found.',
                  '[OK] mpv found.',
                  '[OK] Set MUSIC_ROOT=/srv/music',
                  '[OK] Set PORT=3000',
                  '[OK] Service installed, enabled, and started.',
                ],
              },
              {
                prompt: 'sudo systemctl status mpv-web-control',
                output: 'active (running) — open http://pi.local:3000 on your phone',
              },
            ]}
          />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <p className="island-kicker mb-6 text-center">What it does</p>
        <div className="mx-auto grid max-w-3xl gap-x-12 gap-y-10 sm:grid-cols-2">
          {[
            { title: 'Browse your library', body: 'Navigate folders under MUSIC_ROOT. Queue a single file or dump an entire directory into the playlist. Recursive folder support means your "Jazz" folder with 40 subfolders is two taps away from playing.' },
            { title: 'Full playback control', body: 'Play, pause, skip, seek, adjust volume. The seek bar works. The volume slider works. Nothing crashes when you mash the buttons.' },
            { title: 'Playlists that stick', body: 'Save your current queue as a JSON file. Load it later, append to it, or delete it. The files live on disk — no database to corrupt, no migration to run.' },
            { title: 'Zero setup friction', body: 'One environment variable tells it where your music lives. That plus an mpv binary is the entire dependency tree. Runs on any Debian-based Pi in about 90 seconds.' },
          ].map((item, i) => (
            <div
              key={item.title}
              className="rise-in opacity-0"
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <h2 className="mb-2 text-[0.9375rem] font-semibold text-[var(--ink)]">{item.title}</h2>
              <p className="m-0 text-[0.8125rem] leading-[1.75] text-[var(--ink-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rise-in py-16 opacity-0 sm:py-24" style={{ animationDelay: '400ms' }}>
        <div className="shell-outer mx-auto max-w-2xl">
          <div className="shell-inner px-8 py-10 text-center sm:px-12 sm:py-14">
            <p className="island-kicker mb-3">Built for the Pi on your shelf</p>
            <h2 className="display-title mb-4 text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Plug in speakers. Run one command. Control everything from the couch.
            </h2>
            <p className="mb-8 text-[0.9375rem] leading-[1.75] text-[var(--ink-soft)]">
              mpv-web-control doesn't try to be a streaming server or a media center. It does one job — letting you pick and play music through mpv — and stays out of your way.
            </p>
            <Link
              to="/docs/getting-started"
              className="group inline-flex items-center gap-2.5 rounded-full border border-transparent bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] dark:bg-[var(--accent)] dark:text-[#0f1117]"
            >
              Read the setup guide
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px dark:bg-black/10">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
