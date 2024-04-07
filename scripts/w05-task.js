/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector('#temples'); // Assuming you have a div element with the id "temples"
let templeList = [];


/* async displayTemples Function */
const displayTemples = (temples) => {
    
    temples.forEach((temple) => {
        // Create an HTML <article> element (createElement)
      const articleElement = document.createElement('article');

    //   Create an HTML <h3> element and add the temple's templeName property to this new element.
      const h3Element = document.createElement('h3');
      h3Element.textContent = temple.templeName;

    //   Create an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's location property to the alt attribute.
      const imgElement = document.createElement('img');
      imgElement.src = temple.imageUrl;
      imgElement.alt = temple.location;

    // Append the <h3> element and the <img> element to the <article> element as children. (appendChild)
      articleElement.appendChild(h3Element);
      articleElement.appendChild(imgElement);
    // Append the <article> element to the global templesElement variable declared in Step 2.
      templesElement.appendChild(articleElement);
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


/* reset Function */
const reset = () => {
    const articles = templesElement.querySelectorAll('article');
  
    articles.forEach((article) => {
      article.remove();
    });
  };

/* filterTemples Function */
const filterTemples = (temples) => {
    // Step 1: Call the reset function to clear the output
    reset();
  
    // Step 2: Obtain the value of the HTML select element with ID "filtered"
    const filter = document.querySelector("#filtered").value;
  
    // Step 3: Use a switch statement to filter the temples based on the selected option
    switch (filter) {
      case "notutah":
      displayTemples(temples.filter((temple) => !temple.location.includes("Utah")));
      break;
    // Filter for temples located in Utah
    case "utah":
        displayTemples(temples.filter((temple) => temple.location.includes("Utah")));
        break;
    // Filter for temples dedicated before 1950
        case "older":
        displayTemples(temples.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0, 1)));
        break;
    // Display all temples (no filter)
      case "all":
        displayTemples(temples);
        break;
      default:
        // Handle an unexpected filter value (optional)
        break;
    }
  };

getTemples();

/* Event Listener */

document.querySelector("#filtered").addEventListener("change", () => { 
    filterTemples(templeList) });
