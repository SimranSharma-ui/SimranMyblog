import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./componants/Navbar";
import Home from "./componants/Home";
import Footer from "./componants/Footer";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./contaxt/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import UpdateBlog from "./dashboard/UpdateBlog";

const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt");
  console.log(blogs);
  console.log(isAuthenticated);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/Update/:id" element={<UpdateBlog />} />
        <Route path="/blog/:id" element={<Detail />}></Route>

        {/* Universal route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
