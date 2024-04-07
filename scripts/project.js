/* W05: Programming Tasks */

/* Declare and initialize global variables */
const forecastElement = document.querySelector('#weatherInfo'); // Assuming you have a div element with the id "temples"
let weatherList = [];


/* async displayTemples Function */
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
  forecastElement.appendChild(articleElement);
  });
};

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    try {
      // Use the fetch method to retrieve temple data from the specified URL
      const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
  
      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Convert the fetch response to a JavaScript object
    //   const templeData = await response.json();
      templeList = await response.json();
  
      // Assign the temple data to the global templeList array
    //   templeList = templeData;

      // Call the displayTemples function and pass the templeList
      displayTemples(templeList);
    } catch (error) {
      console.error('Error fetching temple data:', error);
    }
  };

const getForecasts = async (location) => {
    // Construct the WeatherAPI API URL
                    // http://api.weatherapi.com/v1/forecast.json?key=%20b972ab33e7e440efa30215736232210&q=83440      &days=1&aqi=no&alerts=no
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Failed to fetch data. Response status: ${response.status}`);
            }
        })
        .then(data => {
            createWeatherArray(data);
        })
        .catch(error => {
            showError(error.message);
        });
};

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

  displayForecast(weatherList)
  };

/* reset Function */
const reset = () => {
    const articles = forecastElement.querySelectorAll('article');
  
    articles.forEach((article) => {
      article.remove();
    });
  };

/* filterTemples Function */
const filterForecasts = (forecasts) => {
    // Step 1: Call the reset function to clear the output
    reset();
  
    // Step 2: Obtain the value of the HTML select element with ID "filtered"
    const filter = document.querySelector("#filtered").value;
  
    // Step 3: Use a switch statement to filter the forecasts based on the selected option
    switch (filter) {
      case "Current":
      displayForecast(forecasts.filter((forecast) => forecast.ForecastTime.includes("Current")));
      break;
    // Filter for 1 day Forecast
    case "1 Day Forecast":
        displayForecast(forecasts.filter((forecast) => forecast.ForecastTime.includes("Day")));
        break;
    // Display all forecasts (no filter)
      case "all":
        displayForecast(forecasts);
        break;
      default:
        // Handle an unexpected filter value (optional)
        break;
    }
  };

getForecasts();

/* Event Listener */

document.querySelector("#filtered").addEventListener("change", () => { 
    filterForecasts(weatherList) });
