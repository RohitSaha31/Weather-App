const express = require("express");
const bodyParser = require("body-parser");
const https=require("http")
const path=require("path");
const port= process.env.PORT || 4000;
const app = express();
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(express.static(path.join(__dirname, "./")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.post("/", (req, res)=> {
  const place = req.body.CityName;
  const url =`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=bc05c7746b3a2b4674e28b0949bfdfa9&units=metric`;

  https.get(url, function (resp) {
    resp.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weathertemp = weatherData.main.temp;
      const WeatherDescrip = weatherData.weather[0].description;
      const logo = weatherData.weather[0].icon;
      const logoUrl = "http://openweathermap.org/img/wn/" + logo + "@2x.png";

      res.write(
        "<h1>The weather of " +
          place +
          " is currently " +
          WeatherDescrip +
          "</h1>"
      );
      res.write(
        "<h1> The temp of " +
          place +
          " is " +
          weathertemp +
          " &deg C </h1>"
      );
      res.write("<img src = " + logoUrl + ">");
      res.send();
    });
  });
});




app.listen(port, function(err){ 
    if(err)console.log(err);
    console.log("server is running on port",port);
    })
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=bc05c7746b3a2b4674e28b0949bfdfa9

// https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=bc05c7746b3a2b4674e28b0949bfdfa9