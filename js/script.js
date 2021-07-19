const WEATHER_API_KEY = "f16dc1b2fb18e2b0f1b156400f1a084d";


// function that pulls weather api data
async function pullData(city) {

  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=imperial`;
  
    var outCome = await fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        return data;
      })

      var latLong = {
        latitude: outCome.coord.lat,
        longitude: outCome.coord.lon
      }

      var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${WEATHER_API_KEY}&units=imperial`;

      var oneCall = await fetch(oneCallURL)
          .then(response => response.json())
          .then(data => {
              return data;
          })

          var date = new Date(oneCall.current.dt * 1000);

          var dateString = `(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;
      
          $(`.cd-date`).text(`${outCome.name} ${dateString}`);
      
          return oneCall;
}

async function provideWeather(cityName) {


  // Get forecast data from API call
  var forecast = await pullData(cityName);

  // Render today's information to the main card
  $(`#tempature`).text(`Temp: ${forecast.current.temp} F`);
  $(`#wind`).text(`Wind: ${forecast.current.wind_speed} MPH`);
  $(`#humidity`).text(`Humidity: ${forecast.current.humidity} %`);
  $(`#UVIndex`).text(`UV Index: ${forecast.current.uvi}`);

  UVIndexColor(forecast.current.uvi);

  console.log(forecast);

  for (var i = 0; i < 5; i++) {

    var futureWeatherDate = $(`#card${i + 1}`)

    var date = new Date(forecast.daily[i + 1].dt * 1000);
    var dateString = $(`<h4/>`).text(`(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`);

    var tempEl = $(`<p/>`).text(`Temp: ${forecast.daily[i + 1].temp.day} F`)
    tempEl.addClass("pTemp")

    var windEl = $(`<p/>`).text(`Wind: ${forecast.daily[i + 1].wind_speed} MPH`)
    windEl.addClass("pWind")

    var humidityEl = $(`<p/>`).text(`Humidity: ${forecast.daily[i + 1].humidity} %`)
    humidityEl.addClass("pHumidity")

    futureWeatherDate.append(dateString);
    futureWeatherDate.append(tempEl);
    futureWeatherDate.append(windEl);
    futureWeatherDate.append(humidityEl);
  }
  displayLatestSearches();
}

function UVIndexColor(UVIndex) {
  
  $(`#UVIndex`).removeClass();
  $(`#UVIndex`).addClass("p-1 border rounded rounded-4");

  if (UVIndex < 3) {
      $(`#UVIndex`).addClass("bg-success");
  } else if (UVIndex >= 3 || UVIndex < 7) {
      $(`#UVIndex`).addClass("bg-warning")
  } else {
      $(`#UVIndex`).addClass("bg-failure")
  }

}

// function that saves recent city searches
function getLatestSearches() {

  var searchHistory = JSON.parse(localStorage.getItem("searches"));

  if (!searchHistory) {
    searchHistory = ["Los Angeles"];
    localStorage.setItem("searches", JSON.stringify(searchHistory));
    return searchHistory;
  } else {
      return searchHistory;
  }
}

// make button elements using the latest searches
function displayLatestSearches() {

    // clears container content
    $(`.searchedCitiesContainer`).text("");

  // grabs recent searches
  var searchHistory = getLatestSearches();

  for (var i = 0; i < 8; i++) {
    
    if (searchHistory[i]) {
    
      // creating buttons withh recent searches
      recentSearchButtonEl = $("<button></button>").text(searchHistory[i]);
      recentSearchButtonEl.addClass("previousSearchButton");
      recentSearchButtonEl.attr("id", searchHistory[i])

      recentSearchButtonEl.on("click", (event) => {
        saveSearchTerm(event.target.id);
        provideWeather(event.target.id);
    })

      $('.searchedCitiesContainer').append(recentSearchButtonEl);
  
    }
  }
}

// pull weather for last city searched
function loadSearchedCitys() {
    
  var latestTerms = getLatestSearches()

  var recentlySearched = latestTerms[0];

  provideWeather(recentlySearched);
}

// function to clear the cards
function clearCards() {

  for (var i = 0; i < 5; i++) {
    $(`#card${i + 1}`).text("");
  }
}

// function to save each search
function saveSearchTerm(searchTerm) {

  var prevTerms = JSON.parse(localStorage.getItem("searches"));

  prevTerms.unshift(searchTerm);

  localStorage.setItem("searches", JSON.stringify(prevTerms));
}

// adding event listener to button
function searchHandler() {

  $('#search-button').on("click", () => {
    saveSearchTerm($('#city-name').val());
    provideWeather($('#city-name').val());
  })

}

function init() {

    loadSearchedCitys();

    displayLatestSearches();

    searchHandler();

}

init();