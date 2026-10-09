import Link from "next/link";

const flightPaths = [
  { name: "Over the roofs", detail: "A quick climb above the clutter of the day." },
  { name: "Above the noise", detail: "A slow drift through restless thoughts." },
  { name: "Skyline rest", detail: "A gentler landing back into your own rhythm." },
];

export default function SessionSelectPage() {
  return (
    <main className="flight-shell">
      <div className="flight-panel">
        <p className="flight-kicker">Route selection</p>
        <h1>Where shall Phind glide next?</h1>

        <div className="flight-options" aria-label="Session types">
          {flightPaths.map((path) => (
            <Link key={path.name} href="/session" className="flight-option">
              <span>{path.name}</span>
              <small>{path.detail}</small>
            </Link>
          ))}
        </div>

        <Link href="/" className="back-link">
          Return to the beginning
        </Link>
      </div>
    </main>
  );
}
