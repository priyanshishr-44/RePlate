import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Utensils,
  Leaf,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function Impact() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="page-hero impact-hero">
        <div className="page-hero-content">
          <span className="eyebrow">OUR IMPACT</span>
          <h1>
            Real food.
            <br />
            <span>Real change.</span>
          </h1>
          <p>
            Every meal shared through RePlate creates a ripple of hope.
            Here’s the difference we’re making together.
          </p>
        </div>
      </section>

      {/* ===== BIG STATS ===== */}
      <section className="impact-stats-wrapper">
        <div className="impact-stats">
          <div className="impact-stat">
            <div className="impact-stat-icon">
              <Utensils size={24} />
            </div>
            <h2>12,480+</h2>
            <p>Meals rescued & shared</p>
          </div>
          <div className="impact-stat">
            <div className="impact-stat-icon">
              <Users size={24} />
            </div>
            <h2>3,200+</h2>
            <p>People fed</p>
          </div>
          <div className="impact-stat">
            <div className="impact-stat-icon">
              <Leaf size={24} />
            </div>
            <h2>8.4 tons</h2>
            <p>Food waste prevented</p>
          </div>
          <div className="impact-stat">
            <div className="impact-stat-icon">
              <Heart size={24} />
            </div>
            <h2>140+</h2>
            <p>Active partners</p>
          </div>
        </div>
      </section>

      {/* ===== STORIES ===== */}
      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">IMPACT IN ACTION</span>
          <h2>
            Stories that keep us <span>going</span>
          </h2>
          <p>Small actions. Meaningful results.</p>
        </div>

        <div className="impact-grid">
          <article className="impact-card">
            <div className="impact-card-icon">
              <MapPin size={22} />
            </div>
            <h3>Community Kitchens</h3>
            <p>
              Partnered with 28 community kitchens across the city to deliver
              hot meals daily to families in need.
            </p>
          </article>

          <article className="impact-card">
            <div className="impact-card-icon">
              <Clock size={22} />
            </div>
            <h3>Same-day Rescue</h3>
            <p>
              Average pickup time under 90 minutes — keeping food fresh and
              safe for those who need it most.
            </p>
          </article>

          <article className="impact-card">
            <div className="impact-card-icon">
              <ShieldCheck size={22} />
            </div>
            <h3>Verified Network</h3>
            <p>
              Every NGO and volunteer is verified so donors can share food
              with complete confidence.
            </p>
          </article>

          <article className="impact-card">
            <div className="impact-card-icon">
              <TrendingUp size={22} />
            </div>
            <h3>Growing Every Month</h3>
            <p>
              40% month-over-month growth in meals shared thanks to our
              amazing donors and volunteers.
            </p>
          </article>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <h2>Want to be part of this impact?</h2>
        <p>Donate food or join as a volunteer — every action counts.</p>
        <div className="cta-buttons">
          <Link to="/donate" className="btn btn-light">
            Donate Food <ArrowRight size={18} />
          </Link>
          <Link to="/volunteer" className="btn btn-outline-light">
            Become a Volunteer
          </Link>
        </div>
      </section>
    </main>
  );
}