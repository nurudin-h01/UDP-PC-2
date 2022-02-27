// import dependencies
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const axios = require("axios").default;
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:5000");
var topic = "testtopic";

// set HOST and PORT
const HOST = "0.0.0.0";
const PORT = 30000;
var data2;

server.on("message", (msg, rinfo) => {
	// Send to REST API
	const data = { data: `${JSON.parse(msg).data1}` };
	console.log(`${JSON.parse(msg).data1}`);
	axios.post("http://localhost:3000/", data);

	// Send to MQTT
	const obj = JSON.parse(msg);
	data2 = obj.data2;
	let data2str = data2.toString();
	if (client.publish(topic, data2str, options)) {
		console.log(`published ${data2str}`);
	}
});

// server bind
server.bind({
	address: HOST,
	port: PORT,
	exclusive: true,
});

// set options
var options = {
	retain: true,
	qos: 1,
};
