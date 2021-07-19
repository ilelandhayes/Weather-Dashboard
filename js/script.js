const WEATHER_API_KEY = "f16dc1b2fb18e2b0f1b156400f1a084d";


// function that pulls weather api data
async function pullData(city) {

  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`;
  
    var outCome = await fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        return data;
      })

      var latLong = {
        latitude: outCome.coord.lat,
        longitude: outCome.coord.lon
      }

      var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${WEATHER_API_KEY}`;

      var oneCall = await fetch(oneCallURL)
          .then(response => response.json())
          .then(data => {
              return data;
          })

          var date = new Date(oneCall.dt * 1000);

          var dateString = `(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;
      
          $(`.cd-content`).text(`${outCome.name} ${dateString}`);
      
          return oneCall;
}

async function provideWeather(cityName) {

  clearCards();

  // Get forecast data from API call
  var forecast = await pullData(cityName);

  // Render today's information to the main card
  $(`#temperature`).text(`Temp: ${forecast.current.temp} F`);
  $(`#wind`).text(`Wind: ${forecast.current.wind_speed} MPH`);
  $(`#humidity`).text(`Humidity: ${forecast.current.humidity} %`);
  $(`#UVIndex`).text(`UV Index: ${forecast.current.uvi}`);

  setUVIndexColor(forecast.current.uvi);

  console.log(forecast);
} 

function getLatestSearches() {

  var searchHistory = JSON.parse(localStorage.getItem("searches"));

  if (searchHistory) {
    searchHistory = ["Los Angeles"];
    localStorage.setItem("searches", JSON.stringify(searchHistory));
    return searchHistory;
  } else {
      return searchHistory;
  }
}

// make button elements using the latest searches
function displayLatestSearches() {

  // grabs recent searches
  var searchHistory = getLatestSearches();
  
  // clears container content
  

  for (var i = 0; i < 10; i++) {
    
    if (searchHistory[i]) {
    
      // creating buttons withh recent searches
      var recentSearchButtonEl = document.createElement("button");
      recentSearchButtonEl.classList.add("previousSearchButton");
      recentSearchButtonEl.textContent = searchHistory[i];

      recentSearchButtonEl.addEventListener("click", pullData)

      $('#previousSearches').append(recentSearchButtonEl);
  
    }
  }
}

function loadSearchedCitys() {
    
  var latestTerms = getLatestSearches()

  var recentlySearched = latestTerms;

  // showWeather(recentlySearched);
}

// function to clear the cards
function clearCards() {

  for (var i = 0; i < 5; i++) {
    $('#card').text("");
  }
}

// function to save each search
function saveSearchTerm(searchTerm) {

  var prevTerms = JSON.parse(localStorage.getItem("searches"));

  prevTerms.unshift(searchTerm);

  localStorage.setItem("searches", JSON.stringify(prevTerms));
}

function loadRecentCitySearch () {

  var recentTerms = getLatestSearches()

  var recentSearch = recentTerms[0];

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