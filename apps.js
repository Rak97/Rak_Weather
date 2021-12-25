   function displayForecast() {

        let forecastElement = document.querySelector("#forecast"); 

        let forecastHTML = `<div class="row">`;
        let days = ["Fri.", "Sat.", "Sun.", "Mon.", "Tues.", "Wed."]; 
        days.forEach(function(day){
          
          forecastHTML = 
           forecastHTML + `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
              <img src="https://openweathermap.org/img/wn/03d.png" alt="" width="50">
        <span class="weather-forecast-temp-max">20°</span><span class="weather-forecast-temp-min"> 2°</span>
        </div>`;
        }) 

        forecastHTML = forecastHTML + `</div>`
        forecastElement.innerHTML = forecastHTML;

     } 

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

        //Date 

        let currentDate = new Date();
        let date = document.querySelector("#date");
        let weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        date.innerHTML = `${weekdays[currentDate.getDay()]} ${months[currentDate.getUTCMonth()]
          } ${currentDate.getDate()}`;

      };
      //Time
      var dt = new Date();
      document.getElementById("time").innerHTML = (("0" + dt.getHours()).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2));

      const hour = new Date().getHours();
      let greeting;

      if (hour < 12) {
        greeting = "AM";
      } else {
        greeting = "PM";
      }

      document.getElementById("format").innerHTML = greeting;

      //Searching for any city in the world 

      function search(city) {
        let apiKey = "4603cd08f9aa4435f5a1a0fde738051c";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemperature);
      }

      function handleSubmit(event) {
        event.preventDefault();
        let cityInputElement = document.querySelector("#search-bar");
        search(cityInputElement.value);
      }

      let form = document.querySelector("#search-form");
      form.addEventListener("submit", handleSubmit);

      // How to build a current geolive Location button

      function retrievePosition(position) {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let units = "metric";
          let apiKey = "4603cd08f9aa4435f5a1a0fde738051c";
          let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
          let apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
          axios.get(apiUrl).then(displayTemperature);
        }


      function handleGeo() {
          navigator.geolocation.getCurrentPosition(retrievePosition); //Seek permission from user
        }

      let searchGeo = document.querySelector("#liveLocate");
      searchGeo.addEventListener("click", handleGeo);

      // Displaying Forecast 
        displayForecast();

      // Display City 
        search("Yellowknife");