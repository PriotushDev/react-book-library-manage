import { useNavigate } from "react-router-dom";

export default function BookDetails() {
  const navigate = useNavigate();

  return (
    <section className="book-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      <div className="details-card">
        <div className="details-cover">📕</div>

        <div className="details-info">
          <h2>Learning React</h2>
          <p><strong>Author:</strong> Alex Banks</p>
          <p><strong>First Publish Year:</strong> 2022</p>
          <p><strong>Pages:</strong> 350</p>
          <p><strong>Publisher:</strong> O'Reilly</p>
          <p><strong>Subjects:</strong> Programming, React, JavaScript</p>
        </div>
      </div>
    </section>
  );
}
