import React from 'react';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [
                { id: 1, content: 'First post' },
            ],
            newPostContent: '',
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onAddPostClick = (event) => {
        const { posts, newPostContent } = this.state;
        this.setState({
            newPostContent: '',
            posts: [...posts, { id: posts.length + 1, content: newPostContent }],
        });
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
}

export default App;
