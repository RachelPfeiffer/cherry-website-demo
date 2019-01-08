console.log("mainpage is linked and operating");

const View = {
  init : function () {
    fetch('https://rachelpfeiffer.github.io/cherry-site-demo/data/recipes.json').then(function (response) {
    return response.json();
    }).then(function (jsonFile) {
    data = jsonFile.recipes;
    }).then(function () {
    View.fillMain(data,4,3,1);
    View.fillTrending(data);
    View.fillFeatured(data,5,1);
    View.fillMain(data,8,6,2);
    View.fillFeatured(data,9,2);
  });
  },

  fillMain : function (data,index, numberOfRecipes, sectionNumber) {
    const recipeSpot = document.querySelector('.recipes.section'+sectionNumber);
    const recipesToShow = data.slice(data.length-index,data.length-index+numberOfRecipes);
    for (recipe of recipesToShow) {
      const recipeTile = document.createElement('a');
      recipeTile.href = './recipe.html?id='+recipe.id;
      recipeTile.classList = "recipe-tile";
      recipeTile.innerHTML = '<div class="image-box"><img class="recipe-image" src="img/' + recipe.id + '.jpg" alt="' + recipe.name + '"></div><div class="recipe-info"><div class="recipe-genre">'+recipe.genre+'</div><div class="recipe-name">'+recipe.name+'</div></div>';
    //   const linkToRecipe = document.createElement('a');
    //   linkToRecipe.innerHTML = 'View Recipe';
    //   recipeSection.appendChild(recipeTile);
    recipeSpot.appendChild(recipeTile);
    }
  },

  fillTrending : function (data) {
    const trendingSection = document.querySelector('.trending-section.main-page');
     const trendingSectionRecipes = document.createElement('div');
     trendingSectionRecipes.classList = 'trending-recipes main-page';
     trendingSection.appendChild(trendingSectionRecipes);
     for (recipe of data) {
       if(recipe.trending) {
         const trendingRecipe = document.createElement('a');
         trendingRecipe.href = './recipe.html?id='+recipe.id;
         trendingRecipe.className = "trending-recipe";
         trendingRecipe.innerHTML = '<img class="recipe-image" src="img/' + recipe.id + '.jpg"><div class="trending recipe-name">' +recipe.name + '</div>';
         trendingSectionRecipes.appendChild(trendingRecipe);
         // urlForRestaurant(trendingRecipe);
       };
     }
  },

  fillFeatured : function (data, index, sectionNumber) {
    const featuredSection = document.querySelector('.featured.section'+sectionNumber);
    const featuredRecipe = data[data.length-index];
    const newRecipe = document.createElement('a');
    newRecipe.className = "featured-recipe";
    newRecipe.href = './recipe.html?id='+featuredRecipe.id;
    newRecipe.innerHTML = '<div class="recipe-genre">'+featuredRecipe.genre+'</div><div class="recipe-name">'+featuredRecipe.name+'</div><div class="description">'+featuredRecipe.description+'</div>';
    featuredSection.appendChild(newRecipe);
    featuredSection.style.backgroundImage = "url('img/"+featuredRecipe.id+".jpg')"
  }
}

data = 6;
View.init();
