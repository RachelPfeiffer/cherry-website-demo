
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

const SharedController = {

  getAllGenres : function () {
    const genres = new Set();
    for (recipe of jsonResponse) {
      genres.add(recipe.genre);
    }
    return genres;
},

  fillGenreRecipes : function () {
console.log("don't ever give up");
          // const hoverRecipe = document.createElement('div');
          // hoverRecipe.innerText = recipe.name;
          // genreDiv.appendChild(hoverRecipe);

      }
}

const SharedView = {
  navbar: function () {
  //Fill large navbar
    const categoryList = document.querySelector('.nav-cats');
    const genres = SharedController.getAllGenres();
    // create category buttons
    for (genre of genres) {
      const category = document.createElement('li');
      category.classList = "cat";
      category.innerHTML = '<span class="genre-name">' + genre + '</span><div class="genre-recipes"></div>';
      categoryList.appendChild(category);
    }
    const about = document.createElement('li');
    about.classList =  "cat";
    about.innerHTML = '<span class="genre-name">About Me</span><div class="genre-recipes"></div>';
    categoryList.appendChild(about);
  },

// on hover, show recipes that match category name
  navbarHover: function() {
    const categoryBoxes = document.querySelectorAll('.cat');
    for (category of categoryBoxes) {
      const genreName = category.querySelector('.genre-name');
      const recipeBox = category.querySelector('.genre-recipes');
      // put the category name at the top of the hover box
      const recipeBoxCat = document.createElement('h1');
      recipeBoxCat.innerText = genreName.innerText;
      recipeBoxCat.className = 'genre-box-name';
      recipeBox.appendChild(recipeBoxCat);

      // put a recipe section in the hover box
      const recipeSection = document.createElement('div');
      recipeSection.className = "hover-recipe-section";
      recipeBox.appendChild(recipeSection);

      for (recipe of jsonResponse) {
        if (recipe.genre.toUpperCase() === genreName.innerText) {
          const hoverRecipeBox = document.createElement('div');
          hoverRecipeBox.innerHTML = '<a class="hover-recipe" href="./recipe.html?id='+recipe.id+'"><img class="hover-pic" src = "img/' + recipe.id + '.jpg"><div class="nav-recipe-name">'+recipe.name+'</div></a>';
          hoverRecipeBox.className = "hover-recipe";
          recipeSection.appendChild(hoverRecipeBox);
        };
      }
    }
    // for (recipe of jsonResponse) {
    //   if (recipe.genre === genre) {
    //     const hoverRecipe = document.createElement('div');
    //     hoverRecipe.innerHTML = '<img class="hover-pic" src="img/'+recipe.id+'.jpg"><span>'+recipe.name+'</span>';
    //     hoverRecipe.classList = "hover-recipe";
    //     category.appendChild(hoverRecipe);
  }
}


console.log("shared sheet is linked and operating");
SharedView.navbar();
SharedView.navbarHover();
