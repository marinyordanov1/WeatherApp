console.log("look mum i can fly");

const apiKey = "872523c16f36ba432ab3d3d9d2f63460";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBtn = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
const errorP = document.querySelector(".error");

async function checkWeather(city) {
  let data;
  try {
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
    data = await response.json();
    if (response.ok == false) {
      throw new Error(data.message);
    }
    console.log(data);
  } catch (err) {
    errorP.style.display = "block";
    document.querySelector(".weather").style.display = "none";
    throw err;
  }

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data["main"].temp) + "°c";
  document.querySelector(".humidity").innerHTML = data["main"].humidity + "%";
  document.querySelector(".wind").innerHTML = data["wind"].speed + " km/h";

  if (data.weather[0].main != null) {
    weatherIcon.src = "images/" + data.weather[0].main + ".png";
  }

  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
searchBox.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13 || event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
