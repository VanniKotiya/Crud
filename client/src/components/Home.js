import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      searchQuery: "", // 🔍 Store search input
    };
  }

  componentDidMount() {
    this.retrivePosts();
  }

  retrivePosts() {
    axios.get("/post").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
      }
    }).catch((err) => console.error("Error fetching posts:", err));
  }

  // ✅ Handle Delete Function
  handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    axios.delete(`/post/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Post Deleted Successfully!");
          this.retrivePosts();
        }
      })
      .catch((err) => console.error("Error deleting post:", err));
  };

  // ✅ Handle Search Input Change
  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    // 🔍 Filter posts based on search query
    const filteredPosts = this.state.posts.filter((post) =>
      post.topic.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
      post.postCatergory.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    return (
      <div className='container-fluid mt-4'>
        {/* 🔍 Search and Title Section */}
        <div className='row mb-3'>
          <div className='col-md-8'>
            <h3 className="text-primary">📌 All Posts</h3>
          </div>
          <div className='col-md-4'>
            <input
              type="text"
              placeholder="🔍 Search posts..."
              className="form-control"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>
        </div>

        {/* ✅ Table Section */}
        <div className='card shadow-sm'>
          <div className="card-body">
            <div className='table-responsive'>
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col">📌 Topic</th>
                    <th scope="col">📝 Description</th>
                    <th scope="col">📂 Category</th>
                    <th scope="col" className="text-center">⚙️ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <tr key={post._id}>
                        <th scope="row" className="text-center">{index + 1}</th>
                        <td>
                          <Link to={`/post/${post._id}`} className="text-decoration-none text-primary">
                            {post.topic}
                          </Link>
                        </td>
                        <td>{post.description}</td>
                        <td>{post.postCatergory}</td>
                        <td className="text-center">
                          <Link to={`/edit/${post._id}`} className="btn btn-warning btn-sm mx-1">
                            <i className="fas fa-edit"></i> Edit
                          </Link>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => this.handleDelete(post._id)}
                          >
                            <i className="far fa-trash-alt"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No posts found...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ➕ Add New Post Button */}
        <div className="mt-3">
          <Link to="/add" className="btn btn-success">➕ Create New Post</Link>
        </div>
      </div>
    );
  }
}
