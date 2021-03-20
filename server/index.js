'use strict';

const Hapi = require('@hapi/hapi');


let posts = [
    { id: 1, content: 'First post' },
    { id: 2, content: 'Second post' },
    { id: 3, content: 'Third post' },
];

const init = async () => {

    const server = Hapi.server({
        port: 3010,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/posts/',
        handler: (request, h) => {
            return posts;
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