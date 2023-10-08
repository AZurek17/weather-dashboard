var apiKey = "16987757a5619c71a67c99c96ec1bd39";
var btnSearch = document.querySelector("#btn-search");
var cityInput = document.querySelector("#city-input");



function handleCitySearch(){
    console.log("clicked");
    var userInput = cityInput.value.trim();
requestCord(userInput);

}
// coorrdinates endpoint for city search
function requestCord(cityInput){
   var cityCords = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit={1}&appid=${apiKey}` 
//----------------
   fetch(cityCords)
   .then(function (fetchCords) {
    console.log("fetchCords", fetchCords);
    return fetchCords.json();
   })
   .then(function (fetchedCords){
    console.log('Fetched City Cords', fetchedCords);

    for (let i = 0; i < fetchedCords.length; i++) {
        const element = fetchedCords[i].name.lat.lon;//////////  update fetch endpoint
        console.log(element);
    }
    console.log("-------------");
   });
};
// weatherAPI endpoint 
/// update lat and lon in var
function requestWeather(){
    var cityWeather =`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`
    fetch(cityWeather)
    .then(function (fetchWeather){
    console.log("fecthWeather", fetchWeather);
    return fetchWeather.json();
    })
    .then(function (fecthedWeather){
    console.log("Fetched City Weather", fecthedWeather);
    for (let i = 0; i < fecthedWeather.length; i++) {
        const element = fecthedWeather[i].name;//////////// update fecth endpoint
        console.log(element);
    }
    console.log("-------------");
    })
};

//------------------------------------------

function displayCityName(){


};


btnSearch.addEventListener("click", handleCitySearch);