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
   var cityCords = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},&limit={5}&appid=${apiKey}` 

}


btnSearch.addEventListener("click", handleCitySearch);