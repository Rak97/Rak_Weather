function displayTemperature(response) {
        let descripitionElement = document.querySelector("#descripition");
        let cityElement = document.querySelector("#city");
        let temperatureElement = document.querySelector("#temperature");
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind");
        let iconElement = document.querySelector("#icon");

        celciusTemperature = response.data.main.temp; 

        document.getElementById("year").innerHTML = new Date().getFullYear(); //Year
        temperatureElement.innerHTML = Math.round(celciusTemperature); //conversion
        cityElement.innerHTML = response.data.name;
        descripitionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = Math.round(response.data.wind.speed);
        iconElement.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );