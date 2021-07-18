const WEATHER_API_KEY = "f16dc1b2fb18e2b0f1b156400f1a084d";

var cityInput = document.querySelector('#city-name');
var searchButton = document.querySelector('#search-button');
var currentDayCard = document.querySelector('#cd-content');
var previousSearches = document.querySelector('.searchedCitiesContainer');

// function that pulls weather api data
function pullData(city) {

  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`;
  
    var outCome = fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        return data;
      })

      var latLong = {
        latitude: outCome.coord.lat,
        longitude: outCome.cord.lon
      }

      var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${WEATHER_API_KEY}`

      var oneCall = fetch(oneCallURL)
          .then(response => response.json())
          .then(data => {
              return data;
          })

          var date = new Date(oneCall.current.dt * 1000);

          var dateString = `(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;
      
          cityInput.textContent(outCome.name, dateString);
      
          return oneCall;
}

function loadRecentCitySearch () {

    var recentTerms = getLatestSearches()

    var recentSearch = recentTerms[0];


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
  

  for (var i = 0; i < 8; i++) {
    
    if (searchHistory[i]) {
    
      // creating buttons withh recent searches
      var recentSearchButtonEl = document.createElement("button");
      recentSearchButtonEl.classList.add("previousSearchButton");
      recentSearchButtonEl.textContent = searchHistory[i];

      recentSearchButtonEl.addEventListener("click", pullData)

      previousSearches.append(recentSearchButtonEl);
  
    }
  }
}

function loadSearchedCitys() {
    return;
}


function searchHandler() {

  searchButton.addEventListener("click", pullData);

}


function init() {

    loadSearchedCitys();

    displayLatestSearches();

    searchHandler();

}

init();