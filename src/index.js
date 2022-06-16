import mqtt from "mqtt";
let temp = 21;
let apiKey = "6b317bcc6c29e4ccd08c628f5c9b8792";
let lat = 53.9;
let lon = 27.5667;
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const condTopic = "rc117/cond";
const tvTopic = "rc117/tv";
const condTempTopic = "rc117/cond/temp";
const garageTemp = "garage/temp";
const client = mqtt.connect("wss://m2.wqtt.ru", {
  port: 5038,
  username: "test",
  password: "test",
});

document.getElementById("inside-temp").innerHTML = "Loading...";
document.getElementById("outside-temp").innerHTML = "Loading...";
document.getElementById("current-temp").innerHTML = temp;

async function getWeather() {
  const response = await fetch(url);
  return await response.json();
}
setInterval(
  getWeather().then(
    (data) =>
      (document.getElementById("outside-temp").innerHTML = `${Math.floor(
        data.main.temp - 273.15
      )}°C`)
  ),
  60000
);

function reconnect() {
  if (!client.connected) {
    console.log(`Reconnecting..., ${client.connected}`);
    alert("Please, wait...");
    client.reconnect();
  }
}
setInterval(reconnect, 1000);

function connect() {
  client.on("connect", function () {
    client.subscribe(garageTemp, function (err) {
      if (err) console.log(err);
    });
  });
}
connect();

function updateTemp() {
  client.on("message", function (topic, message) {
    if (topic == garageTemp)
      document.getElementById(
        "inside-temp"
      ).innerHTML = `${message.toString()}°C`;
  });
}
updateTemp();

function btnHandler(topic, arg) {
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish(topic, arg);
    }
  });
}

document.getElementById("cond-on").addEventListener("click", () => {
  btnHandler(condTopic, "on");
});

document.getElementById("cond-off").addEventListener("click", () => {
  btnHandler(condTopic, "off");
});

document.getElementById("cond-temp-minus").addEventListener("click", () => {
  if (temp > 16) {
    temp--;
  }
  btnHandler(condTempTopic, temp.toString());
  document.getElementById("current-temp").innerHTML = temp;
});

document.getElementById("cond-temp-plus").addEventListener("click", () => {
  if (temp < 30) {
    temp++;
  }
  btnHandler(condTempTopic, temp.toString());
  document.getElementById("current-temp").innerHTML = temp;
});
// // режим охлаждения
// document.getElementById("mode-cooling").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // режим подогрева
// document.getElementById("mode-heating").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // режим вентилятор
// document.getElementById("mode-ventilator").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // режим авто
// document.getElementById("mode-auto").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // скорость 1
// document.getElementById("first-speed").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // скорость 2
// document.getElementById("second-speed").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // скорость 3
// document.getElementById("thirt-speed").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
// // скорость авто
// document.getElementById("auto-speed").addEventListener("click", () => {
//   btnHandler(condTopic, "on");
// });
