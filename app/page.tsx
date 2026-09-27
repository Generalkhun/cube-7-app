import Link from "next/link";

export default function Home() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">CUBE7</div>
        <nav className="nav" aria-label="Main navigation">
          <button type="button" className="nav-link" aria-label="About section">
            About
          </button>
        </nav>
      </header>

      <main className="hero">
        <div className="cube-scene" aria-hidden="true">
          <div className="cube">
            <span className="cube-face face-front" />
            <span className="cube-face face-back" />
            <span className="cube-face face-right" />
            <span className="cube-face face-left" />
            <span className="cube-face face-top" />
            <span className="cube-face face-bottom" />
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">CUBE7</p>
          <p className="tagline">Breathe. Focus. Be present.</p>
        </div>

        <Link href="/session-select" className="primary-cta">
          BEGIN
        </Link>
      </main>
    </div>
  );
}
