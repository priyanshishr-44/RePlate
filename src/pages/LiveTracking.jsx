
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../services/api";
import {
  MapPin,
  Navigation,
  RefreshCw,
  AlertCircle,
  LocateFixed,
  Radio,
  Square
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./LiveTracking.css";

const DEFAULT_CENTER = [20.5937, 78.9629];

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(
        [position.latitude, position.longitude],
        16,
        { duration: 1 }
      );
    }
  }, [position, map]);

  return null;
}

export default function LiveTracking() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [position, setPosition] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [gpsError, setGpsError] = useState("");

  const watchId = useRef(null);

  const loadDonations = async () => {
    try {
      const data = await apiRequest("/donations");
      setDonations(data.donations || []);
    } catch (error) {
      console.error("Donation loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setGpsError("Your browser does not support GPS location.");
      return;
    }

    if (watchId.current !== null) return;

    setGpsError("");
    setTracking(true);

    watchId.current = navigator.geolocation.watchPosition(
      (location) => {
        setPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          updatedAt: new Date()
        });

        setGpsError("");
      },
      (error) => {
        const messages = {
          1: "Location permission denied. Please allow location access.",
          2: "Your current location is unavailable.",
          3: "GPS request timed out. Please try again."
        };

        setGpsError(
          messages[error.code] || "Unable to get your location."
        );

        setTracking(false);

        if (watchId.current !== null) {
          navigator.geolocation.clearWatch(watchId.current);
          watchId.current = null;
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 20000
      }
    );
  };

  const stopTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    setTracking(false);
  };

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const formatCoordinates = (value) => {
    return Number(value).toFixed(6);
  };

  return (
    <main className="tracking-page">

      {/* HEADER */}
      <header className="tracking-header">

        <Link to="/dashboard" className="tracking-back">
          ← Back to Dashboard
        </Link>

        <h1>
          <MapPin size={27} />
          Live Location Tracking
        </h1>

        <p>
          Monitor your current GPS location and food donation activity.
        </p>

      </header>

      {/* GPS STATUS */}
      <section className="tracking-status-panel">

        <div className="tracking-status-info">

          <div className={`tracking-live-icon ${tracking ? "online" : ""}`}>
            <Radio size={23} />
          </div>

          <div>
            <h3>
              {tracking ? "Live GPS Active" : "GPS Not Started"}
            </h3>

            <p>
              {tracking
                ? "Your device location is being monitored."
                : "Start tracking to display your current location."
              }
            </p>
          </div>

        </div>

        <div className="tracking-actions">

          {!tracking ? (
            <button
              className="tracking-start-btn"
              onClick={startTracking}
            >
              <Navigation size={18} />
              Start Tracking
            </button>
          ) : (
            <button
              className="tracking-stop-btn"
              onClick={stopTracking}
            >
              <Square size={16} />
              Stop Tracking
            </button>
          )}

        </div>

      </section>

      {gpsError && (
        <div className="tracking-error">
          <AlertCircle size={19} />
          {gpsError}
        </div>
      )}

      {/* MAP */}
      <section className="tracking-map-section">

        <div className="tracking-map-heading">

          <div>
            <h2>
              <MapPin size={20} />
              Your Live Location
            </h2>

            <p>
              Interactive GPS map powered by OpenStreetMap.
            </p>
          </div>

          <button
            className="tracking-refresh"
            onClick={() => {
              if (position) {
                startTracking();
              } else {
                startTracking();
              }
            }}
          >
            <RefreshCw size={17} />
            Update Location
          </button>

        </div>

        <div className="tracking-map">

          <MapContainer
            center={DEFAULT_CENTER}
            zoom={5}
            scrollWheelZoom={true}
            className="live-leaflet-map"
          >

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater position={position} />

            {position && (
              <CircleMarker
                center={[
                  position.latitude,
                  position.longitude
                ]}
                radius={12}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#078443",
                  fillOpacity: 1,
                  weight: 4
                }}
              >
                <Popup>
                  <strong>Your Current Location</strong>
                  <br />
                  Latitude: {formatCoordinates(position.latitude)}
                  <br />
                  Longitude: {formatCoordinates(position.longitude)}
                </Popup>
              </CircleMarker>
            )}

          </MapContainer>

          {!position && (
            <div className="tracking-map-overlay">
              <div>
                <LocateFixed size={34} />
                <h3>Waiting for GPS Location</h3>
                <p>
                  Click Start Tracking to find your current location.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* LOCATION DETAILS */}
        <div className="tracking-location-details">

          <div className="tracking-location-item">
            <span>GPS Status</span>
            <strong className={tracking && position ? "gps-active" : ""}>
              {position ? "Location Found" : "Waiting for Location"}
            </strong>
          </div>

          <div className="tracking-location-item">
            <span>Latitude</span>
            <strong>
              {position
                ? formatCoordinates(position.latitude)
                : "--"}
            </strong>
          </div>

          <div className="tracking-location-item">
            <span>Longitude</span>
            <strong>
              {position
                ? formatCoordinates(position.longitude)
                : "--"}
            </strong>
          </div>

          <div className="tracking-location-item">
            <span>GPS Accuracy</span>
            <strong>
              {position
                ? `±${Math.round(position.accuracy)} metres`
                : "--"}
            </strong>
          </div>

        </div>

      </section>

      {/* DONATIONS */}
      <section className="tracking-content">

        <div className="tracking-section-heading">

          <div>
            <h2>Your Donations</h2>
            <p>
              Track your food donation and pickup progress.
            </p>
          </div>

          <button
            className="tracking-refresh"
            onClick={loadDonations}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>

        {loading ? (
          <p className="tracking-empty">Loading donations...</p>
        ) : donations.length === 0 ? (
          <div className="tracking-empty">
            <Navigation size={35} />
            <h3>No donations found</h3>
            <p>
              Your donations will appear here.
            </p>
          </div>
        ) : (
          <div className="tracking-donation-list">

            {donations.map((donation) => (
              <article
                className="tracking-donation-card"
                key={donation._id}
              >

                <div>
                  <h3>{donation.foodType}</h3>
                  <p>{donation.address}</p>

                  <span className="tracking-status">
                    {donation.status?.replace(/_/g, " ")}
                  </span>
                </div>

                <Link
                  to={`/live-tracking/${donation._id}`}
                  className="tracking-view-button"
                >
                  View Tracking
                </Link>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}
