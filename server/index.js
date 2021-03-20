'use strict';

const Hapi = require('@hapi/hapi');


let posts = [
    { id: 1, content: 'First post' },
    { id: 2, content: 'Second post' },
    { id: 3, content: 'Third post' },
];

function generateId() {
    if (!posts.length) {
        return 1;
    }
    return Math.max(...posts.map(post => post.id)) + 1;
}

const init = async () => {

    const server = Hapi.server({
        port: 3010,
        host: 'localhost',
        routes: {
            cors: true,
        }
    });

    server.route({
        method: 'GET',
        path: '/posts/',
        handler: (request, h) => {
            return posts;
        }
    });

    server.route({
        method: 'POST',
        path: '/posts/',
        handler: (request, h) => {
            const { content } = request.payload;
            const newPost = {
                id: generateId(),
                content,
            }
            posts.push(newPost);
            return newPost;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();