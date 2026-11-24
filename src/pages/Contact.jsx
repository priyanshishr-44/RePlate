
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HandHeart,
  ChevronDown,
  Leaf,
  CheckCircle,
} from "lucide-react";
import "./Contact.css";
import { apiRequest } from "../services/api";

const faqs = [
  {
    question: "How can I donate surplus food?",
    answer:
      "Visit our Donate Food page, fill in the food details and pickup information. Our platform is designed to connect donations with community partners.",
  },
  {
    question: "Who can register as a distribution partner?",
    answer:
      "NGOs and eligible community organisations can register as distribution partners. Verification will be handled through the platform.",
  },
  {
    question: "Can I volunteer with RePlate?",
    answer:
      "Yes! Visit our Volunteer page and submit your details to express your interest in helping with food distribution.",
  },
  {
    question: "Is RePlate currently accepting food donations?",
    answer:
      "RePlate is currently a frontend project demo. Live donation coordination will become available after backend integration.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Food Donation",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("/contact", { method: "POST", body: formData });
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "Food Donation", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            <Leaf size={16} /> GET IN TOUCH
          </span>

          <h1>
            Let's make a
            <br />
            <span>difference together.</span>
          </h1>

          <p>
            Have a question, want to partner with us, or looking to make
            a difference? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-hero-decoration">
          <div className="contact-decoration-circle">
            <MessageCircle size={72} />
            <HeartIcon />
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-main">

        {/* LEFT INFORMATION */}
        <div className="contact-information">
          <span className="contact-eyebrow">CONTACT INFORMATION</span>

          <h2>We are here to help.</h2>

          <p className="contact-info-description">
            Reach out to us for questions, suggestions, partnerships
            or anything related to food sharing.
          </p>

          <div className="contact-info-list">

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Mail size={22} />
              </div>
              <div>
                <h3>Email us</h3>
                <p>support@replate.org</p>
                <span>For general enquiries</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Phone size={22} />
              </div>
              <div>
                <h3>Call us</h3>
                <p>Contact details coming soon</p>
                <span>Phone support will be available soon</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h3>Our location</h3>
                <p>Gurugram, Haryana, India</p>
                <span>Community-driven initiative</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Clock size={22} />
              </div>
              <div>
                <h3>Working hours</h3>
                <p>Monday – Friday</p>
                <span>9:00 AM – 5:00 PM</span>
              </div>
            </div>

          </div>

          <div className="contact-help-card">
            <HandHeart size={27} />
            <div>
              <h3>Want to make an impact?</h3>
              <p>Your time and support can help us build a better community.</p>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-card">
          <div className="contact-form-heading">
            <span className="contact-eyebrow">SEND US A MESSAGE</span>
            <h2>We'd love to hear from you.</h2>
            <p>Fill in the details below and share your message with us.</p>
          </div>

          {submitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <CheckCircle size={42} />
              </div>
              <h3>Message submitted!</h3>
              <p>
                Thank you for reaching out. Your message has been saved successfully.
              </p>
              <button onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">How can we help?</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option>Food Donation</option>
                  <option>NGO Partnership</option>
                  <option>Volunteer Enquiry</option>
                  <option>Technical Support</option>
                  <option>General Enquiry</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
              <button type="submit" className="contact-submit" disabled={loading}>
                {loading ? "Sending..." : <>Send Message <Send size={17} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="contact-faq-heading">
          <span className="contact-eyebrow">GOT QUESTIONS?</span>
          <h2>Frequently asked questions.</h2>
          <p>Quick answers to common questions about RePlate.</p>
        </div>

        <div className="contact-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`contact-faq-item ${
                openFaq === index ? "faq-active" : ""
              }`}
              key={faq.question}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={openFaq === index ? "faq-arrow-open" : ""}
                />
              </button>

              {openFaq === index && (
                <p>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="contact-bottom-cta">
        <HandHeart size={35} />
        <h2>Every small action creates hope.</h2>
        <p>Be part of a community that believes good food should never go to waste.</p>
      </section>

    </main>
  );
}

function HeartIcon() {
  return <span className="contact-heart">♥</span>;
}
