const hamburgur = document.querySelector('.fa-bars');
const navMenu = document.querySelector('nav');
const blackHead = document.querySelector('.black-header');
const magnifyer = document.querySelector('.header-search-trending');
const searchWindow = document.querySelector('#search-box');
const exit = document.querySelector('.fa-times');
const body = document.querySelector('body');

//open the searchbox when you click the magnifying glass

magnifyer.addEventListener('click', function () {
  searchWindow.classList.add('in');
});

//close the searchbox when you click the x
exit.addEventListener('click', function () {
  searchWindow.classList.remove('in');
});

let results = 2;
//change the innertext of the search results to reflect number of results
const resultOutput = document.querySelector('#results-display');
function updateResultOutput() {
  if (results===0) {
    resultOutput.innerHTML = '<a href="features">Featured</a>'
  } else {
    resultOutput.innerHTML = `${results} results returned for that search`;
  }
};
updateResultOutput();


//when hamburgur is clicked, add in class to nav menu

hamburgur.addEventListener('click', function () {
  navMenu.classList.toggle('in');
  blackHead.classList.toggle('out');
})

//parse the json info
fetch('/data/recipes.json').then(function (response) {
return response.json();
}).then(fillMainPage);


//log out the name of each recipe - let's replace this with
//all our filling functions.
function fillMainPage(stuff) {
  const recipeSection = document.createElement('div');
  recipeSection.classList = 'recipe-section main-page';
  recipeSection.innerText = "Here's the new recipe section!";
  body.appendChild(recipeSection);
  for (recipe of stuff.recipes) {
    const recipeTile = document.createElement('div');
    recipeTile.classList = "recipe-tile";
    recipeTile.innerHTML = '<div class="image-box"><img class="recipe-image" src="img/' + recipe.id + '.jpg" alt="' + recipe.name + '"></div><div class="recipe-genre">'+recipe.genre+'</div><div class="recipe-name">'+recipe.name+'</div>';
    recipeSection.appendChild(recipeTile);
    console.log(recipe.name);
  }
}
