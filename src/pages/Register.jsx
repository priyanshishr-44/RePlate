import React, { useState } from "react";
import {
  Leaf,
  Utensils,
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Registration API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (loading) return;

    setLoading(true);

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: {
          name: formData.name.trim(),
          organizationName: formData.organization.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          role: role
        }
      });

      // Registration successful
      navigate("/login", {
        replace: true,
        state: {
          registeredEmail: formData.email.trim().toLowerCase(),
          registrationMessage:
            data.message || "Account created successfully!"
        }
      });

    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Header */}
      <header className="register-header">

        <Link to="/" className="register-logo">
          <span className="logo-icon">
            <Leaf size={23} />
          </span>
          <span>RePlate</span>
        </Link>

        <nav className="register-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/find-food">Find Food</Link>
          <Link to="/volunteer">Volunteer</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="login-link">
            Log in
          </Link>

          <a href="#register-form" className="donate-btn">
            Donate Food
          </a>
        </div>

      </header>

      {/* Main Section */}
      <main className="register-main">

        <section className="register-left">

          <div className="register-heading">

            <span className="eyebrow">
              JOIN THE NETWORK
            </span>

            <h1>Create your RePlate account</h1>

            <p>
              Join our mission to reduce food waste and
              make surplus food accessible to everyone.
            </p>

          </div>

          <div className="register-card" id="register-form">

            <div className="card-top">
              <h2>Get started for free</h2>
              <p>Select your role to personalize your experience.</p>
            </div>

            {/* Role Selection */}
            <div className="role-selection">

              <button
                type="button"
                className={`role-option ${role === "donor" ? "active" : ""}`}
                onClick={() => setRole("donor")}
              >
                <Utensils size={22} />

                <span>
                  <strong>Food Donor</strong>
                  <small>
                    Restaurant, hotel or food business
                  </small>
                </span>
              </button>

              <button
                type="button"
                className={`role-option ${role === "ngo" ? "active" : ""}`}
                onClick={() => setRole("ngo")}
              >
                <Users size={22} />

                <span>
                  <strong>NGO / Distribution Partner</strong>
                  <small>
                    Community or distribution organization
                  </small>
                </span>
              </button>

            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full name / Contact person</label>

                <div className="input-wrapper">
                  <User size={18} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  {role === "donor"
                    ? "Organization / Business name"
                    : "NGO / Organization name"}
                </label>

                <div className="input-wrapper">
                  <Building2 size={18} />

                  <input
                    type="text"
                    name="organization"
                    placeholder="Enter organization name"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Email address</label>

                  <div className="input-wrapper">
                    <Mail size={18} />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone number</label>

                  <div className="input-wrapper">
                    <Phone size={18} />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              <div className="form-group">
                <label>Address / Location</label>

                <div className="input-wrapper">
                  <MapPin size={18} />

                  <input
                    type="text"
                    name="address"
                    placeholder="City, area or full address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <Lock size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />}
                  </button>

                </div>
              </div>

              <div className="terms-text">
                By creating an account, you agree to our
                <Link to="/terms"> Terms of Service</Link> and
                <Link to="/privacy"> Privacy Policy</Link>.
              </div>

              {/* Error Message */}
              {message && (
                <p
                  className="success-message"
                  role="alert"
                  style={{ color: "#dc2626" }}
                >
                  {message}
                </p>
              )}

              {/* Create Account Button */}
              <button
                type="submit"
                className="create-account-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create account"}

                {!loading && <ArrowRight size={19} />}
              </button>

            </form>

            <div className="login-bottom">
              Already have an account?
              <Link to="/login"> Log in</Link>
            </div>

          </div>

        </section>

        {/* Right Information Panel */}
        <aside className="register-right">

          <div className="right-content">

            <div className="right-icon">
              <HeartHandshake size={35} />
            </div>

            <span className="right-eyebrow">
              TOGETHER WE CAN MAKE A DIFFERENCE
            </span>

            <h2>
              One trusted network.
              <br />
              Fresh food shared
              <br />
              responsibly.
            </h2>

            <p>
              Connect surplus food with communities that
              need it. Every contribution brings us closer
              to a world with less food waste.
            </p>

            <div className="benefit-list">

              <div className="benefit-item">
                <span>
                  <ShieldCheck size={20} />
                </span>

                <div>
                  <strong>Verified Network</strong>
                  <small>Connect with trusted partners.</small>
                </div>
              </div>

              <div className="benefit-item">
                <span>
                  <Leaf size={20} />
                </span>

                <div>
                  <strong>Reduce Food Waste</strong>
                  <small>
                    Give surplus food a meaningful purpose.
                  </small>
                </div>
              </div>

              <div className="benefit-item">
                <span>
                  <Users size={20} />
                </span>

                <div>
                  <strong>Community Impact</strong>
                  <small>
                    Help people and communities in need.
                  </small>
                </div>
              </div>

            </div>

            <div className="right-bottom-text">
              Small actions. Bigger impact.
            </div>

          </div>

        </aside>

      </main>

      {/* Footer */}
      <footer className="register-footer">

        <div className="footer-logo">
          <Leaf size={21} />
          <strong>RePlate</strong>
        </div>

        <p>Rescue Food. Share Hope.</p>

        <span>
          Connecting surplus food with communities that need it.
        </span>

        <small>© 2026 RePlate. All rights reserved.</small>

      </footer>

    </div>
  );
}