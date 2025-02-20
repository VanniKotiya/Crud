import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
          alert('Post Created Successfully!');
          navigate('/'); // Redirect to home after creating post
        }
      })
      .catch((err) => {
        console.error('Error creating post:', err);
      });
  };

  return (
    <div className="container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Topic</label>
          <input
            type="text"
            className="form-control"
            name="topic"
            placeholder='Enter Topic'
            value={post.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder='Enter Description'
            value={post.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Catergory</label>
          <input
            type="text"
            className="form-control"
            name="postCatergory"
            placeholder='Enter Post Catergory'
            value={post.postCatergory}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success"> 
          <i className='far fa-check-square'></i> 
          &nbsp; Submit
        </button>
      </form>
    </div>
  );
}
