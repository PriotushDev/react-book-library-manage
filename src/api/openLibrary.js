const BASE_URL = "https://openlibrary.org";

export async function searchBooks({ title, author, subject }) {
  let url = `${BASE_URL}/search.json?limit=10`;

  if (title) url += `&title=${title}`;
  if (author) url += `&author=${author}`;
  if (subject) url += `&subject=${subject}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.docs;
}
