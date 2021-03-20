import React from 'react';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            newPostContent: '',
        };
    }

    render() {
        const { posts, newPostContent } = this.state;

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

                <button type="button" onClick={this.onAddPostClick}>Add</button>
            </div>
        );
    }

    async componentDidMount() {
        const { postsService } = this.props;
        const posts = await postsService.listPosts();
        this.setState({
            posts,
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onAddPostClick = async (event) => {
        const { postsService } = this.props;
        const { posts, newPostContent } = this.state;
        const newPost = await postsService.createPost({ content: newPostContent });

        this.setState({
            newPostContent: '',
            posts: [...posts, newPost],
        });
    }
}

export default App;
