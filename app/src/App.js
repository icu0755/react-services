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

                <button type="button" onClick={(event) => onAddPostClick(event, newPostContent)}>Add</button>
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

const mapDispatchToProps = (dispatch) => ({
    onAddPostClick: (event, postContent) => {
        console.log(`onAddPostClick postContent=${postContent}`);
        dispatch(addPost({
            id: +(new Date()),
            content: postContent,
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withServicesContext(App)
);
