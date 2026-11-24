import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">
          <Leaf size={23} />
        </span>
        <span>RePlate</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/find-food" onClick={closeMenu}>Find Food</NavLink>
        <NavLink to="/volunteer" onClick={closeMenu}>Volunteer</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/login" className="login-nav-link">
             Log in
            </NavLink>

        <Link
          to="/donate-food"
          className="nav-donate"
          onClick={closeMenu}
        >
          Donate Food
        </Link>
      </nav>
    </header>
  );
}