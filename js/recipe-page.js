

// View:
const View = {
  init : function () {
    View.title();
    View.tooltips();
    View.printButton();
    View.header();
    View.recipeInfo();
    View.recipeIngredients();
    View.slideInBox();
    View.searchBox();
  },

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

printButton : function () {
  const printButton = document.querySelector('.print');
  printButton.addEventListener('click', function () {
    window.print();
  })
},

title : function fillTitle() {
  document.title = Controller.getName() +" - Zeen Food";
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

searchBox : function searchbox() {
const searchButton = document.querySelector('.fa-search');
const searchBox = document.getElementById('search-box');
searchButton.addEventListener('click', function () {
  searchBox.classList.add('in');
})

const xButton = document.querySelector('.fa-times');
  xButton.addEventListener('click', function () {
    searchBox.classList.remove('in');
  })
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
},

slideInBox : function () {
  const slideBox = document.querySelector('.more-recipes');
  window.addEventListener('scroll', function () {
    if (pageYOffset > 900) {
      slideBox.classList.add('in');
    } else {
      slideBox.classList.remove('in');
    }
  })
const xButton = document.querySelector('.more-recipes .fa-times');
  xButton.addEventListener('click', function () {
    slideBox.classList.add('hidden');
    console.log("hiding something from ya");
  })
}


}

// Controller:
const Controller = {
  init : function () {
      fetch('https://rachelpfeiffer.github.io/creme-website-demo/').then(function (response) {
      return response.json();
      }).then(function (jsonFile) {
      data = jsonFile.recipes;
      }).then(function () {
    View.init(data);
  });
},
  getRecipeID : function getRecipeID() {
    const twoLists = window.location.href.split('html?id=');
    const recipeID = twoLists[1];
    return recipeID;
  },

  getRecipe : function getRecipe() {
    var result = this.getRecipeID();
    return data[result];
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

//change page title to first recipe name
function fillRecipePage(response) {
  //get recipe id from url
    Controller.getRecipeID();
// document.title = recipeObject.name;
//put in an image of the recipe
  // document.body.innerHTML = '<h1>'+recipeObject.name+'</h1><img src="img/'+recipeObject.id+'.jpg">'
};
console.log("Linked page is linked");
data = 6;
Controller.init();
