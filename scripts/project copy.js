// API KEY
const apiKey = 'b972ab33e7e440efa30215736232210';
let weatherList = []
const forecastElements = document.querySelector('#weatherInfo'); // Assuming you have a div element with the id "temples"


// Button to get weather location
document.querySelector('#fetchWeather').addEventListener('click', () => {
    const location = document.querySelector('#locationInput').value;
    getWeatherData(location);
});

// API call to get weather data

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
            createWeatherArray(data, selectedFilter);
        })
        .catch(error => {
            showError(error.message);
        });
}

// Create an array with relevant weather data
function createWeatherArray(data){
let currentForecast = {
  "Location": `Location: ${data.location.name}, ${data.location.country}`,
  "ForecastTime": "Current Data",
  "ForecastTemperature": data.current.temp_c,
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
};

// Function to display weather data
const displayForecast = (weatherList) => {
    
  weatherList.forEach((forecast) => {
    // Create an article element
    const articleElement = document.createElement('article')
    // Create an h2 element for Location
    const h2Element = document.createElement('h2')
    h2Element.textContent = forecast.Location;
    // Create an h3 element for current and 1Day
    const h3Element = document.createElement('h3');
    h3Element.textContent = forecast.ForecastTime;
    // Create 2 p elements for temp and condition
    const p1Element = document.createElement('p');
    p1Element.textContent = forecast.ForecastTemperature;
    const p2Element = document.createElement('p');
    p2Element.textContent = ConditionText;
    // Create an img element and add the icon and text
    const imgElement = document.createElement('img');
    imgElement.src = forecast.ConditionImage;
    imgElement.alt = forecast.ConditionText;

  // Append the elements to the <article> element as children. (appendChild)
  articleElement.appendChild(p1Element);  
  articleElement.appendChild(p2Element);  
  articleElement.appendChild(h2Element);  
  articleElement.appendChild(h3Element);
  articleElement.appendChild(imgElement);
  // Append the <article> element to the global forecastElement variable declared.
    forecastElements.appendChild(articleElement);
  });
};


// Function to filter the weather data
function filterWeatherData(data, selectedFilter) {
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
