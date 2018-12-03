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
console.log(resultOutput.textContent);
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
