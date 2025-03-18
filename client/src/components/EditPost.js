import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      description: "",
      postCatergory: ""
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
      .catch((err) => {
        console.error("Error fetching post data:", err);
      });
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
          alert("Post Updated Successfully!");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error("Error updating post:", err);
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Edit Post</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Topic</label>
            <input 
              type="text" 
              className="form-control" 
              name="topic"
              value={this.state.topic}
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input 
              type="text" 
              className="form-control" 
              name="postCatergory"
              value={this.state.postCatergory}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">Update Post</button>
        </form>
      </div>
    );
  }
}
