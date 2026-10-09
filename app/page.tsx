import Link from "next/link";

const storyMoments = [
  {
    title: "The lift",
    text: "Phind rises before the city wakes, leaving weight behind and letting the mind drift toward the edges of the sky.",
  },
  {
    title: "The field",
    text: "A black goose glides above objects, not to escape them, but to understand them from a wider view.",
  },
  {
    title: "The return",
    text: "Every descent becomes a softer landing, a quiet reminder that clarity often arrives when we look down with gentleness.",
  },
];

const routeCards = [
  {
    name: "Over the roofs",
    detail: "A brief drift above the ordinary world.",
  },
  {
    name: "Above the noise",
    detail: "A calmer route through restless thoughts.",
  },
  {
    name: "Skyline rest",
    detail: "A slower, softer landing back into the self.",
  },
];

export default function Home() {
  return (
    <div className="flyabove-shell">
      <header className="flyabove-header">
        <div className="brand-block" aria-label="Fly Above brand">
          <span className="brand-word">Fly Above</span>
          <span className="brand-sigil">Phind</span>
        </div>

        <nav className="flyabove-nav" aria-label="Main navigation">
          <Link href="#story">Story</Link>
          <Link href="#paths">Paths</Link>
          <Link href="/session-select">Begin</Link>
        </nav>
      </header>

      <main className="flyabove-main">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">A story for the mind</p>
            <h1>Phind flies above the noise.</h1>
            <p className="lede">
              A black goose moves through the world like a thought that refuses to stay
              trapped inside the objects below. It rises, watches, and returns with a
              sharper sense of stillness.
            </p>

            <div className="hero-actions">
              <Link href="/session-select" className="primary-button">
                Begin the flight
              </Link>
              <Link href="#story" className="secondary-button">
                Read the story
              </Link>
            </div>
          </div>

          <div className="goose-scene" aria-label="Phind soaring over the city">
            <div className="sky-orb" aria-hidden="true" />
            <div className="goose" aria-hidden="true">
              <span className="goose-wing wing-one" />
              <span className="goose-wing wing-two" />
              <span className="goose-body" />
              <span className="goose-head" />
              <span className="goose-beak" />
            </div>

            <div className="landscape" aria-hidden="true">
              <span className="structure tower tower-one" />
              <span className="structure tower tower-two" />
              <span className="structure tower tower-three" />
              <span className="structure block block-one" />
              <span className="structure block block-two" />
            </div>
          </div>
        </section>

        <section id="story" className="story-panel">
          <div className="section-heading">
            <p className="eyebrow">The story</p>
            <h2>Everything is seen from above.</h2>
          </div>

          <div className="story-grid">
            {storyMoments.map((moment) => (
              <article key={moment.title} className="story-card">
                <span className="story-index">0{storyMoments.indexOf(moment) + 1}</span>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="paths" className="path-panel">
          <div className="section-heading narrow">
            <p className="eyebrow">Routes</p>
            <h2>Choose the rhythm of your next chapter.</h2>
          </div>

          <div className="route-grid">
            {routeCards.map((route) => (
              <Link key={route.name} href="/session-select" className="route-card">
                <span className="route-name">{route.name}</span>
                <span className="route-detail">{route.detail}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
