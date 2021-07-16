var WEATHER_API_KEY = "f16dc1b2fb18e2b0f1b156400f1a084d";

var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=city&daily.temp&daily.wind_speed&daily.humidity&daily.uvi&appid=f16dc1b2fb18e2b0f1b156400f1a084d';
var cityInput = document.querySelector('#city-name');
var searchButton = document.querySelector('#search-button');
var currentDayCard = document.querySelector('#cd-content');
var previousSearches = document.querySelector('.searchedCitiesContainer');

// function that pulls weather api data
function getApi() {

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);   
    })
};

function cityInputs() {
  cityInput.addEventListener('input')
}

function getLatestSearches() {
  var searchHistory = JSON.parse(localStorage.getItem("searches"));

  if (!searchHistory) {
    searchHistory = ["Charlotte", "Chicago", "Los Angeles"];
    localStorage.setItem("searches", JSON.stringify(searchHistory));
    return searchHistory;
  } else {
      return searchHistory;
  }
};

// make button elements using the latest searches
function displayLatestSearches() {

  var searchHistory = getLatestSearches(); 

  searchHistory.forEach(searchString => {
    
    var recentSearchButtonEl = document.createElement("button");
    recentSearchButtonEl.classList.add("previousSearchButton");
    recentSearchButtonEl.textContent = searchString;

    previousSearches.append(recentSearchButtonEl);
  })
}

function loadSearchedCitys() {
    return;
};


function searchHandler() {

  searchButton.addEventListener("click", getApi);


};


function init() {

    loadSearchedCitys();

    displayLatestSearches();

    searchHandler();

};

init();