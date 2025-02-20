import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetails() {
  const { id } = useParams(); // Get the 'id' from URL
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.existingPosts); // Use existingPosts directly
        console.log(res.data.existingPosts);
      }
    }).catch((err) => {
      console.error('Error fetching the post:', err);
    });
  }, [id]);

  return (
    <div style={{marginTop:'20px'}}>
      <h1>Post Details</h1>
      <h4>{post.topic}</h4>
      <hr/>
      <dl className='row'>
        <dt className="col-sm-3">Description</dt>
        <dd className="col-sm-9">{post.description}</dd>

        <dt className='col-sm-3'>Post Category</dt>
        <dd className="col-sm-9">{post.postCatergory}</dd>
      </dl>
    </div>
  );
}
