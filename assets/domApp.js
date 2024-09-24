import { fetchData } from "./fetchData.js";

class domApp {
  constructor(containerId) {
    this.containerId = containerId;
    this.weatherData = {};
    this.timeItnerval = 2 * 60 * 60 * 1000;
  }
  setData = async () => {
    if (localStorage.getItem("timeStamp") < new Date() - this.timeItnerval) {
      this.weatherData = await fetchData();
      localStorage.setItem("weatherData", JSON.stringify(this.weatherData));
      localStorage.setItem("timeStamp", new Date());
    } else {
      this.weatherData = JSON.parse(localStorage.getItem("weatherData"));
    }
    const containerElement = document.getElementById(this.containerId);
    containerElement.innerHTML = this.renderWeather(this.weatherData);
  };
  renderWeather({ weather, main, wind, name }) {
    return `
    <h2 class="weather-data__city" id="cityName">${name}</h2>

            <div class="weather-data__overview">
                <img class="weather-data__icon" id="weatherIcon" src="https://openweathermap.org/img/wn/${
                  weather[0].icon
                }@2x.png" alt="Weather Icon">
                <div class="weather-data__description" id="weatherDescription">${
                  weather[0].description
                }</div>
                <div class="weather-data__temp" id="temp">${Math.round(
                  main.temp - 273.15
                )}°C</div>
            </div>

            <div class="weather-data__details">
                <div class="weather-data__item">
                    <span class="weather-data__label">Feels Like: </span>
                    <span class="weather-data__value" id="feelsLike">${Math.round(
                      main.feels_like - 273.15
                    )}°C</span>
                </div>
                <div class="weather-data__item">
                    <span class="weather-data__label">Humidity:</span>
                    <span class="weather-data__value" id="humidity">${
                      main.humidity
                    }%</span>
                </div>
                <div class="weather-data__item">
                    <span class="weather-data__label">Wind Speed:</span>
                    <span class="weather-data__value" id="windSpeed">${
                      wind.speed
                    } m/s</span>
                </div>
                <div class="weather-data__item">
                    <span class="weather-data__label">Wind direction:</span>
                    <span class="weather-data__value" id="windDirect">${
                      wind.deg
                    }°</span>
                </div>
            </div>`;
  }
}

const weatherApp = new domApp("weatherData");
weatherApp.setData();
