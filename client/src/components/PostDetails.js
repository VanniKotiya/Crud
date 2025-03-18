import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function PostDetails() {
  const { id } = useParams(); // Get the 'id' from URL
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.existingPosts);
        }
      })
      .catch((err) => console.error('Error fetching the post:', err));
  }, [id]);

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-lg p-4">
        <h3 className="text-primary">
          📄 Post Details
        </h3>
        <hr />

        <dl className="row">
          <dt className="col-sm-3 fw-bold">📝 Topic</dt>
          <dd className="col-sm-9">{post.topic}</dd>

          <dt className="col-sm-3 fw-bold">📖 Description</dt>
          <dd className="col-sm-9">{post.description}</dd>

          <dt className="col-sm-3 fw-bold">📂 Post Category</dt>
          <dd className="col-sm-9">{post.postCatergory}</dd>
        </dl>

        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-secondary">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
