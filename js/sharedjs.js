
let jsonResponse = 6;
fetch('/data/recipes.json').then(function (response) {
return response.json();
}).then(function (jsonFile) {
jsonResponse = jsonFile.recipes;
console.log(jsonResponse);
})


const SharedController = {

  search : function (response, input) {
    const results = [];
    // for each recipe object
    for (recipe of response) {
      // check the properties
      const properties = Object.values(recipe);
      // split the ingredients into a separate list of strings
      for (property of properties) {
        if (typeof property === "object") {
          for (ingredient of property) {
            properties.push(ingredient);
          }
        }
        // now join all the properties into one searchable string

      }
       // document.querySelector('.search-input');
      // textToSearchFor.addEventListener('keyup', function () {
        if ((properties.join(' ')).indexOf(input) != -1 && input.length>0) {
          results.push(recipe);
          // console.log(properties[0]);
          // console.log(properties);
          // console.log(recipe);
        };
      // })

    }
return results;
},

getInput: function () {
  const input = document.querySelector('.search-input').value;
  return input;
},

  getAllGenres : function(array) {
    const genres = new Set();
    for (recipe of array) {
      genres.add(recipe.genre);
    }
    return genres;
  },


  splitIntoWords : function (array) {
    let words = [];
    for (x of array) {
      const result = x.split(" ");
      for (y of result) {
        words.push(y);
      }
  }
  return words;
  },

  searchForText : function (string, searchText) {
    if (string.indexOf(searchText) != -1) {
      return string;
    };
  },

  searchInput : function (jsonResponse, input) {
    let searchResults = [];
    for (recipe of jsonResponse) {
      for (value of Object.values(recipe)) {
        if(typeof value === "object") {
          value = SharedController.splitIntoWords(value);
        };
        const results = SharedController.searchForText(jsonResponse, value);
        searchResults.push(results);
      }
    }
  }
}

const SharedView = {
  navbar: function (response) {
  //Fill large navbar
    const categoryList = document.querySelector('.nav-cats');
    const genres = SharedController.getAllGenres(response);
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
  navbarHover: function(response) {
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

      for (recipe of response) {
        if (recipe.genre.toUpperCase() === genreName.innerText) {
          const hoverRecipeBox = document.createElement('div');
          hoverRecipeBox.innerHTML = '<a class="hover-recipe" href="./recipe.html?id='+recipe.id+'"><img class="hover-pic" src = "img/' + recipe.id + '.jpg"><div class="nav-recipe-name">'+recipe.name+'</div></a>';
          hoverRecipeBox.className = "hover-recipe";
          recipeSection.appendChild(hoverRecipeBox);
        };
      }
    }
  },

  tooltip : function tooltip() {
  // //Get Tooltips to follow the mouse
  var tooltip = document.querySelectorAll('.tooltip');
  //
  document.addEventListener('mousemove', fn, false);
  //
  function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = (e.pageX-20) + 'px';
        tooltip[i].style.top = (e.pageY+30) + 'px';
    }
  }
},

searchInOut : function search() {
  const magnifyer = document.querySelector('.fa-search');
  const searchWindow = document.querySelector('#search-box');
  const exit = document.querySelector('.fa-times.search');

  magnifyer.addEventListener('click', function () {
    searchWindow.classList.add('in');
  });

  exit.addEventListener('click', function () {
    searchWindow.classList.remove('in');
    document.querySelector('#search-results-number').innerText = "0";
    document.querySelector('.search-results-area').innerHTML = "";
    document.querySelector('.search-input').value = '';
  })
},

fillResults : function () {
  const searchInput = document.querySelector('.search-input');
  console.log(searchInput);
  searchInput.addEventListener('keyup', function () {
    const results = SharedController.search(jsonResponse,SharedController.getInput());
    const resultSection = document.querySelector('.search-results-area');
    resultSection.innerHTML = '';
    const numOfResults = document.querySelector('#search-results-number');
    numOfResults.innerText = results.length;
    for (result of results) {
      const resultBox = document.createElement('div');
      resultBox.className = "result-box";
      resultBox.innerHTML = '<img src="img/'+result.id+'.jpg" width="50px" height="50px"><div>'+result.name+'</div>';
      resultSection.appendChild(resultBox);
      console.log(result.name);
  }
})
}
//
//   // let toSearch = userInput.value;
// // let  infoToSearchThrough = stuff.recipes;

// });
//

}


console.log("shared sheet is linked and operating");
SharedView.navbar(jsonResponse);
SharedView.navbarHover(jsonResponse);
