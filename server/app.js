'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ws = require('websocket.io');
const socketComn = require('./socket-comn');
const app = express();
const router = express.Router();

const wss = ws.listen(8888, () => {
     console.log("start port ws://host:8888");
});
wss.on('connection', socketComn.connection);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/js', express.static('build'));
app.use('/', express.static('client'));
app.use('/', router);

router.get('/hello', (req, res) => {
    res.end('hello');
});

router.post('/api/face', (req, res) => {
    socketComn.send(wss, req.body);
    res.end();
});

module.exports = app;