import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import BlogPage from "./pages/blogpage/BlogPage";
import LandingPage from "./pages/landingpage/LandingPage";
import BlogDetail from "./components/BlogDetail";
import About from "./pages/about";
import Contact from "./pages/contactus/index";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/index";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/blog" element={<BlogPage />} /> */}
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
