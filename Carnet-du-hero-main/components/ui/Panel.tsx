import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`gold-frame rounded-2xl bg-panel/80 shadow-card backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}
