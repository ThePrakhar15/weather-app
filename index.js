
    const apiKey = "";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");


    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
 
        

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
        else {
            var data = await response.json();
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;

            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";

            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            } else {
                weatherIcon.src = "images/weather.png";
            }


            // AQI Placeholder

            const lat = data.coord.lat;
            const lon = data.coord.lon;

           const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;


            const aqiresponse = await fetch (aqiUrl);

            const aqiData = await aqiresponse.json();
            const aqi = aqiData.list[0].main.aqi;

            const aqiText = ["Good " , "Fair", "Moderate", "Poor", "Very Poor"];

            document.querySelector(".aqi").innerHTML = aqiText[aqi - 1];
            

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);

    });





