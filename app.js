const expr = require("express");
const body = require("body-parser");
const app = expr();
const http = require("https");
app.use(body.urlencoded({ extended: true }));
//For homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//For posting on homepage 
app.post("/", function (req, res) {
  // variable for getting the city  name from the search box
  var cityn = req.body.cityName;
  //Weather api url
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityn +
    "&units=metric&appid=a10baaad2f7b9d726cf70d70c5cc243f";
  http.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var des = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      var iconimg = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The tempeature in " +
          cityn +
          " is " +
          temp +
          " degree Celsius.</h1>"
      );
      //Code for showing the temperature in the webpage
      res.write("<h8>And it is " + des + ".</h8>");
      res.write("<img src= " + iconimg + ">");
      res.send();
    });
  });
})
//Code for listening to port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
