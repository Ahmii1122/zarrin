import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import BlogPage from "./pages/blogpage/BlogPage";
import LandingPage from "./pages/landingpage/LandingPage";
import BlogDetail from "./components/BlogDetail";
import About from "./pages/about";
import Contact from "./pages/contactus/index";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
