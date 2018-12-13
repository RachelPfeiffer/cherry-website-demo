let jsonResponse;
// Model:
fetch('/data/recipes.json').then(function (response) {
return response.json();
}).then(function (jsonFile) {
  jsonResponse = jsonFile.recipes;
});


// View:

//Get Tooltips to follow the mouse
var tooltip = document.querySelectorAll('.tooltip');

document.addEventListener('mousemove', fn, false);

function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = (e.pageX-20) + 'px';
        tooltip[i].style.top = (e.pageY+30) + 'px';
    }
}

//Fill large navbar
const navSection = document.getElementById('')

// Controller:
class Controller {
  static getRecipeID() {
    const twoLists = window.location.href.split('html?id=');
    const recipeID = twoLists[1];
    console.log(recipeID);

    // static getRecipe(e) {
      // const recipeObject = (response.recipes.filter(function (e) {
        // return e.id ===
      // }))
    // }
//get recipe object using recipe id
    // var recipeObject = (response.recipes.filter(function(e) {
      // return e.id == recipeID;
    // }))[0];
  }
}
//change page title to first recipe name
function fillRecipePage(response) {
  //get recipe id from url
    Controller.getRecipeID();
// document.title = recipeObject.name;
//put in an image of the recipe
  // document.body.innerHTML = '<h1>'+recipeObject.name+'</h1><img src="img/'+recipeObject.id+'.jpg">'
};
