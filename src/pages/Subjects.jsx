import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooksBySubject } from "../api/openLibrary";
import Loader from "../components/Loader";

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
  const [activeSubject, setActiveSubject] = useState("fiction");
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      const result = await getBooksBySubject(activeSubject, limit);
      setBooks(result);
      setLoading(false);
    }
    loadBooks();
  }, [activeSubject, limit]);

  const idList = books.map((b) => b.key.split("/").pop());

  return (
    <section>
      {/* ===== SUBJECT FILTER HEADER ===== */}
      <div className="subjects-filter">
        <div className="subjects-filter-top">
          <h2>Browse by Subject</h2>

          <div className="subject-control">
            <label>Show</label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </select>
            <span>books</span>
          </div>
        </div>

        <div className="subject-chips">
          {subjects.map((sub) => (
            <button
              key={sub}
              className={`subject-chip ${
                activeSubject === sub ? "active" : ""
              }`}
              onClick={() => setActiveSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {loading && <Loader text="Loading books..." />}

      {!loading && (
        <div className="books-grid">
          {books.map((book) => (
            <Link
              key={book.key}
              to={`/book/${book.key.split("/").pop()}`}
              state={{ list: idList }}
              className="book-link"
            >
              <div className="book-card">
                <div className="book-cover">
                  {book.cover_id ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                      alt={book.title}
                    />
                  ) : (
                    <div className="no-cover">No Cover</div>
                  )}
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
      )}
    </section>
  );
}
