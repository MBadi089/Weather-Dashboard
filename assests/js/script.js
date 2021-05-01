//--------------------Global Variables Section---------------------//
var cityInput;
var city;
var temp;
var fahrenheit;
var wind;
var humidity;
var cityLatitude = "testLat";
var cityLongitude = "testLong";
var lat;
var lon;
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
     fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityInput + "&appid=" + apiKey)
   .then(function(response) {
     return response.json();
   })
   .then(function(data) {
     console.log(data);

     //this grabs the city lat and lon from user's input
     cityLatitude = data.coord.lat;
     cityLongitude = data.coord.lon;
     console.log(cityLatitude);
     console.log(cityLongitude);

     city = document.querySelector('#city').innerHTML='City: ' + cityInput;

     //converting kelvin to fahrenheit
     kelvinToFahrenheit = (Math.round(data.main.temp - 273.15) * 9 / 5 + 32);
     temp = document.querySelector("#temp").innerHTML='Temp: ' + kelvinToFahrenheit; //data.main.temp;

     wind = document.querySelector("#wind").innerHTML='Wind: '+ data.wind.speed;
     humidity = document.querySelector("#humidity").innerHTML='Humidity: '+ data.main.humidity;

     //Second API fetch, this is to get the UV Index
     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude +"&lon=" + cityLongitude + "&appid=" + apiKey )//33.44&lon=-94.04&appid="+ apiKey)
       .then(function(response) {
         return response.json();
       })
       .then(function(data) {
         console.log('data: ',data);
       });

   });
 }  
//------------------Enod of getCityInput Section-------------------//


//----------------------saveUserInput Section-----------------------//
//This will save the users input with localStorage
function saveUserInput() {

}
//-------------------End of saveUserInput Section-------------------//
