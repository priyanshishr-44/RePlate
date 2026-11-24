
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf, Utensils, Users, ShieldCheck, Eye, EyeOff,
  Building2, Heart, ArrowRight, HandHeart
} from "lucide-react";
import { apiRequest, saveSession } from "../services/api";
import "./Login.css";

const roles = [
  {
    id: "donor",
    title: "Food Donor",
    description: "Restaurant, hotel or food business",
    icon: Utensils
  },
  {
    id: "ngo",
    title: "NGO / Distribution Partner",
    description: "Community or distribution organization",
    icon: Users
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Help collect and deliver food",
    icon: HandHeart
  },
  {
    id: "admin",
    title: "Admin",
    description: "RePlate operations team",
    icon: ShieldCheck
  }
];

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedRole = roles.find((item) => item.id === role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: {
          email: email.trim(),
          password,
          role
        }
      });

      saveSession(data, remember);
      navigate("/dashboard", { replace: true });

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const value = email.trim();

    if (!value) {
      setMessage("Please enter your email address first.");
      return;
    }

    try {
      const data = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: { email: value }
      });

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">

        <Link to="/" className="login-brand">
          <span className="login-brand-icon">
            <Leaf size={25} />
          </span>
          <span>Re<span>Plate</span></span>
        </Link>

        <div className="login-content">

          <span className="login-eyebrow">WELCOME BACK</span>

          <h1>Continue as</h1>

          <p className="login-subtitle">
            Select your role to personalize your RePlate experience.
          </p>

          <div className="login-role-grid">
            {roles.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.id}
                  className={`login-role-card ${
                    role === item.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setRole(item.id);
                    setMessage("");
                  }}
                >
                  <Icon size={23} />
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </button>
              );
            })}
          </div>

          <div className="login-role-divider">
            <span></span>
            <p>Continue as {selectedRole.title}</p>
            <span></span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="login-field">
              <label htmlFor="login-email">Email address</label>

              <input
                id="login-email"
                type="email"
                placeholder="name@organization.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">

              <div className="login-password-label">
                <label htmlFor="login-password">Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-password-input">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                  }
                </button>
              </div>
            </div>

            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            {message && (
              <div className="login-message" role="alert">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : <>Log in <ArrowRight size={18} /></>
              }
            </button>

          </form>

          <p className="login-register-text">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>

          <p className="login-demo-note">
            Secure login powered by RePlate API.
          </p>

        </div>

        <p className="login-copyright">
          © 2026 RePlate. Rescue Food. Share Hope.
        </p>
      </section>

      <section className="login-visual">
        <div className="login-visual-overlay"></div>

        <div className="login-visual-content">

          <div className="login-visual-icon">
            <Building2 size={29} />
          </div>

          <span className="login-visual-eyebrow">
            TOGETHER, WE MAKE A DIFFERENCE
          </span>

          <h2>
            One trusted network. Fresh food shared responsibly.
          </h2>

          <p>
            Connecting food donors, NGOs and volunteers to build a
            community where every meal matters.
          </p>

          <div className="login-visual-footer">
            <Heart size={18} />
            <span>Rescue Food. Share Hope.</span>
          </div>

        </div>
      </section>
    </main>
  );
}
