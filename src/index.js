import mqtt from "mqtt";
let temp = 21;
const client = mqtt.connect("wss://m2.wqtt.ru", {
  port: 5038,
  username: "test",
  password: "test",
});

document.getElementById("current-temp").innerHTML = temp;

function reconnect() {
  if (!client.connected) {
    console.log(`Reconnecting..., ${client.connected}`);
    client.reconnect();
  }
}
setInterval(reconnect, 1000);

// function readMessage() {
//   client.on("message", function (topic, message) {
//     console.log(message.toString(), topic.toString());
//   });
// }
// readMessage();

function btnHandler(topic, arg) {
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish(topic, arg);
    }
  });
}

document.getElementById("cond-on").addEventListener("click", () => {
  btnHandler("rc117/cond", "on");
});

document.getElementById("cond-off").addEventListener("click", () => {
  btnHandler("rc117/cond", "off");
});

// document.getElementById("cond-temp-minus").addEventListener("click", () => {
//   if (temp > 16) {
//     temp--;
//   }
//   btnHandler("rc117/cond/temp", temp.toString());
//   document.getElementById("current-temp").innerHTML = temp;
// });

// document.getElementById("cond-temp-plus").addEventListener("click", () => {
//   if (temp < 30) {
//     temp++;
//   }
//   btnHandler("rc117/cond/temp", temp.toString());
//   document.getElementById("current-temp").innerHTML = temp;
// });
// rc117/cond/temp      16
