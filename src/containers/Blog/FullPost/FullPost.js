import React, { Component } from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        hasLoaded: false,
        error: false
    }
    
    callApi = () =>{
        
    }
    componentDidMount(prevProps){
        console.log('[FullPost.js componentDidMount]');
        console.log('[FullPost.js componentDidMount] prevProps', prevProps);
        if(this.props.match.params.id){
            console.log('Accessing server...');
            axios.get('/posts/'+this.props.match.params.id)
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
    componentDidUpdate(prevProps){
        console.log('FullPost.js: componentDidUpdate');
        console.log('[FullPost.js: componentDidUpdate] prevProps:',prevProps);
        if(prevProps.match.params.id!==this.props.match.params.id){
            console.log('Accessing server...');
            axios.get('/posts/'+this.props.match.params.id)
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
    componentWillUnmount(){
        console.log('FullPost:', this.componentWillUnmount);
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
        console.log('selectedPost:', this.state.selectedPost);
        console.log('FullPost.js props', this.props);
        let post = <p>Please select a Post!</p>;
        

        if(this.props.match.params.id){
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