import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/blog/navbar';
import Blogs from './components/blog/blog-cards';
import BlogDetail from './components/blog/BlogDetails';
import AdminBlog from './components/blog/AdminBlog';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<Blogs />} />
            <Route path="/admin" element={<AdminBlog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
