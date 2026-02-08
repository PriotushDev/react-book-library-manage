import { Link } from "react-router-dom";
import { useState } from "react";

const dummyBooks = [
  {
    id: 1,
    title: "Learning React",
    author: "Alex Banks",
    year: 2022,
    subject: "programming",
  },
  {
    id: 2,
    title: "JavaScript Guide",
    author: "MDN",
    year: 2021,
    subject: "programming",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2019,
    subject: "software",
  },
  {
    id: 4,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2020,
    subject: "programming",
  },
];

export default function Books() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");

  const filteredBooks = dummyBooks.filter((book) => {
    return (
      (title === "" ||
        book.title.toLowerCase().includes(title.toLowerCase())) &&
      (author === "" ||
        book.author.toLowerCase().includes(author.toLowerCase())) &&
      (subject === "" || book.subject === subject)
    );
  });

  function handleClear() {
    setTitle("");
    setAuthor("");
    setSubject("");
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
          <option value="software">Software</option>
        </select>

        <button className="btn primary">Search</button>
        <button className="btn secondary" onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            className="book-link"
          >
            <div className="book-card">
              <div className="book-cover">📘</div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span>{book.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
