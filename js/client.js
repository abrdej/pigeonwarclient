var client = {};

client.connect = function () {
    this.ws = new WebSocket('ws://localhost:8080/');

    this.ws.onopen = function open() {
        console.log("test");
    };

    this.ws.onmessage = function incoming(msg) {
        json_data = JSON.parse(msg.data);
        console.log(json_data);

        msg_queue.push(json_data);
    }
};

client.send = function (msg) {
    this.ws.send(msg);
};