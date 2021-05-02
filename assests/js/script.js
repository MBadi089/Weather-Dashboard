//--------------------Global Variables Section---------------------//
var cityInput;
var city;
var temp;
var uvIndex;
var kelvinToFahrenheit;
var wind;
var humidity;
var cityLatitude;
var cityLongitude;
var lat;
var lon;
var nextDayTemp;
var cityFiveDayForecast;
var searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener("click", getCityInput);

//API key set as const to be called on without changing it
const apiKey ="40673f276cf44bc5a316f589061aceb6";

//-----------------End of Global Variables Section-----------------//


//----------------------getCityInput Section-----------------------//
//This function will get the user's choice of city to search for    
    function getCityInput() {
    cityInput = document.querySelector("#userInput").value;

//First API fetch to get the current day weather from user's input
     fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityInput + "&appid=" +  apiKey)
   .then(function(response) {
     return response.json();
   })
   .then(function(data) {
 //this grabs the city lat and lon from user's input
    console.log(data);
     cityLatitude = data.coord.lat;
     cityLongitude = data.coord.lon;
     
     city = document.querySelector('#city').innerHTML='City: ' + cityInput;

     //converting kelvin to fahrenheit
     kelvinToFahrenheit = (Math.round(data.main.temp - 273.15) * 9 / 5 + 32);
     temp = document.querySelector("#temp").innerHTML='Temp: ' + kelvinToFahrenheit;

     wind = document.querySelector("#wind").innerHTML='Wind: '+ data.wind.speed;
     humidity = document.querySelector("#humidity").innerHTML='Humidity: '+ data.main.humidity;

 //Second API fetch, this is to get the UV Index and the five day forecast
     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude +"&lon=" + cityLongitude + "&appid=" + apiKey )
       .then(function(response) {
         return response.json();
       })
       .then(function(data) {
         console.log('data: ',data);
        //this gets the UV index and places it in the html section accordingly
        uvIndex = document.querySelector("#uvIndex").innerHTML="UV Index: " + data.current.uvi;

        //this will target the 5 day forecast through a loop
        for (var i = 1; i < 6; i++) {
          var icon = data.daily[i].weather[0].icon;

          //fiveDayTemperature = (Math.round(data.daily[i].temp.day - 273.15) * 9 / 5 + 32);

          var cityFiveDayForecast = document.createElement("div");
          var fiveDayTemperature = document.createElement("p");
          var fiveDayWind = document.createElement("p");
          var fiveDayHumidity = document.createElement("p");
          var iconImage = document.createElement("img");
          fiveDayTemperature.textContent = data.daily[i].temp.day
          iconImage.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")
          cityFiveDayForecast.appendChild(iconImage);
          cityFiveDayForecast.appendChild(fiveDayTemperature);
          cityFiveDayForecast.appendChild(fiveDayWind);
          cityFiveDayForecast.appendChild(fiveDayHumidity);
          document.getElementById("storeForecast").appendChild(cityFiveDayForecast);

            
         }
       });   
   });
 }  
//------------------Enod of getCityInput Section-------------------//


//----------------------saveUserInput Section-----------------------//
//This will save the users input with localStorage
function saveUserInput() {

}
//-------------------End of saveUserInput Section-------------------//
