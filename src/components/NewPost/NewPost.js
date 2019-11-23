import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
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
        })
    }

    render () {
        //console.log(this.state);
        return (
            <div className="NewPost">
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