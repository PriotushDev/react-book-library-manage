import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Home() {
  return <h2>Home Page</h2>;
}

function Books() {
  return <h2>Books Page</h2>;
}

function Subjects() {
  return <h2>Subjects Page</h2>;
}

export default function App() {
  return (
    <>
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
