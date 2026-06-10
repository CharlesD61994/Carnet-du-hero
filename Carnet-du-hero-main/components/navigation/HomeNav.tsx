export function HomeNav() {
  return (
    <div className="grid grid-cols-4 border-t border-line bg-night/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 text-center text-xs text-muted">
      <span className="text-gold">
        ⌂<br />
        Accueil
      </span>
      <span>
        ▥<br />
        Bibliothèque
      </span>
      <span>
        ⌘<br />
        Modèles
      </span>
      <span>
        ⚙<br />
        Réglages
      </span>
    </div>
  );
}
