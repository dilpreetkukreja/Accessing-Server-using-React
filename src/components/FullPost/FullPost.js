import React, { Component } from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        selectedPost: null,
        hasLoaded: false,
        error: false
    }
    
    componentDidUpdate(prevProps, prevState){
        console.log('[FullPost.js componentDidUpdate]');
        if(prevProps.selectedId!==this.props.selectedId){
            console.log('Accessing server...');
            axios.get('/posts/'+this.props.selectedId)
            .then(response => {
                console.log(response);
                this.setState({
                    selectedPost: response.data,
                    hasLoaded: true
                })
            })
            .catch(error=>{
                this.setState({error: true});
            })
        } 
    }

    deletePostHandler = () => {
        axios.delete('/posts/'+this.props.selectedId)
        .then(response => {
            console.log('Deleted post response:',response);
        })
        .catch(error=>{
            this.setState({error: true});
        })
    }
    render () {
       
        /*
        Way 1: Displaying selected Id data from 'posts' data which blogs sent
        let selectedPost = this.props.posts.filter(post=>{
            return (post.id===this.props.selectedId);   
        });

        let post = <p>Please select a Post!</p>;
        if(selectedPost.length){
            post = (
                    <div className="FullPost">
                        <h1>{selectedPost[0].title}</h1>
                        <p>{selectedPost[0].body}</p>
                        <div className="Edit">
                            <button className="Delete">Delete</button>
                        </div>
                    </div>
            );
        }*/
        console.log('selectedId:',this.props.selectedId, 'selectedPost:', this.state.selectedPost);
        let post = <p>Please select a Post!</p>;

        if(this.props.selectedId){
            if(this.state.error){
                post = <div>Error accessing server</div>
            }
            else if(this.state.hasLoaded){
                post = (
                    <div className="FullPost">
                        <h1>{this.state.selectedPost.title}</h1>
                        <p>{this.state.selectedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                        </div>
                    </div>);
            }
            else{
                post = <div>Loading......</div>
            }
            
        }
            
        return post;
    }
}

export default FullPost;