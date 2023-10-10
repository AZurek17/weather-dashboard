var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");

//-------------------- current day
var displayDate = document.querySelector("#display-date") 
var displayDateOne = document.querySelector("#display-date-pne")
//-------------------- current day weather
var searchHistoryTable = document.querySelector("#search-history-table");
var displayCurrentDay = document.querySelector('#display-current-forecast');
//--------------------forecast weather
var displayForecastOne = document.querySelector('#forecast-one');
var displayForecastTwo = document.querySelector('#forecast-two');
var displayForecastThree = document.querySelector('#forecast-three');
var displayForecastFour = document.querySelector('#forecast-four');
var displayForecastFive = document.querySelector('#forecast-five');
//---- day dates
var savedCitys = [];

//var today = dayjs().format('MMM D, YYYY');
var today = new Date();//.toDateString();
var tomorrow1 = new Date(today);
tomorrow1.setDate(tomorrow1.getDate() + 1);
var tomorrow2 = new Date(tomorrow1);
tomorrow2.setDate(tomorrow2.getDate() + 1);
var tomorrow3 = new Date(tomorrow2);
tomorrow3.setDate(tomorrow3.getDate() + 1);
var tomorrow4 = new Date(tomorrow3);
tomorrow4.setDate(tomorrow4.getDate() + 1);
var tomorrow5 = new Date(tomorrow4);
tomorrow5.setDate(tomorrow5.getDate() + 1);
// today();
//})

//------------------------
function handleCitySearch(){
    var userInput = cityInput.value.trim();
requestCoord(userInput);
}
function handleCityHistory(){
    var userInput = cityInput.value.trim();
requestCoord(userInput);
}

//-------------------------
// coords endpoint for city search
function requestCoord(cityInput){
   var cityCoords = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit=1&appid=${apiKey}`
   
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
    localStorage.setItem("City Name", fetchedCoords[0].name);
    localStorage.setItem("City Coords lat", fetchedCoords[0].lat);/////
    localStorage.setItem("City Coords Lon", fetchedCoords[0].lon);/////
    }
    
    var cityName = document.createElement('li');
    cityName.textContent = (cityInput);
    searchHistoryTable.append(cityName);
    
    
})}

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
       
        localStorage.setItem("date", fecthedWeather.dt);//
        localStorage.setItem("icon", fecthedWeather.weather[0].icon);
        localStorage.setItem("temp", fecthedWeather.main.temp);
        localStorage.setItem("wind", fecthedWeather.wind.speed);
        localStorage.setItem("humidity", fecthedWeather.main.humidity);

            var iconId = localStorage.getItem("icon");
            var weatherIcon = iconId

            var currentCity = localStorage.getItem("City Name");
            var cityDay = document.createElement('h4');
            cityDay.textContent = (currentCity + ", (" + today + ")  " + weatherIcon);
            displayDate.appendChild(cityDay);
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
         localStorage.setItem("date", fecthedForecast.list[0].dt_txt);//date
         localStorage.setItem("icon", fecthedForecast.list[0].weather[0].icon);
         localStorage.setItem("Tempature", fecthedForecast.list[0].main.temp);
         localStorage.setItem("Wind Speed", fecthedForecast.list[0].wind.speed);
         localStorage.setItem("hHumidity", fecthedForecast.list[0].main.humidity);
//forecast one:
            var forecastDate = document.createElement('p');
            forecastDate.textContent = (tomorrow1);
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
            forecastDate.textContent = (tomorrow2);
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
            forecastDate.textContent = (tomorrow3);
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
            forecastDate.textContent = (tomorrow4);
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
            forecastDate.textContent = (tomorrow4);
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


//};
//------------button eventListners
btnSearch.addEventListener("click", handleCitySearch);
// cityHistory.addEventListener("click", function(event){
//     var 
// });


