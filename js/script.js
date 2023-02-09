'use strict'

//Variables
const body = document.querySelector("body")
let inputedIngredient = document.querySelector(".input-ingredient")
const foundMealsContainer = document.querySelector('.found-meals-container')

const checkButton = document.querySelector('.check-button') 
let inerIngredients;

const readMoreButton = document.querySelector('.meal-button')
const closeButton = document.querySelector('.close-button')
const readMoreContainer = document.querySelector('.read-more-container')

const wrongInput = document.querySelector('.wrong-input')
const noInput = document.querySelector('.no-input')

let mealIdArr = [];
let idMeal;

//////////////////////////////////////
// Displeay Html meal element
const displayMeal = function(data) {
    const html = `<article class="meal">
    <img src=${data.strMealThumb} alt="" class="meal-img">
    <h2 class="meal-name">${data.strMeal}</h2>
    <div class="button meal-button">Read more...</div>  
    </article>`
    foundMealsContainer.insertAdjacentHTML('beforeend', html);
}
   
//Fetch meal based on ingredient in it
const checkMeal = async function(ingredient) {
    try{
        const response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        const data = await response.json()
        
        idMeal = data.meals[0].idMeal         
        data.meals.forEach((el, i)=> { 
            idMeal = data.meals[i].idMeal
            mealIdArr.push(idMeal)  
        });
         
        data.meals.forEach((el)=> { 
            displayMeal(el)
        });

    } catch (err){   
        foundMealsContainer.innerHTML = `<div class="wrong-input">
        <p class="wrong-input-text">You have entered an ingredient that does not exist 😟!</p>
        <p class="wrong-input-text">Try again!</p>
    </div>`;
       
    }  
}

//Check button functionality
checkButton.addEventListener('click', function() {
    foundMealsContainer.innerHTML = '';

     if(inputedIngredient.value) {
         inerIngredients = inputedIngredient.value
         checkMeal(inerIngredients)
         
       
     } 
     else {
        foundMealsContainer.innerHTML = `<div class="wrong-input">
        <p class="wrong-input-text">You have not entered any ingredients!</p>
        <p class="wrong-input-text">
            Please enter the ingredient you want!</p>
        </div>`;
        console.log("no any ingredients")
     }
    })


//////////////////////////////////////
//Fetch meal based on id
const displeyMealById = async function(id) {
    const response = await fetch( `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    displayReadMore(data.meals[0]);
    }

    
//Read more button functionality
foundMealsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('meal-button')) {

        const clickedEl = event.target.parentElement;
        const mealIndex = [...foundMealsContainer.children].indexOf(clickedEl);
        displeyMealById(mealIdArr[mealIndex]);
  
        readMoreContainer.style.visibility = "visible";
        readMoreContainer.innerHTML = '';
        body.classList.add("body-on-read-more-button");    
    }
});

// //Display read more container by id of meal
const displayReadMore = function(data) {
    // console.log(data)
    const html = `<div class="read-more-wrapper">
    <p class="meal-recipe">${data.strInstructions}</p>
    <p class="meal-category">${data.strCategory}</p>
    <a href="${data.strYoutube}" class="meal-link"> <img class="meal-link-img" src="${data.strMealThumb}" alt=""> <img class="meal-link-play-button" src="./play-button.png" alt=""></a>
    <div class="close-button"> x </div>
    </div>`
    readMoreContainer.insertAdjacentHTML('beforeend', html);
}

//Close button functionality
readMoreContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('read-more-container') || event.target.classList.contains('close-button')) {
        console.log(close)
        event.stopPropagation()
        readMoreContainer.style.visibility = "hidden"

        body.classList.remove("body-on-read-more-button");
    }
});