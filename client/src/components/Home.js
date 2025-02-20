import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
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

        console.log(this.state.posts);
      }
    });
  }

  render() {
    return (
    <div>
        <p>All posts</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post Catergory</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                    {post.topic}
                  </Link>
                </td>
                <td>{post.description}</td>
                <td>{post.postCatergory}</td>
                <td>
                  <button className="btn btn-warning">
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </button>
                  &nbsp;
                  <button className="btn btn-danger">
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/add" className="btn btn-success">Create New Post</Link>
    </div>
    );
  }
}
