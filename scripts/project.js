// API KEY
const apiKey = 'b972ab33e7e440efa30215736232210';

document.querySelector('#fetchWeather').addEventListener('click', () => {
  const location = document.querySelector('#locationInput').value;
  const forecastType = document.querySelector('#forecastType').value;
  getWeatherData(location, forecastType);
});

function getWeatherData(location, forecastType) {
  let apiUrl;
  if (forecastType === 'current') {
    apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
  } else if (forecastType === '1-day') {
    apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;
  } else if (forecastType === 'both') {
    apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=no&alerts=no`;
  }

  fetch(apiUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch data. Response status: ${response.status}`);
      }
    })
    .then(data => {
      if (forecastType === 'both') {
        displayWeatherData(data, true);
      } else {
        displayWeatherData(data, false);
      }
    })
    .catch(error => {
      showError(error.message);
    });
}

function displayWeatherData(data, isBothForecast) {
  document.querySelector('#location').textContent = `Location: ${data.location.name}, ${data.location.country}`;
  document.querySelector('#error').textContent = '';

  if (!isBothForecast) {
    document.querySelector('#temperature').textContent = `Temperature: ${data.current.temp_c}°C/${data.current.temp_f}°F`;
    document.querySelector('#description').textContent = `Conditions: ${data.current.condition.text}`;
    document.querySelector('#weatherIcon').src = data.current.condition.icon;

    if (data.forecast) {
      document.querySelector('#temperatureMax').textContent = `Max Temperature: ${data.forecast.forecastday[0].day.maxtemp_c}°C/${data.forecast.forecastday[0].day.maxtemp_f}°F`;
      document.querySelector('#temperatureMin').textContent = `Min Temperature: ${data.forecast.forecastday[0].day.mintemp_c}°C/${data.forecast.forecastday[0].day.mintemp_f}°F`;
      document.querySelector('#descriptionF').textContent = `Conditions: ${data.forecast.forecastday[0].day.condition.text}`;
      document.querySelector('#weatherIconF').src = data.forecast.forecastday[0].day.condition.icon;
    }
  } else {
    // Display current forecast
    document.querySelector('#temperature').textContent = `Temperature: ${data.current.temp_c}°C/${data.current.temp_f}°F`;
    document.querySelector('#description').textContent = `Conditions: ${data.current.condition.text}`;
    document.querySelector('#weatherIcon').src = data.current.condition.icon;

    // Display forecast for next day
    document.querySelector('#temperatureMax').textContent = `Max Temperature: ${data.forecast.forecastday[1].day.maxtemp_c}°C/${data.forecast.forecastday[1].day.maxtemp_f}°F`;
    document.querySelector('#temperatureMin').textContent = `Min Temperature: ${data.forecast.forecastday[1].day.mintemp_c}°C/${data.forecast.forecastday[1].day.mintemp_f}°F`;
    document.querySelector('#descriptionF').textContent = `Conditions: ${data.forecast.forecastday[1].day.condition.text}`;
    document.querySelector('#weatherIconF').src = data.forecast.forecastday[1].day.condition.icon;
  }
}

function showError(message) {
  document.querySelector('#error').textContent = message;
  document.querySelector('#temperature').textContent = '';
  document.querySelector('#description').textContent = '';
  document.querySelector('#weatherIcon').src = '';
  document.querySelector('#temperatureMax').textContent = '';
  document.querySelector('#temperatureMin').textContent = '';
  document.querySelector('#descriptionF').textContent = '';
  document.querySelector('#weatherIconF').src = '';
}
