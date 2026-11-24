
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CommunityEvents from "./pages/CommunityEvents";
import LiveTracking from "./pages/LiveTracking";
import Donate from "./pages/Donate";
import PickupRequests from "./pages/PickupRequests";
import Notifications from "./pages/Notifications";
import MyDonations from "./pages/MyDonations";

// Protected Route
function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("replate_token") ||
    sessionStorage.getItem("replate_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate-food"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <MyDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pickup-requests"
          element={
            <ProtectedRoute>
              <PickupRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community-events"
          element={
            <ProtectedRoute>
              <CommunityEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-tracking"
          element={
            <ProtectedRoute>
              <LiveTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-tracking/:id"
          element={
            <ProtectedRoute>
              <LiveTracking />
            </ProtectedRoute>
          }
        />

        {/* Invalid Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
