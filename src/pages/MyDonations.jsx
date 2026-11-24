
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  CalendarDays,
  Clock,
  RefreshCw,
  ArrowLeft,
  Navigation,
  HandHeart,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import { apiRequest } from "../services/api";
import "./MyDonations.css";

const filters = [
  "All",
  "Pending",
  "Accepted",
  "In Progress",
  "Completed",
  "Rejected"
];

const normalizeStatus = (status = "") =>
  status.toLowerCase().replace(/_/g, " ");

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDonations = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/donations");

      setDonations(
        Array.isArray(data)
          ? data
          : data.donations || []
      );
    } catch (err) {
      setError(err.message || "Unable to load donations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const countStatus = (status) => {
    if (status === "All") return donations.length;

    return donations.filter(
      (item) =>
        normalizeStatus(item.status) === normalizeStatus(status)
    ).length;
  };

  const filteredDonations = donations.filter((item) => {
    if (activeFilter === "All") return true;

    return (
      normalizeStatus(item.status) === normalizeStatus(activeFilter)
    );
  });

  const getStatusClass = (status = "") => {
    const value = normalizeStatus(status);

    if (value === "completed") return "completed";
    if (value === "accepted") return "accepted";
    if (value === "in progress") return "in-progress";
    if (value === "rejected") return "rejected";

    return "pending";
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <main className="my-donations-page">

      {/* HEADER */}
      <header className="my-donations-header">

        <Link to="/dashboard" className="my-donations-back">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="my-donations-title-row">
          <div>
            <span className="my-donations-eyebrow">
              REPLATE MANAGEMENT
            </span>

            <h1>My Donations</h1>

            <p>
              View and manage all the food donations you have submitted.
            </p>
          </div>

          <button
            className="my-donations-refresh"
            onClick={loadDonations}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

      </header>

      {/* STATISTICS */}
      <section className="my-donations-stats">

        <div className="my-donation-stat">
          <div className="my-donation-stat-icon green">
            <HandHeart size={23} />
          </div>
          <span>Total Donations</span>
          <h2>{countStatus("All")}</h2>
        </div>

        <div className="my-donation-stat">
          <div className="my-donation-stat-icon orange">
            <Clock size={23} />
          </div>
          <span>Pending</span>
          <h2>{countStatus("Pending")}</h2>
        </div>

        <div className="my-donation-stat">
          <div className="my-donation-stat-icon blue">
            <Package size={23} />
          </div>
          <span>In Progress</span>
          <h2>{countStatus("In Progress")}</h2>
        </div>

        <div className="my-donation-stat">
          <div className="my-donation-stat-icon purple">
            <CheckCircle2 size={23} />
          </div>
          <span>Completed</span>
          <h2>{countStatus("Completed")}</h2>
        </div>

      </section>

      {/* DONATION LIST */}
      <section className="my-donations-content">

        <div className="my-donations-list-heading">
          <div>
            <h2>All Your Donations</h2>
            <p>Track the status of your submitted food donations.</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="my-donations-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "selected" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span>{countStatus(filter)}</span>
            </button>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="my-donations-error">
            <AlertCircle size={19} />
            {error}

            <button onClick={loadDonations}>
              Try Again
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="my-donations-empty">
            <RefreshCw size={30} />
            <p>Loading your donations...</p>
          </div>
        ) : filteredDonations.length === 0 ? (

          <div className="my-donations-empty">
            <Package size={48} />

            <h3>
              {error
                ? "Donations unavailable"
                : "No donations found"}
            </h3>

            <p>
              {error
                ? "Please check your connection and try again."
                : activeFilter === "All"
                  ? "You haven't submitted any food donations yet."
                  : `You don't have any ${activeFilter.toLowerCase()} donations.`
              }
            </p>

            {activeFilter === "All" && (
              <Link
                to="/donate-food"
                className="my-donations-create-btn"
              >
                <HandHeart size={18} />
                Donate Fresh Food
              </Link>
            )}
          </div>

        ) : (

          <div className="my-donations-list">

            {filteredDonations.map((donation) => {
              const id = donation._id || donation.id;
              const status = normalizeStatus(donation.status);

              return (
                <article
                  className="my-donation-card"
                  key={id}
                >

                  <div className="my-donation-card-top">

                    <div className="my-donation-food-icon">
                      <Package size={25} />
                    </div>

                    <div className="my-donation-food-info">
                      <h3>
                        {donation.foodType || "Food Donation"}
                      </h3>

                      <span>
                        Donation ID: {id || "Not available"}
                      </span>
                    </div>

                    <span
                      className={`my-donation-status ${getStatusClass(status)}`}
                    >
                      {status || "pending"}
                    </span>

                  </div>

                  <div className="my-donation-details">

                    <div>
                      <Package size={17} />
                      <span>
                        {donation.quantity || "Quantity not specified"}
                      </span>
                    </div>

                    <div>
                      <MapPin size={17} />
                      <span>
                        {donation.address || donation.pickupLocation || "Location not provided"}
                      </span>
                    </div>

                    <div>
                      <CalendarDays size={17} />
                      <span>
                        {formatDate(
                          donation.createdAt || donation.date
                        )}
                      </span>
                    </div>

                    <div>
                      <Clock size={17} />
                      <span>
                        {donation.bestBefore || "Freshness not specified"}
                      </span>
                    </div>

                  </div>

                  <div className="my-donation-card-footer">

                    <strong>
                      Category: {donation.category || "Not specified"}
                    </strong>

                    {id && status !== "rejected" && (
                      <Link
                        to={`/live-tracking/${id}`}
                        className="my-donation-track-btn"
                      >
                        <Navigation size={16} />
                        Track Donation
                      </Link>
                    )}

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}
