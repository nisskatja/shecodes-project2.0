let now = new Date();

let days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
    minute = `0${minute}`;
  }


let currentDay = document.querySelector(".time");
currentDay.innerHTML = `${day} ${hour}:${minute}`;

function showWeather (response) {
  console.log(response.data);
  document.querySelector("#temperature").innerHTML=`${Math.round(response.data.main.temp)}`;
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
celsiusTemperature = response.data.main.temp;

}


function showCity (event) {
  event.preventDefault();
  
  let city = document.querySelector("#input").value;
  let apiKey = "a69b99710a5dc2336f055a4a1930aa97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
 
 axios.get(apiUrl).then(showWeather);

}

function searchLocation (position) {
 let lat = position.coords.latitude;
  let lon = position.coords.longitude
  let apiKey = "a69b99710a5dc2336f055a4a1930aa97";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);


}

function currentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function unitConversionF (event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round(celsiusTemperature * 9/5)+32;
  temperature.innerHTML= fahrenheitTemperature;
}

function unitConversionC (event) {
  event.preventDefault();
let temperature = document.querySelector("#temperature");
temperature.innerHTML = Math.round(celsiusTemperature);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", showCity);

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", unitConversionF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", unitConversionC);