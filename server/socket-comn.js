function connection(socket) {
    console.log((new Date()) + ' connection accepted');
    socket.on('message', onMessage);
    socket.on('close', onClose);
};

function onMessage() {

}

function onClose() {

}

function send(wss, data) {
    wss.clients.forEach((client) => {
        console.log('send: ' + data);
        client.send(data);
    });
}

module.exports = {
    connection: connection,
    send: send
};
