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
