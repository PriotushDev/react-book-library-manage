import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookDetails } from "../api/openLibrary";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      const data = await getBookDetails(id);

      if (!data) {
        setError("Failed to load book details.");
      } else {
        setBook(data);
      }

      setLoading(false);
    }

    loadBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;

  if (error) {
    return (
      <section className="book-details">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Results
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  const coverImage = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  return (
    <section className="book-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      <div className="details-card">
        <div className="details-cover">
          {coverImage ? (
            <img src={coverImage} alt={book.title} />
          ) : (
            "📕"
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
    </section>
  );
}
