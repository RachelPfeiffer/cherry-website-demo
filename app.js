//open the searchbox when you click the magnifying glass
const magnifyer = document.querySelector('.header-search-trending');
const searchWindow = document.querySelector('#search-box');
magnifyer.addEventListener('click', function () {
  searchWindow.classList.add('in');
});

//close the searchbox when you click the x
const exit = document.querySelector('.fa-times');
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
const hamburgur = document.querySelector('.fa-bars');
const navMenu = document.querySelector('nav');
const blackHead = document.querySelector('.black-header')
hamburgur.addEventListener('click', function () {
  navMenu.classList.toggle('in');
  blackHead.classList.toggle('out');
})

//parse the json info
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '/data/recipes.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

var body = document.querySelector('body');
console.log(body);
//

//creates a recipe square on the home screen for each recipe
loadJSON(function(json) {
  json.recipes.forEach(function (recipe) {
    const newRecipeBox = document.createElement('div');
    newRecipeBox.classList = "recipe-box";
    body.appendChild(newRecipeBox);
  });
});
