const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "e00020a6a5b25e912e41a3e4d63137c6";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=" + apiKey;
  https.get(url, function(response) {


    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      // console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + ".png";
      const feelsLike = weatherData.main.feels_like;
      const minTemp = weatherData.main.temp_min;
      const maxTemp = weatherData.main.temp_max;
      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const cloudiness = weatherData.clouds.all;

      res.write("<p>The temperature in "+query+" is "+temp+"   | "+minTemp+" to "+maxTemp+".</p>");
      res.write('<img src=' + imageURL+">");
      res.write("<p>Feels like "+feelsLike+".</p>");
      res.write(weatherDescription);
      res.write("<p>Pressure: "+pressure+"hPa</p>");
      res.write("<p>Humidity: "+humidity+"%</p>");
      res.write("<p>Wind Speed: "+windSpeed+"m/s</p>");
      res.write("<p>Cloudiness: "+cloudiness+"%</p>");

      res.send();

    })
  })
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.")
})
