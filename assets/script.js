var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");
var searchHistoryTable = document.querySelector("#search-history-table");
var displayCityData = document.querySelector('ul');


//------------------------
var displayCityName = cityInput.value.trim();
var cityLon = "";   // ********add info**********
var cityLat = "";   // ********add info**********

//------------------------

function handleCitySearch(){
    console.log("clicked");
    var userInput = cityInput.value.trim();
requestCoord(userInput);
}

// coorrdinates endpoint for city search
function requestCoord(cityInput){
   var cityCoords = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit=1&appid=${apiKey}` 
   //var currentCityCoords;

//----------------
   fetch(cityCoords)
   .then(function (response) {
    console.log("fetchCords", response);
    return response.json();
   })
    .then(function (fetchedCoords){
    console.log('Fetched Coords', fetchedCoords);//.name.lat.lon);
    
    //      console.log(fetchedCoords[i].name.lat.lon);
    //  }
    console.log("-------------");  // not needed, just for console.log display
   })
   
}

// weatherAPI endpoint 
/// update lat and lon in var
function requestWeather(){
    var cityWeather =`https://api.openweathermap.org/data/2.5/forcast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`
    //var weatherDisplayInfo;
    
//-----------------    
    fetch(cityWeather)
    .then(function (fetchWeather){
    console.log("fecthWeather", fetchWeather);
    return fetchWeather.json();
    })
    .then(function (fecthedWeather){
    console.log("Fetched City Weather", fecthedWeather);
    cityWeather = fecthedWeather

    // for (let i = 0; i < fecthedWeather.length; i++) {
    //     console.log(fecthedWeather[i].name.wind);//////////// update fecth endpoint items
    //     var listCityInfo = document.createElement('li');
    //     listData = document.createElement('p');
    //     listData.textContent = fecthedWeather[i].name.wind; ///////update to grab city name
    //     listCityInfo.appendChild(listData);
    //     displayCityData.appendChild(listCityInfo);

    })
    console.log("-------------");
    }


//------------------------------------------

// function displayCityInfo(){
//     var weaherDay =
//     var cityName = 
//     var cityTemp =
//     var cityWind =
//     var Humidity = 

// };


btnSearch.addEventListener("click", handleCitySearch);