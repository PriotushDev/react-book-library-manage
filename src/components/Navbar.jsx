import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <NavLink to="/" className="nav-logo">
          📚 <span>Book</span>Library
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Menu */}
        <nav className={`nav-menu ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/books" onClick={() => setOpen(false)}>
            Books
          </NavLink>
          <NavLink to="/subjects" onClick={() => setOpen(false)}>
            Subjects
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
