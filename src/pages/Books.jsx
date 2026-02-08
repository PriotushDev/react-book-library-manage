const dummyBooks = [
  {
    id: 1,
    title: "Learning React",
    author: "Alex Banks",
    year: 2022,
  },
  {
    id: 2,
    title: "JavaScript Guide",
    author: "MDN",
    year: 2021,
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2019,
  },
  {
    id: 4,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2020,
  },
];

export default function Books() {
  return (
    <section>
      <h2 className="page-title">Books</h2>

      <div className="books-grid">
        {dummyBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-cover">📘</div>

            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <span>{book.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
