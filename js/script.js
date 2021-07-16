var searchButton = document.getElementById('search-button');
var currentDayCard = document.getElementById('cd-content');

function getApi() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?unit=metric&lat={lat}&lon={lon}&current&current.temp&current.humidity&current.uvi&current.wind_speed&current.weather.icon&appid=f16dc1b2fb18e2b0f1b156400f1a084d';

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            currentDayCard.textContent
        }
    })
  }
searchButton.addEventListener('click', getApi);