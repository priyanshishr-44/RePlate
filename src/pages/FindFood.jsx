
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Utensils,
  ArrowRight,
  Filter,
  X,
  Package,
  CalendarDays,
  CheckCircle2,
  Heart,
} from "lucide-react";
import "./FindFood.css";

const foodListings = [
  {
    id: "RPL-24091",
    title: "Fresh vegetarian meals",
    description:
      "Freshly prepared vegetarian meals with rice, dal and seasonal vegetables.",
    quantity: "80 meal boxes",
    servings: "80 people",
    location: "Indiranagar, Bengaluru",
    address: "Indiranagar, Bengaluru, Karnataka",
    time: "Today, 4:30 – 5:00 PM",
    category: "Cooked Meals",
    status: "Available",
    donor: "Community Food Partner",
    bestBefore: "Today, 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
  },
  {
    id: "RPL-24090",
    title: "Bakery items & pastries",
    description:
      "Fresh bakery items and pastries available for community distribution.",
    quantity: "36 pieces",
    servings: "36 people",
    location: "Koramangala, Bengaluru",
    address: "Koramangala, Bengaluru, Karnataka",
    time: "Today, 5:15 PM",
    category: "Bakery",
    status: "Available",
    donor: "Local Bakery Partner",
    bestBefore: "Today, 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900",
  },
  {
    id: "RPL-24088",
    title: "Cooked meals (Rice & Curry)",
    description:
      "Nutritious rice and curry meal boxes prepared for food distribution.",
    quantity: "120 boxes",
    servings: "120 people",
    location: "HSR Layout, Bengaluru",
    address: "HSR Layout, Bengaluru, Karnataka",
    time: "Today, 6:00 PM",
    category: "Cooked Meals",
    status: "Pending",
    donor: "Restaurant Partner",
    bestBefore: "Today, 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900",
  },
  {
    id: "RPL-24084",
    title: "Fresh vegetables",
    description:
      "A collection of fresh seasonal vegetables ready for distribution.",
    quantity: "48 kg",
    servings: "Multiple families",
    location: "Whitefield, Bengaluru",
    address: "Whitefield, Bengaluru, Karnataka",
    time: "Tomorrow, 9:00 AM",
    category: "Vegetables",
    status: "Available",
    donor: "Fresh Market Partner",
    bestBefore: "Tomorrow, 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900",
  },
  {
    id: "RPL-24079",
    title: "Packaged snacks & bread",
    description:
      "Sealed packaged snacks and fresh bread for community members.",
    quantity: "54 pieces",
    servings: "54 people",
    location: "Jayanagar, Bengaluru",
    address: "Jayanagar, Bengaluru, Karnataka",
    time: "Today, 5:30 PM",
    category: "Packed Meals",
    status: "Available",
    donor: "Food Store Partner",
    bestBefore: "Tomorrow, 12:00 PM",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900",
  },
  {
    id: "RPL-24072",
    title: "Artisan breads & pastries",
    description:
      "Fresh artisan breads and assorted pastries available for pickup.",
    quantity: "42 pieces",
    servings: "42 people",
    location: "Indiranagar, Bengaluru",
    address: "Indiranagar, Bengaluru, Karnataka",
    time: "Today, 7:00 PM",
    category: "Bakery",
    status: "Available",
    donor: "Artisan Bakery Partner",
    bestBefore: "Tomorrow, 8:00 AM",
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484df?w=900",
  },
];

const categories = [
  "All Categories",
  "Cooked Meals",
  "Bakery",
  "Vegetables",
  "Packed Meals",
];

