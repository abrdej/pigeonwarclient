var client = {};

client.connect = function (port) {
    this.ws = new WebSocket('ws://localhost:' + port + '/');

    this.ws.onmessage = function incoming(msg) {
        json_data = JSON.parse(msg.data);
        console.log(json_data);
        msg_queue.push(json_data);
    };
};

client.send = function (msg) {
    this.ws.send(msg);
};
