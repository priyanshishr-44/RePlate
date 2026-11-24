import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import "./Donate.css";
import { apiRequest } from "../services/api";

export default function Donate() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    foodType: "",
    category: "Cooked Meals",
    quantity: "",
    servings: "",
    prepDate: "",
    bestBefore: "",
    address: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("/donations", {
        method: "POST",
        body: {
          ...form,
          contactName: form.name
        }
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="dn-page">
        <div className="dn-success">
          <CheckCircle2 size={52} color="#00884a" />
          <h1>Donation Request Submitted!</h1>
          <p>
            Thank you for sharing food. Verified partners will be notified
            (frontend only).
          </p>
          <Link to="/" className="dn-btn">
            Back to Home <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dn-page">
      <div className="dn-container">
        {/* Header */}
        <div className="dn-header">
          <h1>Donate Fresh Food</h1>
          <p>Share fresh, quality food with communities that need it.</p>
        </div>

        <div className="dn-layout">
          {/* LEFT - Form */}
          <form id="donate-form" className="dn-form" onSubmit={handleSubmit}>
            {/* Food details card */}
            <div className="dn-card">
              <h2>Food details</h2>
              <p className="dn-card-desc">
                Tell us what is ready and how it has been prepared.
              </p>

              <div className="dn-row">
                <div className="dn-field">
                  <label>
                    Food type <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="foodType"
                    placeholder="e.g. Vegetarian lunch boxes"
                    value={form.foodType}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dn-field">
                  <label>Food category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Cooked Meals</option>
                    <option>Bakery</option>
                    <option>Raw / Vegetables</option>
                    <option>Packaged Food</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="dn-row">
                <div className="dn-field">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="e.g. 80 meal boxes"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="dn-field">
                  <label>Approximate servings</label>
                  <input
                    type="text"
                    name="servings"
                    placeholder="e.g. 80"
                    value={form.servings}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="dn-row">
                <div className="dn-field">
                  <label>
                    Preparation date & time <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="prepDate"
                    placeholder="dd-mm-yyyy  --:--"
                    value={form.prepDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dn-field">
                  <label>
                    Best before / freshness <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="bestBefore"
                    placeholder="e.g. Best before 7:30 PM"
                    value={form.bestBefore}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pickup & contact card */}
            <div className="dn-card">
              <h2>Pickup & contact</h2>

              <div className="dn-field">
                <label>Pickup location</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Full address with landmark"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="dn-row">
                <div className="dn-field">
                  <label>Contact name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dn-field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="dn-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>

          {/* RIGHT - Summary */}
          <div className="dn-summary">
            <div className="dn-card">
              <h2>Donation summary</h2>

              <div className="dn-summary-row">
                <span>Category</span>
                <strong>{form.category || "—"}</strong>
              </div>
              <div className="dn-summary-row">
                <span>Quantity</span>
                <strong>{form.quantity || "Not added"}</strong>
              </div>
              <div className="dn-summary-row">
                <span>Coverage</span>
                <strong>
                  {form.servings ? `${form.servings} servings` : "Not added"}
                </strong>
              </div>
              <div className="dn-summary-row">
                <span>Verification</span>
                <strong className="dn-required">Required</strong>
              </div>

              <div className="dn-pledge">
                <ShieldCheck size={20} />
                <div>
                  <strong>Freshness pledge</strong>
                  <p>
                    By submitting, you confirm this food is fresh, safely
                    prepared and suitable for distribution.
                  </p>
                </div>
              </div>

              {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
              <button type="submit" form="donate-form" className="dn-btn full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Donation Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}