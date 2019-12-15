import React from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import {Link, Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends React.Component{
    state = {
        posts: [],
        error: false
    }
    clickHandler = (id) => {
        this.setState({selectedId: id})
    }
    componentDidMount(){
        console.log('[Posts.js componentDidMount]')
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
    componentWillUnmount(){
        console.log('[Posts.js componentWillUnmount]');
    }
    render(){
        console.log('[Posts.js props:]', this.props);
        let posts = <div>Something went wrong!</div>
        if(!this.state.error){
            posts = (
                this.state.posts.map(post=>{
                    return (
                            <Link to={`/posts/${post.id}`} key={post.id}>
                                 <Post id={post.id}
                                    title={post.title} 
                                    author={post.author}
                                    click={this.clickHandler}/>
                            </Link>
                           )
                    })   
            );                      
        }
        return (
            <div className="Posts">
                {posts}
                <Route path={`${this.props.match.url}/:id`} component={FullPost} />
            </div>
        );
    }
}

export default Posts;