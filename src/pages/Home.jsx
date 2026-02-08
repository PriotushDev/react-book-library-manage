import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <div className="home-inner">
        <h1>
          Discover Your Next <span>Favorite Book</span>
        </h1>

        <p>
          Explore thousands of books by title, author, or subject using
          the Open Library API. Simple, fast, and beautifully designed.
        </p>

        <div className="home-actions">
          <Link to="/books" className="btn primary">
            Browse Books
          </Link>

          <Link to="/subjects" className="btn secondary">
            Browse by Subject
          </Link>
        </div>
      </div>
    </section>
  );
}
