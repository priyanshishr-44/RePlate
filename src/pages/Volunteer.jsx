import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Clock,
  MapPin,
  Heart,
  CheckCircle2,
  User,
  Phone,
  Mail,
} from "lucide-react";
import "./Volunteer.css";
import { apiRequest } from "../services/api";

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());
    try {
      await apiRequest("/volunteers", { method: "POST", body });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="rp-page">
        <section className="rp-success">
          <CheckCircle2 size={52} color="#00884a" />
          <h1>Thank you for joining!</h1>
          <p>
            Your volunteer application has been recorded (frontend only).
            <br />
            We’ll contact you soon when backend is ready.
          </p>
          <Link to="/" className="rp-donate-button" style={{ marginTop: 28 }}>
            Back to Home <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="rp-page">
      {/* Hero */}
      <section className="rp-page-hero">
        <span className="rp-section-label">BECOME A VOLUNTEER</span>
        <h1>
          Your time can <span>feed hope.</span>
        </h1>
        <p>
          Join our network of volunteers and help deliver surplus food to
          people who need it most.
        </p>
      </section>

      {/* Benefits */}
      <section className="rp-section">
        <div className="rp-section-heading">
          <span className="rp-section-label">WHY VOLUNTEER</span>
          <h2>
            Make a real difference <span>in your city</span>
          </h2>
        </div>

        <div className="rp-volunteer-benefits">
          <div className="rp-benefit-card">
            <Users size={26} />
            <h3>Flexible Timing</h3>
            <p>Choose when and how often you want to help. No fixed schedule.</p>
          </div>
          <div className="rp-benefit-card">
            <MapPin size={26} />
            <h3>Local Impact</h3>
            <p>Help in your own area. Short distance pickups and deliveries.</p>
          </div>
          <div className="rp-benefit-card">
            <Heart size={26} />
            <h3>Meaningful Work</h3>
            <p>See the direct impact of your effort on families and communities.</p>
          </div>
          <div className="rp-benefit-card">
            <Clock size={26} />
            <h3>Quick Tasks</h3>
            <p>Most tasks take 30–90 minutes. Perfect for busy schedules.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="rp-section rp-form-section">
        <div className="rp-form-container">
          <div className="rp-form-info">
            <h2>What you’ll do</h2>
            <div className="rp-form-steps">
              <div className="rp-form-step">
                <div className="rp-step-num">1</div>
                <div>
                  <strong>Get notified</strong>
                  <p>Receive alerts when food needs to be picked up near you.</p>
                </div>
              </div>
              <div className="rp-form-step">
                <div className="rp-step-num">2</div>
                <div>
                  <strong>Collect food</strong>
                  <p>Pick up surplus food from restaurants or donors.</p>
                </div>
              </div>
              <div className="rp-form-step">
                <div className="rp-step-num">3</div>
                <div>
                  <strong>Deliver safely</strong>
                  <p>Drop it to verified NGOs, shelters or community kitchens.</p>
                </div>
              </div>
            </div>
          </div>

          <form className="rp-form" onSubmit={handleSubmit}>
            <h3>Volunteer Application</h3>

            <div className="rp-form-group">
              <label>
                <User size={15} /> Full Name
              </label>
              <input name="name" type="text" placeholder="Your full name" required />
            </div>

            <div className="rp-form-row">
              <div className="rp-form-group">
                <label>
                  <Phone size={15} /> Phone
                </label>
                <input name="phone" type="tel" placeholder="10-digit number" required />
              </div>
              <div className="rp-form-group">
                <label>
                  <Mail size={15} /> Email
                </label>
                <input name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="rp-form-group">
              <label>
                <MapPin size={15} /> Your Area / Locality
              </label>
              <input name="area" type="text" placeholder="e.g. Andheri East, Mumbai" required />
            </div>

            <div className="rp-form-group">
              <label>Availability</label>
              <select name="availability" required>
                <option value="">Select your availability</option>
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Evenings only</option>
                <option>Flexible</option>
              </select>
            </div>

            <div className="rp-form-group">
              <label>Why do you want to volunteer? (optional)</label>
              <textarea name="motivation" rows="3" placeholder="Tell us a bit about your motivation"></textarea>
            </div>

            {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
            <button type="submit" className="rp-donate-button rp-btn-full" disabled={loading}>
              {loading ? "Submitting..." : <>Submit Application <ArrowRight size={18} /></>}
            </button>

            <p className="rp-form-note">
              This is frontend only. No data is sent to any server yet.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}