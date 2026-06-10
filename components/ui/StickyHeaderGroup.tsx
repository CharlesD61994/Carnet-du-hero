import type { ReactNode } from "react";

export function StickyHeaderGroup({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-[60] bg-night/95 shadow-[0_10px_24px_rgba(0,0,0,.35)] backdrop-blur-xl">
      {children}
    </div>
  );
}
