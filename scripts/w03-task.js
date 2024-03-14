/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
    // Inside this function, you can perform the addition operation
    // const sum = number1 + number2;
    return number1+number2; // Return the result of the addition
  }  
  
function addNumbers(){
let addNumber1 = Number(document.querySelector('#add1').value); //Get the first value
let addNumber2 = Number(document.querySelector('#add2').value); //Get the second value
document.querySelector('#sum').value = add(addNumber1, addNumber2); //Get the sum of both values
}

document.querySelector('#addNumbers').addEventListener('click', addNumbers);
/* Function Expression - Subtract Numbers */
// Inside this function, you can perform the subtraction operation
const subtract = function(number1, number2) {
  return number1-number2; // Return the result of the subtraction
}  
// subtract1, subtract2, subtractNumbers, and difference.
const subtractNumbers = function(){
let subtractNumber1 = Number(document.querySelector('#subtract1').value); //Get the first value
let subtractNumber2 = Number(document.querySelector('#subtract2').value); //Get the second value
document.querySelector('#difference').value = subtract(subtractNumber1, subtractNumber2); //Get the sum of both values
}

document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
// Using arrow functions, repeat the items in Step 2 with arrow functions named 
// multiply and multiplyNumbers and HTML form controls with IDs of factor1, factor2, multiplyNumbers, and product.
const multiply = (number1,number2) =>{
  return number1 * number2;
}

const multiplyNumbers = () => {
  let multiplyNumber1 = Number(document.querySelector('#factor1').value);
  let multiplyNumber2 = Number(document.querySelector('#factor2').value);
  document.querySelector('#product').value = multiply(multiplyNumber1, multiplyNumber2); //Get the sum of both values
}

document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);


/* Open Function Use - Divide Numbers */

// Using any combination of function declaration types, repeat the items in Step 2 with new functions named 
// divide and divideNumbers and HTML form controls with IDs of dividend, divisor, divideNumbers, and quotient.
function divide(number1, number2) {
  // Inside this function, you can perform the addition operation
  // const sum = number1 + number2;
  return number1 / number2; // Return the result of the addition
}  

function divideNumbers(){
let divideNumber1 = Number(document.querySelector('#dividend').value); //Get the first value
let divideNumber2 = Number(document.querySelector('#divisor').value); //Get the second value
document.querySelector('#quotient').value = divide(divideNumber1, divideNumber2); //Get the sum of both values
}

document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);

/* STEP 6 */
/* Decision Structure */
const currentDate = new Date();
const currentYear = new Date().getFullYear();

document.getElementById("year").value = currentYear;


/* FUNCTIONS */
// Your existing functions

/* Selection Structures */
// Add an event listener for the "Get Total Due" button
document.querySelector('#getTotal').addEventListener('click', getTotalDue);

// Function to calculate total due
function getTotalDue() {
    let subtotal = Number(document.querySelector('#subtotal').value); // Get the numeric value entered by the user in the subtotal field
    let membershipCheckbox = document.querySelector('#member').checked; // Check if the membership checkbox has been checked

    // Check if the membership checkbox is checked and apply a 20% discount to the subtotal amount
    if (membershipCheckbox) {
        subtotal *= 0.8; // Apply a 20% discount
    }

    // Output the total to the total span in the format shown with two decimals using a template string
    document.querySelector('#total').innerHTML = `$${subtotal.toFixed(2)}`; // Display only the dollar sign followed by the amount
}

// Your existing array methods and other code






/* STEP 7 */
/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1,2,3,4,5,6,7,8,9,10,11,12,13];
document.querySelector("#array").innerHTML = numbersArray;


/* Output Odds Only Array */
document.querySelector('#odds').innerHTML = numbersArray.filter(number => number % 2 !== 0);


/* Output Evens Only Array */
document.querySelector('#evens').innerHTML = numbersArray.filter(number => number % 2 === 0);


/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').innerHTML = numbersArray.reduce((sum, number) => sum + number)

/* Output Multiplied by 2 Array */
document.querySelector('#multiplied').innerHTML= numbersArray.map(number => number * 2)

/* Output Sum of Multiplied by 2 Array */

// Use the map() method to multiply each element by 2
const multipliedNumbers = numbersArray.map(number => number * 2);

// Use the reduce() method to sum the multiplied numbers
const summ = multipliedNumbers.reduce((sum, number) => sum + number);

// Get the HTML element with the ID "sumOfMultiplied" using querySelector
const sumOfMultipliedElement = document.querySelector("#sumOfMultiplied");

// Set the innerHTML of the "sumOfMultiplied" element to display the sum of multiplied numbers
sumOfMultipliedElement.innerHTML = summ;
