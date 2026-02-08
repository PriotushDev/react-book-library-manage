import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookDetails } from "../api/openLibrary";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const list = location.state?.list || [];

  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookDetails(id).then(setBook);
  }, [id]);

  if (!book) return <p>Loading book details...</p>;

  const cover = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  const currentIndex = list.indexOf(id);
  const prevId = currentIndex > 0 ? list[currentIndex - 1] : null;
  const nextId =
    currentIndex >= 0 && currentIndex < list.length - 1
      ? list[currentIndex + 1]
      : null;

  return (
    <section className="book-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      <div className="details-card">
        <div className="details-cover">
          {cover ? (
            <img src={cover} alt={book.title} />
          ) : (
            <div className="no-cover">No Cover</div>
          )}
        </div>

        <div className="details-info">
          <h2>{book.title}</h2>

          <p>
            <strong>First publish:</strong>{" "}
            {book.first_publish_date || "N/A"}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {book.description
              ? typeof book.description === "string"
                ? book.description
                : book.description.value
              : "No description available"}
          </p>

          <p>
            <strong>Subjects:</strong>{" "}
            {book.subjects
              ? book.subjects.slice(0, 6).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>

      {/* 🔽 PREV / NEXT (REAL) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <button
          className="btn secondary"
          disabled={!prevId}
          onClick={() => navigate(`/book/${prevId}`, { state: { list } })}
        >
          ← Previous
        </button>

        <button
          className="btn primary"
          disabled={!nextId}
          onClick={() => navigate(`/book/${nextId}`, { state: { list } })}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
