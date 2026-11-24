
import React, { useState } from "react";
import {
  Gift,
  Heart,
  PartyPopper,
  Users,
  ArrowLeft,
  Send,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CommunityEvents.css";

export default function CommunityEvents() {
  const navigate = useNavigate();

  const initialForm = {
    eventType: "",
    eventName: "",
    eventDate: "",
    location: "",
    guests: "",
    description: "",
    sponsorship: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo frontend submission only
    console.log("Event Request:", formData);
    setSubmitted(true);
  };

  return (
    <div className="community-page">

      <header className="community-header">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="community-brand">
          <span className="brand-icon">
            <Heart size={23} />
          </span>
          <span>RePlate</span>
        </div>
      </header>

      <main className="community-main">

        <section className="community-hero">
          <div className="community-tag">
            <PartyPopper size={17} />
            CELEBRATE TOGETHER
          </div>

          <h1>
            Make Every Celebration
            <span> Meaningful.</span>
          </h1>

          <p>
            Celebrate birthdays, festivals and special occasions
            with NGOs and communities. Share happiness through
            food, sponsorship and kindness.
          </p>
        </section>

        <section className="event-options">
          <div className="section-heading">
            <span>SPREAD HAPPINESS</span>
            <h2>What would you like to celebrate?</h2>
            <p>Choose an occasion and make someone's day special.</p>
          </div>

          <div className="event-cards">

            <div className="event-card">
              <div className="event-icon">
                <Gift size={27} />
              </div>
              <h3>Birthday Celebration</h3>
              <p>
                Celebrate your birthday by sharing meals,
                cakes and happiness with children and families.
              </p>
            </div>

            <div className="event-card">
              <div className="event-icon">
                <PartyPopper size={27} />
              </div>
              <h3>Festival Celebration</h3>
              <p>
                Celebrate festivals with NGOs by sponsoring
                food, sweets and essential items.
              </p>
            </div>

            <div className="event-card">
              <div className="event-icon">
                <Heart size={27} />
              </div>
              <h3>Special Events</h3>
              <p>
                Organize community events and special
                celebrations to spread smiles.
              </p>
            </div>

          </div>
        </section>

        <section className="event-form-section">

          <div className="event-form-heading">
            <span className="form-eyebrow">GET STARTED</span>
            <h2>Submit an Event Request</h2>
            <p>
              Tell us about your celebration. Our team can
              coordinate with an NGO for your event.
            </p>
          </div>

          {submitted ? (

            <div className="event-success">
              <CheckCircle size={55} />
              <h2>Request Submitted!</h2>
              <p>
                Thank you for spreading happiness with RePlate.
                Your request has been recorded in this demo.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(initialForm);
                }}
              >
                Submit Another Request
              </button>
            </div>

          ) : (

            <form className="event-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Event Type *</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Festival">Festival</option>
                  <option value="Special Event">Special Event</option>
                  <option value="Community Gathering">
                    Community Gathering
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Event Name *</label>
                <input
                  type="text"
                  name="eventName"
                  placeholder="e.g. Birthday Celebration"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Expected Guests *</label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    placeholder="Number of people"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Event Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter event city or location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>What would you like to sponsor? *</label>
                <select
                  name="sponsorship"
                  value={formData.sponsorship}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Sponsorship</option>
                  <option value="Food and Meals">Food and Meals</option>
                  <option value="Birthday Cake">Birthday Cake</option>
                  <option value="Festival Food">Festival Food</option>
                  <option value="Food and Gifts">Food and Gifts</option>
                  <option value="Full Event Sponsorship">
                    Full Event Sponsorship
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Event Description *</label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe your event and how you want to celebrate..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-event-btn">
                Submit Event Request
                <Send size={18} />
              </button>

            </form>
          )}
        </section>

        <section className="community-footer">
          <div className="footer-heart">
            <Users size={27} />
          </div>
          <h2>Celebrate Happiness. Share Kindness.</h2>
          <p>
            Together, we can turn every special occasion
            into an opportunity to help someone.
          </p>
        </section>

      </main>
    </div>
  );
}
