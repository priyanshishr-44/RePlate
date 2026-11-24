
import React from "react";

import {
  Leaf,
  LayoutDashboard,
  Utensils,
  Package,
  Heart,
  Bell,
  ArrowUpRight,
  LogOut,
  Cake,
  PartyPopper,
  CheckCircle2,
  HandHeart,
  Truck,
  Users,
  Navigation
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { clearSession } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // USER DETAILS
  const user = JSON.parse(
    localStorage.getItem("replate_user") ||
    sessionStorage.getItem("replate_user") ||
    "{}"
  );

  const firstName = (
    user.name || user.organizationName || "Donor"
  ).trim().split(" ")[0];

  const organization =
    user.organizationName || user.name || "RePlate Partner";

  const role = user.role || "donor";

  // ACTIVE SIDEBAR LINK
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // GREETING
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  // DATE
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  // LOGOUT
  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  // DASHBOARD STATISTICS
  const stats = [
    {
      title: "Total donations",
      value: "38",
      change: "+4 this month",
      icon: HandHeart,
      color: "green"
    },
    {
      title: "Meals provided",
      value: "2,684",
      change: "+12.4%",
      icon: Utensils,
      color: "orange"
    },
    {
      title: "Pickups completed",
      value: "34",
      change: "89% success",
      icon: Truck,
      color: "blue"
    },
    {
      title: "People reached",
      value: "2,117",
      change: "+284 people",
      icon: Users,
      color: "purple"
    }
  ];

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        {/* LOGO */}
        <div className="dashboard-logo">
          <span className="logo-icon">
            <Leaf size={25} />
          </span>

          <span>RePlate</span>
        </div>

        <p className="sidebar-label">
          MAIN MENU
        </p>

        {/* NAVIGATION */}
        <nav className="sidebar-navigation">

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className={isActive("/dashboard")}
          >
            <LayoutDashboard size={21} />
            <span>Dashboard</span>
          </Link>

          {/* DONATE FOOD */}
          <Link
            to="/donations"
            className={isActive("/donations")}
          >
            <HandHeart size={21} />
            <span>Donate Food</span>
          </Link>

          {/* MY DONATIONS */}
          <Link
            to="/donations"
            className={isActive("/donations")}
          >
            <Utensils size={21} />
            <span>My Donations</span>
          </Link>

          {/* PICKUP REQUESTS - NEW SEPARATE PAGE */}
          <Link
            to="/pickup-requests"
            className={isActive("/pickup-requests")}
          >
            <Package size={21} />
            <span>Pickup Requests</span>
          </Link>

          {/* LIVE TRACKING */}
          <Link
            to="/live-tracking"
            className={
              location.pathname.startsWith("/live-tracking")
                ? "active"
                : ""
            }
          >
            <Navigation size={21} />
            <span>Live Tracking</span>
          </Link>

          {/* NOTIFICATIONS */}
          <Link
            to="/notifications"
            className={isActive("/notifications")}
          >
            <Bell size={21} />
            <span>Notifications</span>
          </Link>

          {/* IMPACT */}
          <Link to="/dashboard#celebrations">
            <Heart size={21} />
            <span>Impact</span>
          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className={isActive("/profile")}
          >
            <Users size={21} />
            <span>Profile</span>
          </Link>

        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="sidebar-avatar">
              {organization.charAt(0).toUpperCase()}
            </div>

            <div className="sidebar-user-info">

              <strong>{organization}</strong>

              <small>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </small>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Log out</span>
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div className="header-title">
            <h2>Dashboard</h2>
          </div>

          <div className="dashboard-profile">

            <button
              className="notification-button"
              onClick={() => navigate("/notifications")}
              aria-label="Notifications"
            >
              <Bell size={21} />
            </button>

            <div className="profile-details">

              <strong>{organization}</strong>

              <small>
                <CheckCircle2 size={14} />
                Verified account
              </small>

            </div>

          </div>

        </header>

        {/* WELCOME BANNER */}
        <section className="dashboard-welcome">

          <div className="welcome-content">

            <span className="welcome-date">
              {today}
            </span>

            <h1>
              {greeting}, {firstName}!
            </h1>

            <p>
              Your recent donations are making a real difference.
              Thank you for sharing fresh food and helping communities
              in need.
            </p>

          </div>

          <button
            className="welcome-donate-btn"
            onClick={() => navigate("/donations")}
          >
            <HandHeart size={19} />
            Donate fresh food
            <ArrowUpRight size={17} />
          </button>

        </section>

        {/* STATISTICS */}
        <section className="dashboard-stats">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                className="stat-card"
                key={stat.title}
              >

                <div className="stat-top">

                  <div className={`stat-icon ${stat.color}`}>
                    <Icon size={23} />
                  </div>

                  <small>{stat.change}</small>

                </div>

                <h2>{stat.value}</h2>

                <p>{stat.title}</p>

              </div>
            );

          })}

        </section>

        {/* CELEBRATE TOGETHER */}
        <section
          className="celebrations-section"
          id="celebrations"
        >

          <div className="section-heading">

            <div>

              <h3>Celebrate Together</h3>

              <p>
                Spread happiness and create beautiful memories.
              </p>

            </div>

            <span>COMMUNITY EVENTS</span>

          </div>

          {/* CELEBRATION BANNER */}
          <div className="celebration-banner">

            <div className="celebration-content">

              <span>
                SHARE HAPPINESS, CREATE MEMORIES
              </span>

              <h2>
                Make Someone's Day Special!
              </h2>

              <p>
                Celebrate birthdays, festivals and special occasions
                with NGO children and communities. Sponsor food,
                cakes and gifts to spread happiness.
              </p>

            </div>

            <div className="celebration-main-icon">
              <PartyPopper size={65} />
            </div>

          </div>

          {/* EVENT CARDS */}
          <div className="celebration-cards">

            {/* BIRTHDAY */}
            <div className="celebration-card">

              <div className="celebration-icon">
                <Cake size={27} />
              </div>

              <h3>Birthday Celebration</h3>

              <p>
                Celebrate your special day with NGO children
                by sponsoring cakes, food and gifts.
              </p>

              <button
                onClick={() => navigate("/community-events")}
              >
                Plan Birthday
                <ArrowUpRight size={17} />
              </button>

            </div>

            {/* FESTIVAL */}
            <div className="celebration-card">

              <div className="celebration-icon">
                <PartyPopper size={27} />
              </div>

              <h3>Festival Celebration</h3>

              <p>
                Share the joy of Diwali, Holi, Christmas
                and other festivals with communities.
              </p>

              <button
                onClick={() => navigate("/community-events")}
              >
                Celebrate Now
                <ArrowUpRight size={17} />
              </button>

            </div>

            {/* SPONSOR */}
            <div className="celebration-card">

              <div className="celebration-icon">
                <Heart size={27} />
              </div>

              <h3>Sponsor an Event</h3>

              <p>
                Support NGO events by sponsoring food,
                refreshments, decorations and gifts.
              </p>

              <button
                onClick={() => navigate("/community-events")}
              >
                Sponsor Event
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="dashboard-footer">

          <Leaf size={16} />

          <span>
            Rescue Food. Share Hope. © 2026 RePlate
          </span>

        </footer>

      </main>

    </div>
  );
}
