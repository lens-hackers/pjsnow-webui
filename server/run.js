'use strict';

const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(8080, () => {
    process.send('server listening. port: 8080');
});
