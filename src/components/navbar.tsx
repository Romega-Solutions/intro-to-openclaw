const links = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-background/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#" className="text-sm font-semibold uppercase tracking-[0.24em]">
          OPENCLAW
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-md border border-accent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:border-accent-strong hover:bg-accent-strong"
        >
          Book a walkthrough
        </a>
      </div>
    </header>
  );
}
