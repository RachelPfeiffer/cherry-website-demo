
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
      category.innerHTML = '<span class="genre">' + genre + '</span><div class="genre-recipes"></div>';
      categoryList.appendChild(category);
      for (recipe of jsonResponse) {
        if (recipe.genre === genre) {
          const hoverRecipe = document.createElement('div');
          hoverRecipe.innerHTML = '<img class="hover-pic" src="img/'+recipe.id+'.jpg"><span>'+recipe.name+'</span>';
          hoverRecipe.classList = "hover-recipe";
          category.appendChild(hoverRecipe);
        }
      }
    }
    const about = document.createElement('li');
    about.classList =  "cat";
    about.innerText = "about me";
    categoryList.appendChild(about);
  }
}


console.log("shared sheet is linked and operating");
