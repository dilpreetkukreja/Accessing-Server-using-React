import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
//import axios from 'axios';
import axios from '../../axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedId: null,
        error: false
    }
    clickHandler = (id) => {
        this.setState({selectedId: id})
    }
    componentDidMount(){
        console.log('[Blog.js componentDidMount]')
        axios.get('/posts/')
            .then(response=>{
                let posts = response.data.slice(0,4);
                let updatedPosts = posts.map(post=>{
                    return {
                        ...post,
                        author:'Jasnoor'
                    }
                });
                this.setState({posts: updatedPosts});
            }) 
            .catch(error=> this.setState({error: true}));

    }

    render () {
                let posts = <div>Something went wrong!</div>
                if(!this.state.error){
                    posts = (
                        this.state.posts.map(post=>{
                            return <Post key={post.id} 
                                    id={post.id}
                                    title={post.title} 
                                    author={post.author}
                                    click={this.clickHandler}/>
                            })   
                    );                      
                }
                return(
                    <div>
                        <section className="Posts">
                            {posts}
                        </section>
                        <section>
                            {/*<FullPost selectedId={this.state.selectedId} posts={this.state.posts}/>*/}
                            <FullPost selectedId={this.state.selectedId}/>
                        </section>
                        <section>
                            <NewPost />
                        </section>
                    </div>
                );
    }
}

export default Blog;