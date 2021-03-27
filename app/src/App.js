import React from 'react';
import { connect } from 'react-redux';
import { withServicesContext } from './services/Context';
import { addPost } from './actions/postsActions';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            newPostContent: '',
        };
    }

    componentDidMount() {
        const { services, addPost } = this.props;
        const { postsService } = services;
        postsService.listPosts()
            .then(posts => {
                posts.forEach(post => {
                    addPost(post);
                })
            });
    }

    render() {
        const { newPostContent } = this.state;
        const { posts, onAddPostClick } = this.props;

        return (
            <div>
                <ul>
                    {
                        posts.map(post => (
                            <li key={post.id}>{`${post.id}. ${post.content}`}</li>
                        ))
                    }
                </ul>

                <input
                    name="newPostContent"
                    type="text"
                    onChange={this.onChange}
                    value={newPostContent}/>

                <button type="button" onClick={(event) => onAddPostClick(newPostContent)}>Add</button>
            </div>
        );
    }

    onChange = (event) => {
        this.setState({
            newPostContent: event.target.value,
        });
    }
}

const mapStateToProps = ({ posts }) => ({
    posts: posts.posts,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addPost: (post) => dispatch(addPost(post)),
    onAddPostClick: (newPostContent) => {
        const { postsService } = ownProps.services;
        postsService.createPost({ content: newPostContent })
            .then(post => dispatch(addPost(post)));
    }
});

export default withServicesContext(
    connect(mapStateToProps, mapDispatchToProps)(App)
);
