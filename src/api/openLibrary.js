const BASE_URL = "https://openlibrary.org";

/* SEARCH BOOKS */
export async function searchBooks({ title, author, subject }) {
  try {
    let url = `${BASE_URL}/search.json?limit=10`;

    if (title) url += `&title=${title}`;
    if (author) url += `&author=${author}`;
    if (subject) url += `&subject=${subject}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Search books error:", error);
    return [];
  }
}

/* BOOK DETAILS */
export async function getBookDetails(workId) {
  try {
    const response = await fetch(
      `${BASE_URL}/works/${workId}.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    return await response.json();
  } catch (error) {
    console.error("Book details error:", error);
    return null;
  }
}

/* BOOKS BY SUBJECT */
export async function getBooksBySubject(subject) {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${subject}.json?limit=12`
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

