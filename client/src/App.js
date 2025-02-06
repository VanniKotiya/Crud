import React, { Component } from 'react';
import axios from 'axios';


export default class App extends Component {
constructor(props){
  super(props);

  this.state={
    posts:[]
  };
}

componentDidMount(){
  this.retrivePosts();
}

retrivePosts(){
  axios.get("http://localhost:8000/post").then(res =>{
    if (res.data.success){
      this.setState({
        posts:res.data.existingPosts 
      });

      console.log(this.state.posts);
    }
  });
}

  render() {
    return (
      <div className ="container">
        <p>All posts</p>
        <table class = "table">
          <thead>
            <tr>
              <th scope ="col">#</th>
              <th scope ="col">Topic</th>
              <th scope ="col">Description</th>
              <th scope ="col">Post Catergory</th>
              <th scope ="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) =>(
              <tr>
                <th scope ="row">{index+1}</th>
                <td>{posts.topic}</td>
                <td>{posts.description}</td>
                <td>{posts.postCatergory}</td>
                <td>
                  <a className="btn btn-warning" href="#">
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;               
                  <a className="btn btn-danger" href="#">
                    <i className='far fa-trash-alt'></i>&nbsp;Delete
                  </a>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

        {/* {this.state.posts.map(posts =>(
            <div>
              <p>{posts.topic}</p>
              <p>{posts.description}</p>
              <p>{posts.postCatergory}</p>
            </div>
        ))} */}

      </div>
    )
  }
}
