
import { Link } from "react-router-dom";
import {
  Heart,
  Target,
  Eye,
  HandHeart,
  Leaf,
  Users,
  ShieldCheck,
  Recycle,
  ArrowRight,
  Utensils,
  Sprout,
  Globe2,
} from "lucide-react";
import "./About.css";

const principles = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We believe everyone deserves access to nutritious food and a community that cares.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "We aim to build reliable connections between donors, NGOs and volunteers.",
  },
  {
    icon: Recycle,
    title: "Sustainability",
    description:
      "We encourage responsible food sharing and help reduce unnecessary food waste.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We bring people together to create meaningful change through small actions.",
  },
];

export default function About() {
  return (
    <main className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            <Leaf size={16} /> ABOUT REPLATE
          </span>

          <h1>
            Food deserves
            <br />
            <span>a second chance.</span>
          </h1>

          <p>
            We are building a community where surplus food finds a purpose.
            RePlate connects food donors with NGOs and volunteers to reduce
            food waste and help communities in need.
          </p>

          <div className="about-hero-buttons">
            <Link to="/donate-food" className="about-btn-primary">
              Donate Food <ArrowRight size={18} />
            </Link>

            <Link to="/volunteer" className="about-btn-outline">
              Join Our Community
            </Link>
          </div>
        </div>

        <div className="about-hero-visual">
          <div className="about-visual-circle">
            <div className="about-visual-inner">
              <Utensils size={64} />
              <Sprout size={42} />
            </div>
          </div>

          <div className="about-floating-card">
            <Heart size={20} fill="currentColor" />
            <div>
              <strong>Share More. Waste Less.</strong>
              <span>Every meal matters.</span>
            </div>
          </div>

          <div className="about-floating-leaf">
            <Leaf size={32} />
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="about-intro">
        <div className="about-intro-heading">
          <span className="about-eyebrow">WHO WE ARE</span>
          <h2>Small actions can create a big difference.</h2>
        </div>

        <div className="about-intro-text">
          <p>
            RePlate is a community-driven food donation platform designed to
            make sharing surplus food easier, faster and more meaningful.
          </p>
          <p>
            We aim to bring together individuals, restaurants, food businesses,
            NGOs and volunteers so that good food can reach people who need it
            instead of going to waste.
          </p>
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section className="about-mvv">
        <div className="about-section-heading">
          <span className="about-eyebrow">OUR PURPOSE</span>
          <h2>What drives RePlate?</h2>
          <p>Our purpose is built around three simple beliefs.</p>
        </div>

        <div className="about-mvv-grid">
          <article className="about-mvv-card">
            <div className="about-card-icon">
              <Target size={27} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To make food donation simple, accessible and transparent, so
              that surplus food can reach people who need it.
            </p>
          </article>

          <article className="about-mvv-card about-mvv-featured">
            <div className="about-card-icon">
              <Eye size={27} />
            </div>
            <h3>Our Vision</h3>
            <p>
              A world where surplus food is seen as an opportunity, not waste,
              and every community has access to nutritious meals.
            </p>
          </article>

          <article className="about-mvv-card">
            <div className="about-card-icon">
              <HandHeart size={27} />
            </div>
            <h3>Our Values</h3>
            <p>
              Compassion, trust, sustainability and community are at the
              heart of everything we aim to achieve.
            </p>
          </article>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story">
        <div className="about-story-visual">
          <div className="about-story-main">
            <div className="about-story-icon">
              <HandHeart size={65} />
            </div>
            <span>RESCUE FOOD</span>
            <strong>SHARE HOPE</strong>
            <Leaf size={35} className="about-story-leaf" />
          </div>

          <div className="about-story-label">
            <Globe2 size={19} />
            Creating a more caring community
          </div>
        </div>

        <div className="about-story-content">
          <span className="about-eyebrow">OUR STORY</span>
          <h2>
            Born from a simple question:
            <br />
            <span>Why should good food go to waste?</span>
          </h2>

          <p>
            Every day, perfectly good food is thrown away while many families
            struggle to access a proper meal. This gap inspired the idea
            behind RePlate.
          </p>

          <p>
            We envision a platform where food businesses and individuals can
            share surplus food, while NGOs and volunteers help coordinate its
            collection and distribution.
          </p>

          <p>
            RePlate is our step towards creating a more responsible,
            connected and compassionate food-sharing community.
          </p>

          <Link to="/find-food" className="about-text-link">
            Explore how RePlate works <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="about-values">
        <div className="about-section-heading">
          <span className="about-eyebrow">WHAT WE BELIEVE</span>
          <h2>The principles that guide us.</h2>
          <p>Four values that shape our approach to food sharing.</p>
        </div>

        <div className="about-values-grid">
          {principles.map((item, index) => {
            const Icon = item.icon;

            return (
              <article className="about-value-card" key={item.title}>
                <span className="about-value-number">
                  0{index + 1}
                </span>
                <div className="about-value-icon">
                  <Icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-icon">
          <Heart size={30} />
        </div>

        <span className="about-eyebrow">BE PART OF THE CHANGE</span>

        <h2>Good food. Good people. A better tomorrow.</h2>

        <p>
          Whether you donate food or volunteer your time, your contribution
          can help make a difference.
        </p>

        <div className="about-hero-buttons">
          <Link to="/donate-food" className="about-btn-light">
            Donate Food <ArrowRight size={18} />
          </Link>

          <Link to="/volunteer" className="about-btn-outline-light">
            Become a Volunteer
          </Link>
        </div>
      </section>

    </main>
  );
}
