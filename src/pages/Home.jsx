
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  Leaf
} from "lucide-react";

import "./Home.css";

export default function Home() {
  return (
    <main className="rp-home">

      {/* NAVIGATION BAR */}
      <header className="rp-navbar">
        <div className="rp-nav-container">

          <Link to="/" className="rp-logo">
            <span className="rp-logo-icon">
              <Leaf size={27} />
            </span>
            <span>Re<span>Plate</span></span>
          </Link>

          <nav className="rp-nav-links">
            <a href="#home" className="active">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#impact">Impact</a>
            <a href="#about">About</a>
          </nav>

          <div className="rp-nav-actions">
            <Link to="/login" className="rp-login-link">
              Log in
            </Link>

            <Link to="/login" className="rp-nav-donate">
              Donate food
            </Link>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="rp-hero" id="home">
        <div className="rp-hero-content">

          <div className="rp-hero-badge">
            <Sparkles size={17} />
            Trusted Fresh-Food Distribution
          </div>

          <h1 className="rp-hero-title">
            Fresh Food.
            <br />
            <span>Real Impact.</span>
          </h1>

          <p className="rp-hero-description">
            RePlate connects food donors, NGOs and volunteers
            so quality food reaches families while it is still fresh.
            Together, we can reduce food waste and share hope.
          </p>

          <div className="rp-hero-buttons">
            <Link to="/login" className="rp-donate-button">
              Donate Food
              <ArrowRight size={21} />
            </Link>

            <a href="#how-it-works" className="rp-explore-button">
              Explore RePlate
              <ArrowRight size={19} />
            </a>
          </div>

          <div className="rp-hero-features">
            <div>
              <CircleCheck />
              <span>Verified Partners</span>
            </div>

            <div>
              <CircleCheck />
              <span>Coordinated Pickups</span>
            </div>

            <div>
              <CircleCheck />
              <span>Transparent Impact</span>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rp-how-section" id="how-it-works">

        <span className="rp-section-label">
          HOW REPLATE WORKS
        </span>

        <h2>
          From Surplus Food to <span>Shared Hope.</span>
        </h2>

        <p>
          A simple way to connect food donors, NGOs and volunteers
          to make sure good food reaches people who need it.
        </p>

        <div className="rp-how-cards">

          <article className="rp-how-card">
            <div className="rp-how-icon">
              <Heart size={28} />
            </div>
            <h3>Donate Food</h3>
            <p>
              Restaurants and individuals can share surplus food
              with people in need.
            </p>
          </article>

          <article className="rp-how-card">
            <div className="rp-how-icon">
              <ShieldCheck size={28} />
            </div>
            <h3>Connect with NGOs</h3>
            <p>
              NGOs can discover available food donations and
              coordinate collection.
            </p>
          </article>

          <article className="rp-how-card">
            <div className="rp-how-icon">
              <Heart size={28} />
            </div>
            <h3>Share Hope</h3>
            <p>
              Volunteers help food reach families and communities
              who need support.
            </p>
          </article>

        </div>
      </section>

    </main>
  );
}
