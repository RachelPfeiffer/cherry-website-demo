let jsonResponse;
// Model:
const Model = {
  fetch: fetch('/data/recipes.json').then(function (response) {
return response.json();
}).then(function (jsonFile) {
  jsonResponse = jsonFile.recipes;
  console.log(jsonResponse);
})
}


// View:
const View = {
  tooltips: function () {
//Get Tooltips to follow the mouse
var tooltip = document.querySelectorAll('.tooltip');

document.addEventListener('mousemove', fn, false);

function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = (e.pageX-20) + 'px';
        tooltip[i].style.top = (e.pageY+30) + 'px';
    }
}
},

navbar: function () {
//Fill large navbar
console.log("navbar");
},

header: function fillHeader() {
  const recipeGenre = document.querySelector('.recipe-genre');
  recipeGenre.innerText = Controller.getGenre();

  const recipeName = document.querySelector('.recipe-name');
  recipeName.innerText = Controller.getName();

  const recipeDescription = document.querySelector('.recipe-description');
  recipeDescription.innerText = Controller.getDescription();

  const recipeImage = document.querySelector('.recipe-image');
  recipeImage.innerHTML = '<img src="' + Controller.getImg() + '">';
},

recipeInfo : function fillInfo() {
  const recipeServings = document.querySelector('.servings');
  recipeServings.innerText = Controller.getServings();

  const recipeTime = document.querySelector('.time');
  recipeTime.innerText = Controller.getTime();

  const recipeDifficulty = document.querySelector('.difficulty');
  recipeDifficulty.innerText = Controller.getDifficulty();
},

recipeIngredients : function fillIngredients() {
  const ingredients =  Controller.getIngredients();
  for (ingredient of ingredients) {
    const newIng = document.createElement('li');
    const ingList = document.querySelector('.ingredients');
    newIng.innerText = ingredient;
    ingList.appendChild(newIng);
  }
}


}

// Controller:
const Controller = {
  getRecipeID : function getRecipeID() {
    const twoLists = window.location.href.split('html?id=');
    const recipeID = twoLists[1];
    return recipeID;
  },

  getRecipe : function getRecipe() {
    var result = this.getRecipeID();
    return jsonResponse[result];
    //(this.getRecipeID());
  },

  getName : function () {
    return this.getRecipe().name;
  },

  getGenre : function () {
    return this.getRecipe().genre;
  },

  getDescription : function () {
    return this.getRecipe().description;
  },

  getImg : function () {
    return 'img/'+this.getRecipe().id+'.jpg';
  },

  getServings : function () {
    return this.getRecipe().servings;
  },

  getTime : function () {
    return this.getRecipe().time;
  },

  getDifficulty : function () {
    return this.getRecipe().difficulty;
  },

  getIngredients : function () {
    return this.getRecipe().ingredients;
  }
}

    // static getRecipe(e) {
      // const recipeObject = (response.recipes.filter(function (e) {
        // return e.id ===
      // }))
    // }
//get recipe object using recipe id
    // var recipeObject = (response.recipes.filter(function(e) {
      // return e.id == recipeID;
    // }))[0];
//change page title to first recipe name
function fillRecipePage(response) {
  //get recipe id from url
    Controller.getRecipeID();
// document.title = recipeObject.name;
//put in an image of the recipe
  // document.body.innerHTML = '<h1>'+recipeObject.name+'</h1><img src="img/'+recipeObject.id+'.jpg">'
};
