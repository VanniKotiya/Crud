import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      description: "",
      postCatergory: "",
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split("/").pop(); // Get post ID from URL

    axios.get(`http://localhost:8000/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          const post = res.data.existingPosts;
          this.setState({
            topic: post.topic,
            description: post.description,
            postCatergory: post.postCatergory
          });
        }
      })
      .catch((err) => console.error("Error fetching post data:", err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = window.location.pathname.split("/").pop();

    const updatedPost = {
      topic: this.state.topic,
      description: this.state.description,
      postCatergory: this.state.postCatergory
    };

    axios.put(`http://localhost:8000/post/update/${id}`, updatedPost)
      .then((res) => {
        if (res.data.success) {
          alert("✅ Post Updated Successfully!");
          window.location.href = "/";
        }
      })
      .catch((err) => console.error("Error updating post:", err));
  };

  render() {
    return (
      <div className="container-fluid mt-4">
        <div className="card shadow-lg p-4">
          <h3 className="text-primary text-center">
            ✏️ Edit Post
          </h3>
          <hr />

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">📝 Topic</label>
              <input 
                type="text" 
                className="form-control" 
                name="topic"
                value={this.state.topic}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">📖 Description</label>
              <textarea 
                className="form-control" 
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
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
                value={this.state.postCatergory}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-secondary">
                ⬅ Cancel
              </Link>
              <button type="submit" className="btn btn-success">
                ✅ Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}