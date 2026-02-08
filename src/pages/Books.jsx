import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchBooks } from "../api/openLibrary";
import Loader from "../components/Loader";


export default function Books() {
  const [allBooks, setAllBooks] = useState([]); // original loaded books
  const [books, setBooks] = useState([]);       // visible / filtered books
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");

  /* ===============================
     DEFAULT LOAD (page open হলে)
     =============================== */
  useEffect(() => {
    async function loadInitial() {
      setLoading(true);

      const result = await searchBooks({
        title: "react",
        page: 1,
      });

      setAllBooks(result);
      setBooks(result);
      setLoading(false);
    }

    loadInitial();
  }, []);

  /* ===============================
     LIVE SEARCH (client-side)
     =============================== */
  useEffect(() => {
    let filtered = allBooks;

    if (title) {
      filtered = filtered.filter((book) =>
        book.title?.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (author) {
      filtered = filtered.filter((book) =>
        book.author_name
          ?.join(", ")
          .toLowerCase()
          .includes(author.toLowerCase())
      );
    }

    if (subject) {
      filtered = filtered.filter((book) =>
        book.subject?.includes(subject)
      );
    }

    setBooks(filtered);
  }, [title, author, subject, allBooks]);

  /* ===============================
     PAGINATION (Load More)
     =============================== */
  async function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);

    const more = await searchBooks({
      title: "react",
      page: nextPage,
    });

    const updated = [...allBooks, ...more];
    setAllBooks(updated);
    setBooks(updated);

    setLoading(false);
  }

  /* ===============================
     CLEAR FILTER
     =============================== */
  function handleClear() {
    setTitle("");
    setAuthor("");
    setSubject("");
    setBooks(allBooks);
  }

  /* ===============================
     LIST of IDS for Prev / Next
     =============================== */
  const idList = books.map((b) => b.key.split("/").pop());

  return (
    <section>
      <h2 className="page-title">Books</h2>

      {/* 🔍 SEARCH BOX */}
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

        <button className="btn secondary" onClick={handleClear}>
          Clear
        </button>
      </div>

      {loading && <Loader text="Loading books..." />}


      {/* 📚 BOOKS GRID */}
      <div className="books-grid">
        {books.map((book) => (
          <Link
            key={book.key}
            to={`/book/${book.key.split("/").pop()}`}
            state={{ list: idList }}   // 🔥 Prev / Next support
            className="book-link"
          >
            <div className="book-card">
              <div className="book-cover">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                  />
                ) : (
                  <div className="no-cover">No Cover</div>
                )}
              </div>

              <h3>{book.title}</h3>
              <p>{book.author_name?.join(", ")}</p>
              <span>{book.first_publish_year}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔽 PAGINATION BUTTON */}
      {allBooks.length >= 10 && (
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button className="btn primary" onClick={loadMore}>
            Load More Books
          </button>
        </div>
      )}
    </section>
  );
}
