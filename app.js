const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "e00020a6a5b25e912e41a3e4d63137c6";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;


  https.get(url, function(response) {

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      weatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
      // const icon = weatherData.weather[0].icon;
      // const imageURL = "http://openweathermap.org/img/wn/" + icon + ".png";
      const feelsLike = weatherData.main.feels_like;
      const minTemp = weatherData.main.temp_min;
      const maxTemp = weatherData.main.temp_max;
      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const cloudiness = weatherData.clouds.all;

      if (res.statusCode == 200) {
        res.render("result", {
          query: query,
          temp: temp,
          weatherDescription: weatherDescription,
          minTemp: minTemp,
          maxTemp: maxTemp,
          feelsLike: feelsLike,
          pressure: pressure,
          humidity: humidity,
          windSpeed: windSpeed,
          cloudiness: cloudiness

        });

      }

      // res.send();

    })
  })
})

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server is running on port 3000.")
})
