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
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + ".png";

      res.write("<p>The weather is currently "+weatherDescription+".</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
      res.write('<img src=' + imageURL+">");
      res.send();

    })
  })
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.")
})
