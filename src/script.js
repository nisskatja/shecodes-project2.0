function formatDate (timestamp) {

let now = new Date(timestamp);
let days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
let day = days[now.getDay()];


return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {

let now = new Date(timestamp);
let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
    minute = `0${minute}`;
  }
if (hour < 10)  {
  hour= `0${hour}`;
}
return `${hour}:${minute}`;
}

//let currentDay = document.querySelector(".time");
//currentDay.innerHTML = `${day} ${hour}:${minute}`;

function showWeather (response) {

  document.querySelector("#temperature").innerHTML=`${Math.round(response.data.main.temp)}`;
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
celsiusTemperature = response.data.main.temp;

}


function displayForecast (response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;
for (let index = 0; index < 3; index++) {
     forecast = response.data.list[index];
     forecastElement.innerHTML += 
     ` <div class="col-4">
                <div class="card" style="width: 10rem;">
                    <div class="card-body">
                        <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
                        <p class="card-text">
                            <strong>${Math.round(forecast.main.temp_max)}°C</strong>
                            <br />
                            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
                        </p>
                    </div>
                </div>
            </div>`;}


}

function showCity (event) {
  event.preventDefault();
  
  let city = document.querySelector("#input").value;
  let apiKey = "a69b99710a5dc2336f055a4a1930aa97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
 
 axios.get(apiUrl).then(showWeather);

 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
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



let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", showCity);

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", unitConversionF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", unitConversionC);