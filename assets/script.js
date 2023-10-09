var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");
//--------------------
var searchHistoryTable = document.querySelector("#search-history-table");
var displayCurrentForcast = document.querySelector('#display-current-forcast');
//var displayFiveDayForcast = document.querySelector('ul');

//------------------------
function handleCitySearch(){
    console.log("clicked");
    var userInput = cityInput.value.trim();
requestCoord(userInput);

}

// coords endpoint for city search
function requestCoord(cityInput){
   var cityCoords = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit=1&appid=${apiKey}`
   //---------------------- 
   fetch(cityCoords)
   .then(function (response) {
        console.log("fetchCords", response);
        return response.json();
   })
    .then(function (fetchedCoords){
    console.log("Fetched Coords", fetchedCoords);

    if(fetchedCoords.length > 0) {
        var latCity = fetchedCoords[0].lat.toFixed(0);
        var lonCity = fetchedCoords[0].lon.toFixed(0);
        requestWeather(latCity, lonCity);
        }
  
    for (var i = 0; i < fetchedCoords.length; i++) {
    console.log("-------------");  // log not needed
    console.log("City Name", fetchedCoords[0].name);
    console.log("City Coords lat", fetchedCoords[0].lat);/////
    console.log("City Coords Lon", fetchedCoords[0].lon);/////

    var cityName = document.createElement('h3');
    cityName.textContent = (cityInput);
    displayCurrentForcast.append(cityName);
    }
})
}
//-------------------------------------------
// weatherAPI endpoint 

function requestWeather(latCity, lonCity) {
    var cityWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latCity},&lon=${lonCity},&units=imperial&appid=${apiKey}`
    var cityForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latCity},&lon=${lonCity},&units=imperial&appid=${apiKey}`

//-----------------    
    fetch(cityWeather)
    .then(function (response){
        console.log("fecthWeather", response);
        return response.json();
    })
    .then(function (fecthedWeather){
        console.log("Fetched Weather \n --------------")
        console.log(fecthedWeather);
        for (var i = 0; i < fecthedWeather.length; i++){
         //console.log(fecthedWeather[i])//all
         console.log(fecthedWeather[0].list.dt_text)//date
         console.log(fecthedWeather[0].list.weather.icon)
         console.log(fecthedWeather[0].list.wind.speed)
         console.log(fecthedWeather[0].list.main.humidity)
        }
    })

    fetch(cityForecast)
    .then(function (response){
        console.log("fecthForecast", response);
        return response.json();
    })
    .then(function (fecthedForecast){
        console.log("Fetched Forecast \n --------------")
        console.log(fecthedForecast);
        for (var i = 0; i < fecthedForecast.length; i++){
         //console.log(fecthedWeather[i])//all
         console.log(fecthedForecast[0].list.dt_text)//date
         console.log(fecthedForecast[0].list.weather.icon)
         console.log(fecthedForecast[0].list.wind.speed)
         console.log(fecthedForecast[0].list.main.humidity)
        }
    })
};
    





//--------added div classes and id's for

// var forcastCards = $("#forcast-card");
// var forcastDay = [1, 2, 3, 4, 5];




btnSearch.addEventListener("click", handleCitySearch);