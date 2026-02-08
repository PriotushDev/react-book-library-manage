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

  /* 🔹 Load books when subject or limit changes */
  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const result = await getBooksBySubject(activeSubject, limit);
        setBooks(result);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [activeSubject, limit]);

  /* 🔹 ID list for Details page (Prev / Next support) */
  const idList = books.map((b) => b.key.split("/").pop());

  return (
    <section>
      {/* ===== HEADER ===== */}
      <div className="subjects-header">
        <h2 className="page-title">Browse by Subject</h2>

        <div className="subjects-top">
          {/* Subject buttons */}
          <div className="subject-list">
            {subjects.map((sub) => (
              <button
                key={sub}
                className={`subject-btn ${
                  activeSubject === sub ? "active" : ""
                }`}
                onClick={() => setActiveSubject(sub)}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Page size selector */}
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
      </div>

      {/* ===== LOADER ===== */}
      {loading && <Loader text="Loading books..." />}

      {/* ===== BOOKS GRID ===== */}
      {!loading && (
        <>
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <Link
                  key={book.key}
                  to={`/book/${book.key.split("/").pop()}`}
                  state={{ list: idList }} // 🔥 Prev / Next support
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
        </>
      )}
    </section>
  );
}