export default function FindFood() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [selectedFood, setSelectedFood] = useState(null);
  const [requestFood, setRequestFood] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");

  const filteredFood = useMemo(() => {
    return foodListings.filter((food) => {
      const matchesSearch =
        food.title.toLowerCase().includes(search.toLowerCase()) ||
        food.location.toLowerCase().includes(search.toLowerCase()) ||
        food.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" || food.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleRequest = (food) => {
    setRequestFood(food);
    setRequestMessage("");
  };

  const confirmRequest = () => {
    setRequestMessage(
      `Demo request submitted for ${requestFood.title}. No request has been sent to a server.`
    );
    setRequestFood(null);
  };

  return (
    <main className="find-food-page">

      {/* HERO */}
      <section className="find-food-hero">
        <div className="find-food-hero-content">
          <span className="find-food-eyebrow">
            <Heart size={15} /> FOOD RESCUE NETWORK
          </span>

          <h1>
            Good food deserves
            <br />
            <span>a second chance.</span>
          </h1>

          <p>
            Discover surplus food shared by our community and help
            connect fresh meals with people who need them.
          </p>

          <div className="find-food-hero-points">
            <span><CheckCircle2 size={16} /> Community partners</span>
            <span><CheckCircle2 size={16} /> Fresh food sharing</span>
            <span><CheckCircle2 size={16} /> Less food waste</span>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="find-food-container">

        <div className="find-food-heading">
          <div>
            <span className="find-food-section-label">EXPLORE DONATIONS</span>
            <h2>Available food near you</h2>
            <p>Browse food donations and check pickup details.</p>
          </div>

          <div className="find-food-count">
            <Package size={19} />
            {filteredFood.length} donations found
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="find-food-controls">
          <div className="find-food-search">
            <Search size={21} />
            <input
              type="text"
              placeholder="Search by food or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="find-food-filter">
            <Filter size={19} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="find-food-demo-note">
          <span><CheckCircle2 size={16} /></span>
          Showing sample donation listings for demonstration.
          These are not live or verified offers.
        </div>

        {/* FOOD CARDS */}
        {filteredFood.length > 0 ? (
          <div className="find-food-grid">
            {filteredFood.map((food) => (
              <article className="food-card" key={food.id}>

                <div className="food-card-image">
                  <img
                    src={food.image}
                    alt={food.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <span className={`food-status ${food.status.toLowerCase()}`}>
                    {food.status}
                  </span>

                  <span className="food-id">{food.id}</span>
                </div>

                <div className="food-card-content">
                  <span className="food-category">{food.category}</span>

                  <h3>{food.title}</h3>

                  <div className="food-detail">
                    <Utensils size={17} />
                    <span>{food.quantity}</span>
                  </div>

                  <div className="food-detail">
                    <MapPin size={17} />
                    <span>{food.location}</span>
                  </div>

                  <div className="food-detail">
                    <Clock size={17} />
                    <span>{food.time}</span>
                  </div>

                  <div className="food-card-actions">
                    <button
                      type="button"
                      className="view-details-btn"
                      onClick={() => setSelectedFood(food)}
                    >
                      View details
                    </button>

                    <button
                      type="button"
                      className="request-food-btn"
                      onClick={() => handleRequest(food)}
                      disabled={food.status !== "Available"}
                    >
                      {food.status === "Available"
                        ? <>Request Pickup <ArrowRight size={17} /></>
                        : "Pending"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="find-food-empty">
            <Search size={38} />
            <h3>No food donations found</h3>
            <p>Try changing your search or category filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* DETAILS MODAL */}
      {selectedFood && (
        <div
          className="food-modal-overlay"
          onClick={() => setSelectedFood(null)}
        >
          <div
            className="food-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="food-modal-close"
              onClick={() => setSelectedFood(null)}
              aria-label="Close details"
            >
              <X size={21} />
            </button>

            <img
              src={selectedFood.image}
              alt={selectedFood.title}
              className="food-modal-image"
            />

            <div className="food-modal-content">
              <span className="food-category">{selectedFood.category}</span>
              <h2>{selectedFood.title}</h2>
              <p>{selectedFood.description}</p>

              <div className="food-modal-details">
                <p><Utensils size={17} /> {selectedFood.quantity}</p>
                <p><Heart size={17} /> {selectedFood.servings}</p>
                <p><MapPin size={17} /> {selectedFood.address}</p>
                <p><Clock size={17} /> Pickup: {selectedFood.time}</p>
                <p><CalendarDays size={17} /> Best before: {selectedFood.bestBefore}</p>
                <p><Package size={17} /> Donor: {selectedFood.donor}</p>
              </div>

              <a
                className="food-map-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedFood.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                View location on Google Maps <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST MODAL */}
      {requestFood && (
        <div
          className="food-modal-overlay"
          onClick={() => setRequestFood(null)}
        >
          <div
            className="food-request-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="food-modal-close"
              onClick={() => setRequestFood(null)}
              aria-label="Close request"
            >
              <X size={21} />
            </button>

            <div className="request-modal-icon">
              <Heart size={28} />
            </div>

            <h2>Request food pickup</h2>
            <p>
              You are requesting <strong>{requestFood.title}</strong>
              {" "}({requestFood.quantity}).
            </p>
            <p className="request-demo-warning">
              This is a frontend demo. No pickup request will be sent to a server.
            </p>

            <button
              type="button"
              className="request-confirm-btn"
              onClick={confirmRequest}
            >
              Confirm demo request
            </button>

            <button
              type="button"
              className="request-cancel-btn"
              onClick={() => setRequestFood(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* REQUEST SUCCESS MESSAGE */}
      {requestMessage && (
        <div className="request-toast">
          <CheckCircle2 size={19} />
          {requestMessage}
          <button
            onClick={() => setRequestMessage("")}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* BOTTOM CTA */}
      <section className="find-food-bottom">
        <Heart size={30} />
        <h2>Every meal shared makes a difference.</h2>
        <p>Together, we can reduce food waste and spread hope.</p>
      </section>

    </main>
  );
}
