/* Error handling function */
const apiKey = 'b972ab33e7e440efa30215736232210';
let weatherList = [];
const forecastElement = document.querySelector('#weatherInfo'); // Assuming you have a div element with the id "WeatherInfo"

function showError(message) {
  const errorElement = document.querySelector("#error");
  errorElement.textContent = message;
}

/* Function to fetch weather data */
async function getForecasts(location) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`Failed to fetch data. Response status: ${response.status}`);
      }
      const data = await response.json();
      createWeatherArray(data);
  } catch (error) {
      showError(error.message);
  }
}

/* Function to create weather array */
function createWeatherArray(data){
  let currentForecast = {
      "Location": `Location: ${data.location.name}, ${data.location.country}`,
      "ForecastTime": "Current Data",
      "ForecastTemperature": `Temperature: ${data.current.temp_c}`,
      "ConditionText": data.current.condition.text,
      "ConditionImage": data.current.condition.icon
  };
  
  let futureForecast = {
      "Location": `Location: ${data.location.name}, ${data.location.country}`,
      "ForecastTime": "1 Day Forecast",
      "ForecastTemperature": `Max Temp: ${data.forecast.forecastday[0].day.maxtemp_f}°F/ Min Temp: ${data.forecast.forecastday[0].day.mintemp_f}°F`,
      "ConditionText": data.forecast.forecastday[0].day.condition.text,
      "ConditionImage": data.forecast.forecastday[0].day.condition.icon
  };
  weatherList.push(currentForecast);
  weatherList.push(futureForecast);

  displayForecast(weatherList);
}

/* Event listener for fetching weather forecasts */
document.querySelector('#fetchWeather').addEventListener('click', () => {
  const location = document.querySelector('#locationInput').value;
  if (location.trim() !== '') {
      getForecasts(location);
  } else {
      showError("Please enter a location.");
  }
});

/* Reset function */
function reset() {
  forecastElement.innerHTML = '';
}

/* Function to filter weather forecasts */
function filterForecasts(forecasts) {
  reset();
  const filter = document.querySelector("#filtered").value;

  switch (filter) {
      case "Current":
          displayForecast(forecasts.filter((forecast) => forecast.ForecastTime.includes("Current")));
          break;
      case "1 Day Forecast":
          displayForecast(forecasts.filter((forecast) => forecast.ForecastTime.includes("Day")));
          break;
      case "Both":
          displayForecast(forecasts);
          break;
      default:
          showError("Unexpected filter value.");
          break;
  }
}

/* Event listener for filtering */
document.querySelector("#filtered").addEventListener("change", () => { 
  filterForecasts(weatherList);
});

/* Function to display weather forecasts */
function displayForecast(weatherList) {
  weatherList.forEach((forecast) => {
      const articleElement = document.createElement('article');
      const h2Element = document.createElement('h2');
      h2Element.textContent = forecast.Location;
      const h3Element = document.createElement('h3');
      h3Element.textContent = forecast.ForecastTime;
      const p1Element = document.createElement('p');
      p1Element.textContent = forecast.ForecastTemperature;
      const p2Element = document.createElement('p');
      p2Element.textContent = forecast.ConditionText;
      const imgElement = document.createElement('img');
      imgElement.src = forecast.ConditionImage;
      imgElement.alt = forecast.ConditionText;

      articleElement.appendChild(h2Element);  
      articleElement.appendChild(h3Element);
      articleElement.appendChild(p1Element);  
      articleElement.appendChild(imgElement);
      articleElement.appendChild(p2Element);  

      forecastElement.appendChild(articleElement);
  });
}
