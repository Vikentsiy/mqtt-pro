import _ from "lodash";
import mqtt from "mqtt";

const client = mqtt.connect("mqtt://m2.wqtt.ru", {
  port: 5031,
  username: "test",
  password: "test",
});

// client.on("connect", function () {
//   console.log("Connected");
//   console.log(client.connected);
// client.subscribe("rc117/tv", function (err) {
//   if (!err) {
//     client.publish("rc117/tv", "0");
//   }
// });
// client.subscribe("rc117/cond", function (err) {
//   if (!err) {
//     client.publish("rc117/cond", "off");
//   }
// });
//   client.subscribe("tvon", function (err) {
//     if (!err) {
//       client.publish("rc/test", "ABOBA");
//     }
//   });
// });

// client.on("message", function (topic, message) {
//   console.log(message.toString(), topic.toString());
// });
