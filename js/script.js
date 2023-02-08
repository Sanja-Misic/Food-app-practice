'use strict'

//Variables
let inputedIngredient = document.querySelector(".input-ingredient")
const foundMealsContainer = document.querySelector('.found-meals-container')

const checkButton = document.querySelector('.check-button') 
let inerIngredients;

// Displeay Html element
const displayMeal = function(data) {
    const html = `<article class="meal">
    <img src=${data.strMealThumb} alt="" class="meal-img">
    <h2 class="meal-name">${data.strMeal}</h2>
    <div class="button meal-button">Read more...</div>  
    </article>
    `
    foundMealsContainer.insertAdjacentHTML('beforeend', html);
}
   
//Fetch meal based on ingredient in it
const checkMeal = async function(ingredient) {
    const response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const data = await response.json()
    console.log(data)

    data.meals.forEach((el)=> { 
        displayMeal(el)
    });
}

//Check button functionality
checkButton.addEventListener('click', function() {
    foundMealsContainer.innerHTML = '';

     if(inputedIngredient.value) {
         inerIngredients = inputedIngredient.value
     } else {
        console.log("no any ingredients")
     }

     checkMeal(inerIngredients)
    })

//