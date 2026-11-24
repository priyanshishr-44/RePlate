import { Link } from "react-router-dom";
import {
  Utensils,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hiw-hero">
        <div className="hiw-hero-content">
          <span className="eyebrow">HOW IT WORKS</span>
          <h1>
            A simple, transparent process designed
            <br />
            around <span>freshness and dignity.</span>
          </h1>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section className="hiw-steps-section">
        <div className="hiw-steps">
          {/* Step 1 */}
          <div className="hiw-step">
            <div className="hiw-step-icon">
              <Utensils size={22} />
            </div>
            <div className="hiw-step-content">
              <span className="hiw-step-label">STEP 1</span>
              <h3>Donate fresh food</h3>
              <p>
                Restaurants and food businesses share safe, quality food ready
                for collection.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="hiw-step">
            <div className="hiw-step-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="hiw-step-content">
              <span className="hiw-step-label">STEP 2</span>
              <h3>Quality verification</h3>
              <p>
                Donation details and freshness windows are reviewed before
                acceptance.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="hiw-step">
            <div className="hiw-step-icon">
              <Truck size={22} />
            </div>
            <div className="hiw-step-content">
              <span className="hiw-step-label">STEP 3</span>
              <h3>Coordinated pickup</h3>
              <p>
                A trusted partner collects food within the safe handling window.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="hiw-step">
            <div className="hiw-step-icon">
              <Heart size={22} />
            </div>
            <div className="hiw-step-content">
              <span className="hiw-step-label">STEP 4</span>
              <h3>Community distribution</h3>
              <p>
                Fresh meals reach families through verified local organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hiw-cta">
        <h2>Ready to be part of the network?</h2>
        <Link to="/register" className="btn btn-light">
          Create an account <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}