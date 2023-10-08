var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");
//--------------------
var searchHistoryTable = document.querySelector("#search-history-table");

var displayCurrentForcast = document.querySelector('#display-current-forcast');

//var displayFiveDayForcast = document.querySelector('ul');


//------------------------
//var displayCityName = cityInput.value.trim();

//------------------------
function handleCitySearch(){
    console.log("clicked");
    var userInput = cityInput.value.trim();
requestCoord(userInput);
requestWeather();
}

// coords endpoint for city search
function requestCoord(cityInput){
   var cityCoords = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit=1&appid=${apiKey}` 
   //var currentCityCoords;
   //---------------------- 
   fetch(cityCoords)
   .then(function (response) {
        console.log("fetchCords", response);
        return response.json();
   })
    .then(function (fetchedCoords){
    console.log('Fetched Coords', fetchedCoords);
    for (let i = 0; i < fetchedCoords.length; i++) {
        console.log("-------------");  // log not needed, for console.log display
        console.log("City Name", fetchedCoords[i].name);
        console.log("City Coords lat", fetchedCoords[i].lat);/////
        console.log("City Coords Lon", fetchedCoords[i].lon);/////


        var cityName = document.createElement('h2');
        cityName.textContent = (cityInput);
        displayCurrentForcast.append(cityName);
    };
   })
}
//-------------------------------------------
// weatherAPI endpoint 

var latCity = fetchedCoords[i].lat;
var lonCity = fetchedCoords[i].lon;


function requestWeather(latCity, lonCity){
    var cityWeather =`https://api.openweathermap.org/data/2.5/forcast?lat=${latCity}&lon=${lonCity}&appid=${apiKey}&units=imperial`
    //var weatherDisplayInfo;

    //-----------------    
    fetch(cityWeather)
    .then(function (response){
    console.log("fecthWeather", response);
    return response.json();
    })
    .then(function (fecthedWeather){
    console.log("Fetched City Weather", fecthedWeather);
    cityWeather = fecthedWeather;

    
    console.log("-------------");
    })
}



//--------added div classes and id's for

var forcastCards = $("#forcast-card");
var forcastDay = [1, 2, 3, 4, 5];




btnSearch.addEventListener("click", handleCitySearch);