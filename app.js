//open the searchbox when you click the magnifying glass
const hamburger = document.querySelector('.header-search-trending');
const searchWindow = document.querySelector('#search-box');
hamburger.addEventListener('click', function () {
  searchWindow.classList.add('in');
});

//close the searchbox when you click the x
const exit = document.querySelector('.fa-times');
exit.addEventListener('click', function () {
  searchWindow.classList.remove('in');
});
