export default function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Welcome to Book Library</h1>
        <p>
          Search books, explore subjects, and discover knowledge
          from Open Library.
        </p>

        <div className="home-buttons">
          <a href="/books" className="btn primary">Browse Books</a>
          <a href="/subjects" className="btn secondary">Explore Subjects</a>
        </div>
      </div>
    </section>
  );
}
