import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function CreatePosts() {
  const [post, setPost] = useState({
    topic: '',
    description: '',
    postCatergory: '',
  });

  const navigate = useNavigate(); // To redirect after form submission

  // Handle input changes
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/post/save', post)
      .then((res) => {
        if (res.data.success) {
          alert('✅ Post Created Successfully!');
          navigate('/'); // Redirect to home
        }
      })
      .catch((err) => console.error('Error creating post:', err));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-lg p-4">
        <h3 className="text-success text-center">
          ✍️ Create a New Post
        </h3>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">📝 Topic</label>
            <input
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter Topic"
              value={post.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">📖 Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Enter Description"
              value={post.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">📂 Category</label>
            <input
              type="text"
              className="form-control"
              name="postCatergory"
              placeholder="Enter Post Category"
              value={post.postCatergory}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-secondary">
              ⬅ Cancel
            </Link>
            <button type="submit" className="btn btn-success">
              ✅ Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}