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


// View:
const View = {
  tooltips: function () {
//Get Tooltips to follow the mouse
var tooltip = document.querySelectorAll('.tooltip');

document.addEventListener('mousemove', fn, false);

function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = (e.pageX-20) + 'px';
        tooltip[i].style.top = (e.pageY+30) + 'px';
    }
}
},

navbar: function () {
//Fill large navbar
console.log("navbar");
},

title: function fillTitle() {
  const titleSection = document.querySelector('.recipe-title');
  titleSection.innerText = Controller.getTitle();
},


}

// Controller:
const Controller = {
  getRecipeID : function getRecipeID() {
    const twoLists = window.location.href.split('html?id=');
    const recipeID = twoLists[1];
    return recipeID;
  },

  getRecipe : function getRecipe() {
    var result = this.getRecipeID();
    return jsonResponse[result];
    //(this.getRecipeID());
  },

  getTitle : function getTitle() {
    const currentRecipe = this.getRecipe();
    return currentRecipe.name;
  }
}

    // static getRecipe(e) {
      // const recipeObject = (response.recipes.filter(function (e) {
        // return e.id ===
      // }))
    // }
//get recipe object using recipe id
    // var recipeObject = (response.recipes.filter(function(e) {
      // return e.id == recipeID;
    // }))[0];
//change page title to first recipe name
function fillRecipePage(response) {
  //get recipe id from url
    Controller.getRecipeID();
// document.title = recipeObject.name;
//put in an image of the recipe
  // document.body.innerHTML = '<h1>'+recipeObject.name+'</h1><img src="img/'+recipeObject.id+'.jpg">'
};
