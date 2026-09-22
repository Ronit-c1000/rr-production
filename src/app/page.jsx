"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiMoon, FiSun } from "react-icons/fi";
import companyLogo from "../assets/logo.png";
import { useTheme } from "../common/AppShell";

const destinations = [
  { title: "Himalayan escapes", place: "Nepal", accent: "01" },
  { title: "Quiet mountain kingdoms", place: "Bhutan", accent: "02" },
  { title: "High-altitude wonder", place: "Tibet", accent: "03" },
];

export default function HomePage() {
  const { isNightMode, onToggleNightMode } = useTheme();
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Roam further / travel deeper</p>
          <h1>Journeys that stay with you.</h1>
          <p className="hero-description">
            Thoughtful small-group adventures through the world&apos;s most
            extraordinary landscapes.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/tours">
              Explore journeys <FiArrowUpRight aria-hidden="true" />
            </Link>
            <button
              className="theme-toggle"
              type="button"
              onClick={onToggleNightMode}
              aria-label={isNightMode ? "Use day mode" : "Use night mode"}
              aria-pressed={isNightMode}
            >
              {isNightMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              <span>{isNightMode ? "Day mode" : "Night mode"}</span>
            </button>
          </div>
        </div>
        <div className="hero-aside">
          <Image src={companyLogo} alt="Roam and Rise" priority />
          <p>Curated routes. Local insight. More room to wonder.</p>
        </div>
      </section>

      <section className="destinations-section" aria-labelledby="destinations-title">
        <div className="section-heading">
          <p className="eyebrow">Start somewhere remarkable</p>
          <h2 id="destinations-title">Find your next horizon.</h2>
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <Link className="destination-card" href="/tours" key={destination.place}>
              <span className="card-number">{destination.accent}</span>
              <div>
                <p>{destination.place}</p>
                <h3>{destination.title}</h3>
              </div>
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
