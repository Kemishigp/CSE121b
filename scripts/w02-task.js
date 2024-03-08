/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = 'Kemish Gomez'
// Get the current date
const currentDate = new Date();

// Extract the current year from the date object
const currentYear = currentDate.getFullYear();

// Print the current year to the console
console.log("Current Year:", currentYear);
const profilePicture = "images/Nevado.jpg";




/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.querySelector('img');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
// Modify the image -------------------------------------------------------
imageElement.setAttribute('src', profilePicture);
// Create the alt text using a template literal
const altText = `Profile image of ${fullName}`;
// Set the alt attribute of the image element
imageElement.setAttribute("alt", altText);



/* Step 5 - Array */
const favoriteFoods = ["Pizza", "Sushi", "Tacos"];

// Convert the favoriteFoods array to a string
// const foodsAsString = favoriteFoods.join(', ');

// Set the innerHTML of the food element
foodElement.innerHTML = `${favoriteFoods}`;
// Add a new favorite food and print it out
const anotherFavoriteFood = "Nachos";
favoriteFoods.push(anotherFavoriteFood);
foodElement.innerHTML += `<br>${favoriteFoods}`;
// Remove the first element
favoriteFoods.shift();
foodElement.innerHTML += `<br>${favoriteFoods}`;
// Remove the last element from the array
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;
