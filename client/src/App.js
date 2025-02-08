import React, { Component } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails';
import NavBar from './components/NavBar';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <NavBar/> 
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/add' element={<CreatePost/>}></Route>
            <Route path='/edit/:id' element={<EditPost/>}></Route>
            <Route path='/post/:id' element={<PostDetails/>}></Route>
          </Routes> 
        </div>
      
      </BrowserRouter>

      
    )
  }
}
