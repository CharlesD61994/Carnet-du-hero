'use client';

import { Stat } from '@/lib/types';

type Props = {
  stat: Stat;
  onChange: (delta: number) => void;
};

export function StatControl({ stat, onChange }: Props) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-semibold text-parchment">{stat.name}</p>
        <p className="text-lg font-black text-gold">
          {stat.current}{stat.max !== undefined ? ` / ${stat.max}` : ''}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => onChange(-1)} className="rounded-xl border border-gold/20 bg-leather px-4 py-3 text-xl font-bold active:scale-[0.98]">−</button>
        <button onClick={() => onChange(1)} className="rounded-xl border border-gold/20 bg-leather px-4 py-3 text-xl font-bold active:scale-[0.98]">+</button>
      </div>
    </div>
  );
}
