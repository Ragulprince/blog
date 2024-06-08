import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './blog-cards.css';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [moreStories, setMoreStories] = useState([]);
  const [visibleStories, setVisibleStories] = useState(8); // Initial number of visible stories
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogResponse = await axios.get('http://localhost:5000/api/blogs');
        const nonArchivedBlogs = blogResponse.data.filter(blog => !blog.archived);
        setBlogs(nonArchivedBlogs);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFeaturedStories = async () => {
      try {
        const featuredResponse = await axios.get('http://localhost:5000/api/featuredStories');
        const nonArchivedFeaturedStories = featuredResponse.data.filter(story => !story.archived);
        setFeaturedStories(nonArchivedFeaturedStories);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMoreStories = async () => {
      try {
        const moreResponse = await axios.get('http://localhost:5000/api/moreStories');
        const nonArchivedMoreStories = moreResponse.data.filter(story => !story.archived);
        setMoreStories(nonArchivedMoreStories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
    fetchFeaturedStories();
    fetchMoreStories();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleLoadMore = () => {
    setVisibleStories(moreStories.length); // Show all stories
  };

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Blogs</h1>
      <h2 className="latest-updates mt-4">Latest Updates</h2>
      <div className="row mt-4 justify-content-center">
        {blogs.map((blog, index) => (
          <div className="col-md-4" key={index}>
            <div className="card bg-dark text-white h-100">
              <img src={`data:image/png;base64,${blog.image}`} className="card-img-top" alt={`Blog ${index + 1}`} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text flex-grow-1">
                  {blog.description.length > 100 ? (
                    <>
                      {blog.description.substring(0, 100)}...
                    </>
                  ) : (
                    blog.description
                  )}
                </p>
                <p className="card-text">
                  <small className="text-muted">Posted on {new Date(blog.date).toLocaleDateString()}</small>
                </p>
                <button className="btn btn-primary mt-auto" onClick={() => handleReadMore(blog._id)}>Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <button className="btn btn-outline-primary btn-rectangle" onClick={handleLoadMore}>LOAD MORE STORIES</button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center">Featured Stories</h2>
        <div className="row mt-4">
          {featuredStories.map((story, index) => (
            <div className="col-12 mb-4" key={index}>
              <img src={`data:image/png;base64,${story.image}`} className="img-fluid" alt={`Featured Story ${index + 1}`} />
              <p className="mt-3">{story.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center">More Stories from SoloPro</h2>
        <div className="row mt-4">
          {moreStories.slice(0, visibleStories).map((story, index) => (
            <div className="col-12 mb-4" key={index}>
              <div className="d-flex flex-column flex-md-row">
                <div className="flex-shrink-0">
                  <img src={`data:image/png;base64,${story.image}`} className="img-fluid story-image" alt={`More Story ${index + 1}`} />
                </div>
                <div className="flex-grow-1 ms-3 p-3 bg-dark text-white">
                  <h5 className="card-title">Story Title {index + 1}</h5>
                  <p className="card-text">{story.shortDescription}</p>
                  <a href="#" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {moreStories.length > visibleStories && (
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <button className="btn btn-outline-primary btn-rectangle" onClick={handleLoadMore}>LOAD MORE STORIES</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;