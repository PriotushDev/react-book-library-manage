const BASE_URL = "https://openlibrary.org";

/* SEARCH BOOKS */
export async function searchBooks({ title, author, subject, page = 1 }) {
  try {
    let url = `${BASE_URL}/search.json?limit=10&page=${page}`;

    if (title) url += `&title=${title}`;
    if (author) url += `&author=${author}`;
    if (subject) url += `&subject=${subject}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    return data.docs;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* BOOK DETAILS */
export async function getBookDetails(workId) {
  try {
    const res = await fetch(`${BASE_URL}/works/${workId}.json`);
    if (!res.ok) throw new Error("Details failed");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/* SUBJECT BOOKS */
export async function getBooksBySubject(subject, limit = 12) {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${subject}.json?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subject books");
    }

    const data = await response.json();
    return data.works;
  } catch (error) {
    console.error("Subject books error:", error);
    return [];
  }
}

