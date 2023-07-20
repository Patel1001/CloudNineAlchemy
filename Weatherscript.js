let weather = {
    apiKey: "8ef4657f892bb95ee93addfb47ee54ae",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => this.displayErrorMessage(error));
    },
  
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, feels_like, humidity } = data.main;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".temp").innerText = temp + "° C";
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".feelsLike").innerText =
        "Feels Like: " + feels_like + "° C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
  
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
        
      document.querySelector(".error-message").style.display = "none";
    },
  
    displayErrorMessage: function (error) {
      document.querySelector(".error-message").innerText = error.message;
      document.querySelector(".error-message").style.display = "block";
      
      document.querySelector(".city").innerText = "Please enter a valid City";
      document.querySelector(".temp").innerText = "";
      document.querySelector(".icon").src = "";
      document.querySelector(".description").innerText = "";
      document.querySelector(".feelsLike").innerText = "";
      document.querySelector(".humidity").innerText = "";
  
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "";
    },
  
    search: function () {
      this.fetchWeather(document.querySelector(".searchBar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".searchBar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  
  
