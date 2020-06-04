const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {
    const query = req.body.cityData;
    const apiKey = "9a3b884367dbd35b9cab58b19d02da35";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const tempurature = weatherData.main.temp;
            res.send(`<h2> The Tempurature in ${query} is ${Math.round(tempurature)} degrees fahrenheit </h2>`)
            // https://api.openweathermap.org/data/2.5/weather?q=Akron&appid=9a3b884367dbd35b9cab58b19d02da35&units=imperial
        })
    }); 
});


app.listen(port, console.log(`The server is listening on port ${port}.`));