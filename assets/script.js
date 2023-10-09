var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");
//-------------------- current day weather
var searchHistoryTable = document.querySelector("#search-history-table");
var displayCurrentDay = document.querySelector('#display-current-forecast');
//--------------------forecast weather
var displayForecastOne = document.querySelector('#forecast-one');
var displayForecastTwo = document.querySelector('#forecast-two');
var displayForecastThree = document.querySelector('#forecast-three');
var displayForecastFour = document.querySelector('#forecast-four');
var displayForecastFive = document.querySelector('#forecast-five');
//------------------------
function handleCitySearch(){
    console.log("clicked");
    var userInput = cityInput.value.trim();
requestCoord(userInput);
}
//-------------------------
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
        requestForcast(latCity, lonCity);
        }
  
    for (var i = 0; i < fetchedCoords.length; i++) {
    console.log("-------------");  // log not needed
    console.log("City Name", fetchedCoords[0].name);
    console.log("City Coords lat", fetchedCoords[0].lat);/////
    console.log("City Coords Lon", fetchedCoords[0].lon);/////

    var cityName = document.createElement('h2');
    cityName.textContent = (cityInput);
    searchHistoryTable.append(cityName);
    
    }
})
}
//-------------------------------------------
// weatherAPI endpoint 
function requestWeather(latCity, lonCity) {
    var cityWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latCity},&lon=${lonCity},&units=imperial&appid=${apiKey}`

 //-----------------    
    fetch(cityWeather)
    .then(function (response){
        console.log("fecthWeather", response);
        return response.json();
        
    })
    .then(function (fecthedWeather){
        console.log("Fetched Today's Weather", fecthedWeather);
        console.log("-------------");  // log not needed
       //for (var i = 0; i < fecthedWeather.length; i++){
            console.log("date", fecthedWeather.dt);//date
            console.log("icon", fecthedWeather.weather[0].icon);
            console.log("temp", fecthedWeather.main.temp);
            console.log("wind", fecthedWeather.wind.speed);
            console.log("humidity", fecthedWeather.main.humidity);
            
            var cityDay = document.createElement('h3');
            cityDay.textContent = ((fecthedWeather.dt));
            displayCurrentDay.appendChild(cityDay);
            // var cityIcon = document.createElement('i');
            // cityIcon.textContent = (""(fecthedWeather.weather.icon))
            var cityTemp = document.createElement('p');
            cityTemp.textContent = ("Temp: " + (fecthedWeather.main.temp) + "F");
            displayCurrentDay.appendChild(cityTemp);
            var cityWind = document.createElement('p');
            cityWind.textContent = ("Wind: " + (fecthedWeather.wind.speed) + " MPH");
            displayCurrentDay.appendChild(cityWind);
            var cityHumidity = document.createElement('p');
            cityHumidity.textContent =("Humidity: " + (fecthedWeather.main.humidity) + " %");
            displayCurrentDay.appendChild(cityHumidity);
            //};
        })    
    }

// forecast API endpoint 
function requestForcast(latCity, lonCity) {
    var cityForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latCity},&lon=${lonCity},&units=imperial&appid=${apiKey}`
     //-----------------    

    fetch(cityForecast)
    .then(function (response){
        console.log("fecthForecast", response);
        return response.json();
    })
    .then(function (fecthedForecast){
        console.log("Fetched 5 day Forecast \n --------------")
        console.log(fecthedForecast);
        // for (var i = 0; i < fecthedForecast.length; i++){
         //console.log(fecthedWeather[i])//all
         console.log("date", fecthedForecast.list[0].dt_txt);//date
         console.log("icon", fecthedForecast.list[0].weather[0].icon);
         console.log("temp", fecthedForecast.list[0].main.temp);
         console.log("speed", fecthedForecast.list[0].wind.speed);
         console.log("humidity", fecthedForecast.list[0].main.humidity);
//forecast one:
            var forecastDate = document.createElement('p');
            forecastDate.textContent = ((fecthedForecast.list[0].dt_txt));
            displayForecastOne.appendChild(forecastDate);
            var forecastTemp = document.createElement('p');
            forecastTemp.textContent = ("Temp: " + (fecthedForecast.list[0].main.temp) + "F");
            displayForecastOne.appendChild(forecastTemp);
            var forecastWind = document.createElement('p');
            forecastWind.textContent = ("Wind: " + (fecthedForecast.list[0].wind.speed) + " MPH");
            displayForecastOne.appendChild(forecastWind);
            var forecastHumidity = document.createElement('p');
            forecastHumidity.textContent = ("Humidity: " + (fecthedForecast.list[0].main.humidity) + " %");
            displayForecastOne.appendChild(forecastHumidity);
//forecast two:
            var forecastDate = document.createElement('p');
            forecastDate.textContent = ((fecthedForecast.list[1].dt_txt));
            displayForecastTwo.appendChild(forecastDate);
            var forecastTemp = document.createElement('p');
            forecastTemp.textContent = ("Temp: " + (fecthedForecast.list[1].main.temp) + "F");
            displayForecastTwo.appendChild(forecastTemp);
            var forecastWind = document.createElement('p');
            forecastWind.textContent = ("Wind: " + (fecthedForecast.list[1].wind.speed) + " MPH");
            displayForecastTwo.appendChild(forecastWind);
            var forecastHumidity = document.createElement('p');
            forecastHumidity.textContent = ("Humidity: " + (fecthedForecast.list[1].main.humidity) + " %");
            displayForecastTwo.appendChild(forecastHumidity);
//forecast three:
            var forecastDate = document.createElement('p');
            forecastDate.textContent = ((fecthedForecast.list[2].dt_txt));
            displayForecastThree.appendChild(forecastDate);
            var forecastTemp = document.createElement('p');
            forecastTemp.textContent = ("Temp: " + (fecthedForecast.list[2].main.temp) + "F");
            displayForecastThree.appendChild(forecastTemp);
            var forecastWind = document.createElement('p');
            forecastWind.textContent = ("Wind: " + (fecthedForecast.list[2].wind.speed) + " MPH");
            displayForecastThree.appendChild(forecastWind);
            var forecastHumidity = document.createElement('p');
            forecastHumidity.textContent = ("Humidity: " + (fecthedForecast.list[2].main.humidity) + " %");
            displayForecastThree.appendChild(forecastHumidity);
//forecast four:
            var forecastDate = document.createElement('p');
            forecastDate.textContent = ((fecthedForecast.list[3].dt_txt));
            displayForecastFour.appendChild(forecastDate);
            var forecastTemp = document.createElement('p');
            forecastTemp.textContent = ("Temp: " + (fecthedForecast.list[3].main.temp) + "F");
            displayForecastFour.appendChild(forecastTemp);
            var forecastWind = document.createElement('p');
            forecastWind.textContent = ("Wind: " + (fecthedForecast.list[3].wind.speed) + " MPH");
            displayForecastFour.appendChild(forecastWind);
            var forecastHumidity = document.createElement('p');
            forecastHumidity.textContent = ("Humidity: " + (fecthedForecast.list[3].main.humidity) + " %");
            displayForecastFour.appendChild(forecastHumidity);
//forecast five:
            var forecastDate = document.createElement('p');
            forecastDate.textContent = ((fecthedForecast.list[4].dt));
            displayForecastFive.appendChild(forecastDate);
            var forecastTemp = document.createElement('p');
            forecastTemp.textContent = ("Temp: " + (fecthedForecast.list[4].main.temp) + "F");
            displayForecastFive.appendChild(forecastTemp);
            var forecastWind = document.createElement('p');
            forecastWind.textContent = ("Wind: " + (fecthedForecast.list[4].wind.speed) + " MPH");
            displayForecastFive.appendChild(forecastWind);
            var forecastHumidity = document.createElement('p');
            forecastHumidity.textContent = ("Humidity: " + (fecthedForecast.list[4].main.humidity) + " %");
            displayForecastFive.appendChild(forecastHumidity);






        
        })
    }



//------------button eventListners
btnSearch.addEventListener("click", handleCitySearch);