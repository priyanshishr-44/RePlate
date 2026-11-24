
import React from "react";
import { Bell, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./Notifications.css";

export default function Notifications() {
  return (
    <main className="notifications-page">
      <Link to="/dashboard" className="notification-back">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div className="notifications-heading">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your food donations and pickups.</p>
        </div>

        <Bell size={30} />
      </div>

      <div className="notification-empty">
        <CheckCircle2 size={45} />
        <h2>You're all caught up!</h2>
        <p>
          You don't have any new notifications right now.
          Updates about donations and pickups will appear here.
        </p>
      </div>
    </main>
  );
}
