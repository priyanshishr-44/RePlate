
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  RefreshCw,
  ArrowLeft,
  Navigation,
  AlertCircle,
  ClipboardList
} from "lucide-react";

import { apiRequest } from "../services/api";
import "./PickupRequests.css";

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

export default function PickupRequests() {
  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/pickup-requests");

      setRequests(
        Array.isArray(data)
          ? data
          : data.pickupRequests || data.requests || []
      );
    } catch (err) {
      setError(err.message || "Unable to load pickup requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    if (activeFilter === "All") return true;

    return (
      normalizeStatus(request.status) ===
      normalizeStatus(activeFilter)
    );
  });

  const countRequests = (status) => {
    if (status === "All") return requests.length;

    return requests.filter(
      (request) =>
        normalizeStatus(request.status) === normalizeStatus(status)
    ).length;
  };

  const getStatusClass = (status = "") => {
    const value = normalizeStatus(status);

    if (value === "pending") return "pending";
    if (value === "accepted") return "accepted";
    if (value === "in progress") return "in-progress";
    if (value === "completed") return "completed";
    if (value === "rejected") return "rejected";

    return "pending";
  };

  return (
    <main className="pickup-page">

      {/* HEADER */}
      <header className="pickup-header">

        <Link to="/dashboard" className="pickup-back">
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="pickup-heading-row">

          <div>
            <span className="pickup-eyebrow">
              REPLATE MANAGEMENT
            </span>

            <h1>Pickup Requests</h1>

            <p>
              Manage food collection requests and monitor pickup progress.
            </p>
          </div>

          <button
            className="pickup-refresh"
            onClick={loadRequests}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>

      </header>

      {/* STATISTICS */}
      <section className="pickup-stats">

        <div className="pickup-stat-card">
          <div className="pickup-stat-icon purple">
            <ClipboardList size={22} />
          </div>
          <span>Total Requests</span>
          <h2>{countRequests("All")}</h2>
        </div>

        <div className="pickup-stat-card">
          <div className="pickup-stat-icon orange">
            <Clock size={22} />
          </div>
          <span>Pending</span>
          <h2>{countRequests("Pending")}</h2>
        </div>

        <div className="pickup-stat-card">
          <div className="pickup-stat-icon blue">
            <Truck size={22} />
          </div>
          <span>In Progress</span>
          <h2>{countRequests("In Progress")}</h2>
        </div>

        <div className="pickup-stat-card">
          <div className="pickup-stat-icon green">
            <CheckCircle2 size={22} />
          </div>
          <span>Completed</span>
          <h2>{countRequests("Completed")}</h2>
        </div>

      </section>

      {/* REQUEST LIST */}
      <section className="pickup-content">

        <div className="pickup-list-heading">
          <div>
            <h2>All Pickup Requests</h2>
            <p>View and manage your food collection requests.</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="pickup-filters">

          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? "selected" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span>{countRequests(filter)}</span>
            </button>
          ))}

        </div>

        {/* ERROR */}
        {error && (
          <div className="pickup-error">
            <AlertCircle size={19} />
            <span>{error}</span>

            <button onClick={loadRequests}>
              Try Again
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="pickup-empty">
            <RefreshCw size={30} />
            <p>Loading pickup requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="pickup-empty">
            <Package size={45} />

            <h3>
              {error ? "Requests unavailable" : "No pickup requests found"}
            </h3>

            <p>
              {error
                ? "Check your backend connection and try again."
                : "New pickup requests will appear here when available."
              }
            </p>

            <button
              className="pickup-refresh"
              onClick={loadRequests}
            >
              <RefreshCw size={16} />
              Refresh Requests
            </button>
          </div>
        ) : (

          <div className="pickup-request-list">

            {filteredRequests.map((request) => {

              const status = normalizeStatus(request.status);
              const id = request._id || request.id;

              return (
                <article
                  className="pickup-request-card"
                  key={id}
                >

                  <div className="pickup-card-top">

                    <div className="pickup-food-icon">
                      <Package size={24} />
                    </div>

                    <div className="pickup-food-info">
                      <h3>
                        {request.foodType || request.title || "Food Donation"}
                      </h3>

                      <span>
                        Request ID: {id || "Not available"}
                      </span>
                    </div>

                    <span className={`pickup-badge ${getStatusClass(status)}`}>
                      {status || "pending"}
                    </span>

                  </div>

                  <div className="pickup-card-details">

                    <div>
                      <MapPin size={17} />
                      <span>
                        {request.address || request.pickupLocation || "Location not provided"}
                      </span>
                    </div>

                    <div>
                      <Clock size={17} />
                      <span>
                        {request.pickupTime || request.preferredTime || "Pickup time not specified"}
                      </span>
                    </div>

                    <div>
                      <Phone size={17} />
                      <span>
                        {request.phone || request.contactNumber || "Contact not provided"}
                      </span>
                    </div>

                  </div>

                  <div className="pickup-card-footer">

                    <span className="pickup-quantity">
                      Quantity: {request.quantity || "Not specified"}
                    </span>

                    <div className="pickup-card-actions">

                      {status !== "rejected" && (
                        <Link
                          to={`/live-tracking/${id}`}
                          className="pickup-track-btn"
                        >
                          <Navigation size={16} />
                          Live Tracking
                        </Link>
                      )}

                    </div>

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
