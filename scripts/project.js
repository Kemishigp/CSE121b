// API KEY
const apiKey = 'b972ab33e7e440efa30215736232210';

document.querySelector('#fetchWeather').addEventListener('click', () => {
    const location = document.querySelector('#locationInput').value;
    getWeatherData(location);
});

function getWeatherData(location) {
    // Construct the WeatherAPI API URL
                    // http://api.weatherapi.com/v1/forecast.json?key=%20b972ab33e7e440efa30215736232210&q=83440      &days=1&aqi=no&alerts=no
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;
    const selectedFilter = document.querySelector('input[name="forecastFilter"]:checked').id; // Get selected radio button ID

    fetch(apiUrl)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Failed to fetch data. Response status: ${response.status}`);
            }
        })
        .then(data => {
            displayWeatherData(data, selectedFilter);
        })
        .catch(error => {
            showError(error.message);
        });
}


// function getWeatherData(location) {
//   const selectedFilter = document.querySelector('input[name="forecastFilter"]:checked').id; // Get selected radio button ID
//   // Rest of the code...

//   .then(data => {
//     displayWeatherData(data, selectedFilter);
//   })
//   // ...
// }


// function displayWeatherData(data) {
//     document.querySelector('#location').textContent = `Location: ${data.location.name}, ${data.location.country}`;
//     document.querySelector('#error').textContent = '';
//     // CURRENT DATA
//     document.querySelector('#temperature').textContent = `Temperature: ${data.current.temp_c}°C/${data.current.temp_f}°FF`;
//     document.querySelector('#description').textContent = `Conditions: ${data.current.condition.text}`;
//     document.querySelector('#weatherIcon').src = data.current.condition.icon;
//     // FORECAST DATA
//     document.querySelector('#temperatureMax').textContent = `Max Temperature: ${data.forecast.forecastday[0].day.maxtemp_c}°C/${data.forecast.forecastday[0].day.maxtemp_f}°F`;
//     document.querySelector('#temperatureMin').textContent = `Min Temperature: ${data.forecast.forecastday[0].day.mintemp_c}°C/${data.forecast.forecastday[0].day.mintemp_f}°F`;
//     document.querySelector('#descriptionF').textContent = `Conditions: ${data.forecast.forecastday[0].day.condition.text}`;
//     document.querySelector('#weatherIconF').src = data.forecast.forecastday[0].day.condition.icon;
// }

function displayWeatherData(data, selectedFilter) {
  document.querySelector('#location').textContent = `Location: ${data.location.name}, ${data.location.country}`;
  document.querySelector('#error').textContent = '';

  if (selectedFilter === "current") {
    // Display current data only (existing code for current data)
    document.querySelector('#temperature').textContent = `Temperature: ${data.current.temp_c}°C/${data.current.temp_f}°FF`;
    document.querySelector('#description').textContent = `Conditions: ${data.current.condition.text}`;
    document.querySelector('#weatherIcon').src = data.current.condition.icon;
  } else if (selectedFilter === "oneDay") {
    // Display 1-day forecast only (existing code for forecast data)
    document.querySelector('#temperatureMax').textContent = `Max Temperature: ${data.forecast.forecastday[0].day.maxtemp_c}°C/${data.forecast.forecastday[0].day.maxtemp_f}°F`;
    document.querySelector('#temperatureMin').textContent = `Min Temperature: ${data.forecast.forecastday[0].day.mintemp_c}°C/${data.forecast.forecastday[0].day.mintemp_f}°F`;
    document.querySelector('#descriptionF').textContent = `Conditions: ${data.forecast.forecastday[0].day.condition.text}`;
    document.querySelector('#weatherIconF').src = data.forecast.forecastday[0].day.condition.icon;
  } else if (selectedFilter === "both") {
    // Display both current and 1-day forecast
    // Use existing code to display both sections
    // CURRENT DATA
    document.querySelector('#temperature').textContent = `Temperature: ${data.current.temp_c}°C/${data.current.temp_f}°FF`;
    document.querySelector('#description').textContent = `Conditions: ${data.current.condition.text}`;
    document.querySelector('#weatherIcon').src = data.current.condition.icon;
    // FORECAST DATA
    document.querySelector('#temperatureMax').textContent = `Max Temperature: ${data.forecast.forecastday[0].day.maxtemp_c}°C/${data.forecast.forecastday[0].day.maxtemp_f}°F`;
    document.querySelector('#temperatureMin').textContent = `Min Temperature: ${data.forecast.forecastday[0].day.mintemp_c}°C/${data.forecast.forecastday[0].day.mintemp_f}°F`;
    document.querySelector('#descriptionF').textContent = `Conditions: ${data.forecast.forecastday[0].day.condition.text}`;
    document.querySelector('#weatherIconF').src = data.forecast.forecastday[0].day.condition.icon;
  } else {
    console.error("Unexpected filter selection:", selectedFilter); // Handle unexpected filters (optional)
  }
}


function showError(message) {
    document.querySelector('#error').textContent = message;
    document.querySelector('#temperature').textContent = '';
    document.querySelector('#description').textContent = '';
    document.querySelector('#weatherIcon').src = '';
}
