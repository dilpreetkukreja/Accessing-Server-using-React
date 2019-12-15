import React, { Component } from 'react';
import './Blog.css';
//import axios from 'axios';
import Posts from './Posts/Posts';
import {BrowserRouter as Router, NavLink, Route, Switch, Redirect} from 'react-router-dom';
import NewPost from "./NewPost/NewPost";
//import FullPost from "./FullPost/FullPost";

class Blog extends Component {
    render () {
                return(
                    <Router>
                        <header className="Blog">
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </header>
                        <section>
                            <Switch>
                                <Route path="/new-post" component={NewPost} />  
                                <Route path="/posts" component={Posts}/>   
                                <Redirect from='/' to='/posts' />
                            </Switch>
                          
                        </section> 
                    </Router>
                );
    }
}

export default Blog;