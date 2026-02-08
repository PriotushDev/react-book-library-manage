import { useState } from "react";
import { Link } from "react-router-dom";
import { searchBooks } from "../api/openLibrary";

export default function Books() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    const result = await searchBooks({ title, author, subject });
    setBooks(result);
    setLoading(false);
  }

  function handleClear() {
    setTitle("");
    setAuthor("");
    setSubject("");
    setBooks([]);
  }

  return (
    <section>
      <h2 className="page-title">Books</h2>

      {/* Search Section */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="programming">Programming</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>

        <button className="btn primary" onClick={handleSearch}>
          Search
        </button>

        <button className="btn secondary" onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Result */}
      {loading && <p>Loading books...</p>}

      <div className="books-grid">
        {books.map((book) => (
          <Link
            to={`/book/${book.key.split("/").pop()}`}
            key={book.key}
            className="book-link"
          >
            <div className="book-card">
                <div className="book-cover">
                    <img
                        src={
                        book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                            : "https://via.placeholder.com/150x220?text=No+Cover"
                        }
                        alt={book.title}
                    />
                </div>

              <h3>{book.title}</h3>
              <p>{book.author_name?.join(", ")}</p>
              <span>{book.first_publish_year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
