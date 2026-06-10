import { Panel } from "./Panel";

export function Fighter({
  name,
  portrait,
  skill,
  end,
  max,
}: {
  name: string;
  portrait: string;
  skill: number;
  end: number;
  max: number;
}) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (end / max) * 100)) : 0;

  return (
    <Panel className="flex items-center gap-3 p-3">
      <div className="grid h-20 w-20 place-items-center rounded-full border border-line bg-panel2 text-4xl">
        {portrait}
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-lg">{name}</h3>
        <p className="text-sm text-muted">
          Habileté <span className="text-parchment">{skill}</span>
        </p>
        <p className="text-sm text-muted">
          Endurance <span className="text-parchment">{end} / {max}</span>
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-line">
          <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Panel>
  );
}
