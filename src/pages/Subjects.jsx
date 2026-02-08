import { useState } from "react";
import { Link } from "react-router-dom";
import { getBooksBySubject } from "../api/openLibrary";

const subjects = [
  "fiction",
  "science",
  "history",
  "biography",
  "fantasy",
  "mystery",
];

export default function Subjects() {
  const [books, setBooks] = useState([]);
  const [activeSubject, setActiveSubject] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSubject(subject) {
    setActiveSubject(subject);
    setLoading(true);

    const result = await getBooksBySubject(subject);
    setBooks(result);

    setLoading(false);
  }

  return (
    <section>
      <h2 className="page-title">Browse by Subject</h2>

      {/* Subject Buttons */}
      <div className="subject-list">
        {subjects.map((sub) => (
          <button
            key={sub}
            className={`subject-btn ${
              activeSubject === sub ? "active" : ""
            }`}
            onClick={() => loadSubject(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      {loading && <p>Loading books...</p>}

      {/* Books Grid */}
      <div className="books-grid">
        {books.map((book) => (
          <Link
            key={book.key}
            to={`/book/${book.key.split("/").pop()}`}
            className="book-link"
          >
            <div className="book-card">
            <div className="book-cover">
            <img
                src={
                book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : "https://via.placeholder.com/150x220?text=No+Cover"
                }
                alt={book.title}
            />
            </div>

              <h3>{book.title}</h3>
              <p>
                {book.authors
                  ? book.authors.map((a) => a.name).join(", ")
                  : "Unknown"}
              </p>
              <span>{book.first_publish_year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
