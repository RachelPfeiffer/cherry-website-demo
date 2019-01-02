const SharedController = {
  fillMainPage : function fillMainPage() {
    fetch('/data/recipes.json').then(function (response) {
    return response.json();
    }).then(function (jsonFile) {
    jsonResponse = jsonFile.recipes;
    }).then(function () {
      SharedView.init(jsonResponse);
      SharedController.getAllGenres(jsonResponse.recipes);
    });
  },

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
      }
      // if search text is found in the list of properties, return that as results
        if ((properties.join(' ')).indexOf(input) != -1) {
          results.push(recipe);
        };
    };
return results;

},

getInput: function () {
  const input = document.querySelector('.search-input').value;
    return input;
},

  getAllGenres : function() {
    const genres = new Set();
    for (recipe of jsonResponse) {
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
  init : function (jsonResponse) {
    SharedView.hamburger();
    SharedView.navbar(jsonResponse);
    SharedView.navbarHover(jsonResponse);
    SharedView.topButton();
    SharedView.tooltip();
    SharedView.searchInOut();
    SharedView.runSearch();
  },

  hamburger : function () {
    const hamburger = document.querySelector('.fa-bars');
    const slideInBox = document.querySelector('.slide-in');
    const main = document.querySelector('main');
    // listen for clicks
    document.addEventListener('click', function (e) {
      console.log(e.target.classList);
      // check if slide-in box is showing yet
        if(slideInBox.classList.contains('in')) {
          // if the user clicks the burger or an empty spot, make the slide-in disappear
          if (e.target.classList.contains('fa-bars') || e.target.classList.value === "") {
            slideInBox.classList.remove('in');
            main.classList.remove('hidden');
        }
      } else if (e.target.classList.contains('fa-bars')) {
        console.log("clicked that burger");
        slideInBox.classList.add('in');
        main.classList.add('hidden');
      };
    });


    // TODO: get the slide in box to disappear when you click awa

  },
  navbar: function (response) {
  //Fill large navbar
    const categoryList = document.querySelectorAll('.nav-cats');
    for (list of categoryList) {
    const genres = SharedController.getAllGenres(response);
    // create category buttons
    for (genre of genres) {
      const category = document.createElement('li');
      category.classList = "cat";
      category.innerHTML = '<a href="./category-page.html?id='+genre+'"><span class="genre-name">' + genre + '</span></a><div class="genre-recipes"></div>';
      list.appendChild(category);
    }
    const about = document.createElement('li');
    about.classList =  "cat";
    about.innerHTML = '<a href="./about.html"><span class="genre-name">About Me</span></a>';
    list.appendChild(about);
    const contact = document.createElement('li');
    contact.classList =  "cat";
    contact.innerHTML = '<a href="./contact.html"><span class="genre-name">Contact</span></a>';
    list.appendChild(contact);
  }
},

// on hover, show recipes that match category name
  navbarHover: function(response) {
    const categoryBoxes = document.querySelectorAll('.large-screen-nav .cat');
    for (category of categoryBoxes) {
      const genreName = category.querySelector('.genre-name');
      const recipeBox = category.querySelector('.genre-recipes');
      // put the category name at the top of the hover box
      const recipeBoxCat = document.createElement('h1');
      recipeBoxCat.innerText = genreName.innerText;
      recipeBoxCat.className = 'genre-box-name';
      if (recipeBox) {
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
  const magnifyers = document.querySelectorAll('.fa-search');
  const footerSearch = document.querySelector('.search.name')
  const searchWindow = document.querySelector('#search-box');
  const exit = document.querySelector('.fa-times.search');

  for(magnifyer of magnifyers) {
    magnifyer.addEventListener('click', function () {
      searchWindow.classList.add('in');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
  }
  footerSearch.addEventListener('click', function () {
    searchWindow.classList.add('in');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })

  exit.addEventListener('click', function () {
    searchWindow.classList.remove('in');
    document.querySelector('#search-results-number').innerText = "0";
    document.querySelector('.search-results-area').innerText = '';
    if (document.querySelector('.search-input').value) {
      document.querySelector('.search-input').value = '';
    }
  })
},

runSearch : function () {
  // run search functionality
  const searchText = document.querySelector('.search-input');
  searchText.addEventListener('keyup', SharedView.fillResults)
},

topButton : function () {
  // scroll back to top when click the top button in the footer
  const topButton = document.querySelector('.top');
  topButton.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
},

fillResults : function () {
  const results = SharedController.search(jsonResponse,SharedController.getInput());
  const resultSection = document.querySelector('.search-results-area');
  const numOfResults = document.querySelector('#search-results-number');
  numOfResults.innerText = results.length;
  resultSection.innerHTML = '';

  for (result of results) {
    const resultBox = document.createElement('div');
    resultBox.className = "result-box";
    resultBox.innerHTML = '<a href="./recipe.html?id='+result.id+'"><img src="img/'+result.id+'.jpg" width="50px" height="50px"><div>'+result.name+'</div></a>';
    resultSection.appendChild(resultBox);
  }
  if (document.querySelector('.search-input').value.length === 0) {
    resultSection.innerHTML = '';
    numOfResults.innerText = 0;
  }
}

}

// Fill all shared functionality
let jsonResponse = 6;
SharedController.fillMainPage();
