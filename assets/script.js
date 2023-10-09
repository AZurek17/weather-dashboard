var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");
//-------------------- current day weather
var searchHistoryTable = document.querySelector("#search-history-table");
var displayCurrentDay = document.querySelector('#display-current-forcast');
var currentDay = document.querySelector("#current-date");
var currentTemp = document.querySelector("#curret-temp")
var currentWind = document.querySelector("#current-wind")
var currentHumidity = document.querySelector("#current-humidity")

//--------------------forecast weather

// var displayForecast = document.querySelector('#container-day1');
// var forecastDay = document.querySelector("#current-date");
// var forecastTemp = document.querySelector("#curret-temp")
// var forecastWind = document.querySelector("#current-wind")
// var forecastHumidity = document.querySelector("#forecast-humidity")

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

    var cityName = document.createElement('h2');
    cityName.textContent = (cityInput);
    searchHistoryTable.append(cityName);
    
    //localStorage.setitem("cityName", cityInput);

    
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
        console.log("Today's Weather", fecthedWeather);
        console.log("Fetched Weather \n --------------")

        if(fecthedWeather.length > 0) {
        //for (var i = 0; i < fecthedWeather.length; i++){
        //console.log(fecthedWeather[1])//all
        console.log(fecthedWeather.dt_text)//date
        console.log(fecthedWeather.weather[0].icon)
        console.log(fecthedWeather.main.temp)
        console.log(fecthedWeather.wind.speed)
        console.log(fecthedWeather.main.humidity)

        //--------added div classes and id's for weather
        var dayDate = document.createElement('h3');
        dayDate.textContent = (fecthedWeather.dt_text);
        displayCurrentDay.append("" + dayDate + "");

        var dayTemp = document.createElement ('p');
        dayTemp.textContent = (fecthedWeather.main.temp);
        currentTemp.append("Temp: " + dayTemp + " .");

        var dayWind = document.createElement ('p');
        dayWind.textContent = (fecthedWeather.wind.speed);
        currentWind.append("Wind: " + dayWind + " .");

        var dayHumidity = document.createElement ('p');
        dayHumidity.textContent = (fecthedWeather.main.humidity);
        currentHumidity.append("Humidity: " + dayWind + " .");
         

         

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
    



//------------button eventListners
btnSearch.addEventListener("click", handleCitySearch);