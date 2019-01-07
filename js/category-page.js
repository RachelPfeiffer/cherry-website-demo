// getRecipeID : function getRecipeID() {
//   const twoLists = window.location.href.split('html?id=');
//   const recipeID = twoLists[1];
//   return recipeID;
// }
data = 6;
const Controller = {
  init : function () {
    fetch('https://rachelpfeiffer.github.io/creme-website-demo/data/recipes.json').then(function (response) {
    return response.json();
    }).then(function (jsonFile) {
    data = jsonFile.recipes;
    }).then(function () {
      View.init(data);
    });
  },
  getCategory : function () {
    const twoLists = window.location.href.split('html?id=');
    const category = twoLists[1];
    return category;
  },
  getRecipes : function (data) {
    let pageRecipes = [];
    for (recipe of data) {
        if (recipe.genre === Controller.getCategory()) {
          pageRecipes.push(recipe);
        }
      }
      return pageRecipes;
    }

};

const View = {
  init : function (data) {
    this.fillCategory();
    this.fillRecipeGrid(data);
  },

  fillCategory : function () {
    const title = document.querySelector('.category-name');
    title.innerText = Controller.getCategory();
  },

  fillRecipeGrid : function () {
    const recipeGrid = document.querySelector('.category-recipes');
    for (entry of Controller.getRecipes(data)) {
      const recipeTile = document.createElement('a');
      recipeTile.className = "category recipe-tile";
      recipeTile.href = './recipe.html?id='+entry.id;
      recipeTile.innerHTML = '<div class="recipe-name">'+entry.name+'</div><div class="description">'+entry.description+'</div>';
      const recipeImage = "url('img/"+entry.id+".jpg')";
      recipeTile.addEventListener('mouseover', function () {
        recipeTile.style.backgroundImage = recipeImage;
        console.log(recipeTile);
      });
      recipeTile.addEventListener('mouseout', function () {
        recipeTile.style.backgroundColor = "#383838";
        recipeTile.style.backgroundImage = "none";
      })
      recipeGrid.appendChild(recipeTile);
    }
  }
}

Controller.init();
