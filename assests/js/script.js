//API key set as const to be called on without changing it
const APIKey ="40673f276cf44bc5a316f589061aceb6";

fetch("https://api.openweathermap.org/data/2.5/weather?q=midland&appid=" + APIKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });