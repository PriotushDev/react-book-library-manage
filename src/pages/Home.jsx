import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-v2">
      {/* ===== HERO ===== */}
      <div className="home-hero">
        <h1>📚 Book Library Management System</h1>
        <p>
          Search, browse and explore thousands of books from the Open Library.
          Find books by title, author or subject — all in one place.
        </p>

        <div className="hero-actions">
          <Link to="/books" className="btn primary">
            Explore Books
          </Link>
          <Link to="/subjects" className="btn secondary">
            Browse by Subject
          </Link>
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="home-features">
        <div className="feature-card">
          <h3>🔍 Smart Search</h3>
          <p>
            Instantly search books by title or author with live filtering.
          </p>
        </div>

        <div className="feature-card">
          <h3>📖 Book Details</h3>
          <p>
            View complete book information with cover, author and publish year.
          </p>
        </div>

        <div className="feature-card">
          <h3>🗂 Browse by Subject</h3>
          <p>
            Discover books by category like fiction, science, history and more.
          </p>
        </div>

        <div className="feature-card">
          <h3>➡ Easy Navigation</h3>
          <p>
            Move between books easily using next and previous buttons.
          </p>
        </div>
      </div>

      {/* ===== QUICK LINKS ===== */}
      <div className="home-quick">
        <h2>Get Started Quickly</h2>
        <div className="quick-links">
          <Link to="/books">📚 View All Books</Link>
          <Link to="/subjects">📂 Explore Subjects</Link>
        </div>
      </div>
    </section>
  );
}
