export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-line/70 bg-surface px-6 py-12 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            OPENCLAW
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Bring your real product story, screenshots, and proof points next.
          </h2>
          <p className="text-base leading-7 text-muted">
            This first pass uses placeholder content and production-ready structure,
            so the next iteration can focus on brand language and real assets.
          </p>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p>hello@openclaw.example</p>
          <p>Singapore | Global teams</p>
          <p>Operational command for fast-moving organizations</p>
        </div>
      </div>
    </footer>
  );
}
