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
