import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border-t border-line/70 px-6 py-18 sm:px-10 lg:px-16 ${className}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="max-w-3xl space-y-4">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
