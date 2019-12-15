import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
//import {Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    addPostHandler = () => {
        let data = {
            ...this.state
        }
        axios.post('/posts/', data)
        .then(response=>{
            console.log('Post Data', response);
            //this.setState({submitted: true});//it replaces the visited page, so by pressing backward key we cannot go to page we just visited
            //this.props.history.replace('/cards');//it replaces the visited page, same as above
            this.props.history.push('/cards');// it don't replace the visited page, so by pressing backward key, we can go back to prev page we visited

        })
    }

    render () {
        //console.log(this.state);
        /*let redirect = null;
        if(this.state.submitted){
            redirect = <Redirect to='/posts' />
        }*/
        return (
            <div className="NewPost">
                {/*{redirect}*/}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} 
                       name='title'
                       onChange={this.changeHandler} />
                <label>Content</label>
                <textarea rows="4" 
                          name='content'
                          value={this.state.content} 
                          onChange={this.changeHandler} />
                <label>Author</label>
                <select value={this.state.author}
                        name='author' 
                        onChange={this.changeHandler}>
                    <option></option>
                    <option value="Dilpreet">Dilpreet</option>
                    <option value="Anter">Anter</option>
                </select>
                <button onClick = {this.addPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;