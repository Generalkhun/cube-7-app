import Link from "next/link";

export default function SessionSelectPage() {
  return (
    <main className="session-shell">
      <div className="session-panel">
        <p className="session-kicker">Session Select</p>
        <h1>Choose a starting point.</h1>
        <div className="session-options" aria-label="Session types">
          <Link href="/session" className="session-option">
            <span>Focus</span>
            <small>Short concentration</small>
          </Link>
          <Link href="/session" className="session-option">
            <span>Breath</span>
            <small>Slow reset</small>
          </Link>
          <Link href="/session" className="session-option">
            <span>Awareness</span>
            <small>Grounded presence</small>
          </Link>
        </div>
        <Link href="/" className="back-link">
          Back to home
        </Link>
      </div>
    </main>
  );
}
