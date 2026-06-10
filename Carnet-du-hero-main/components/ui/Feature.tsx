export function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-2">
      <span className="text-gold">{icon}</span>
      <div>
        <p className="font-serif text-gold2">{title}</p>
        <p className="text-xs text-muted">{text}</p>
      </div>
    </div>
  );
}
