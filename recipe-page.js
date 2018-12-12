fetch('/data/recipes.json').then(function (response) {
return response.json();
}).then(fillRecipePage);

//change page title to first recipe name
function fillRecipePage(response) {
  //get recipe id from url
    const twoLists = window.location.href.split('html?id=');
    const recipeID = twoLists[1];
    console.log(recipeID);
//get recipe object using recipe id
    var recipeObject = (response.recipes.filter(function(e) {
      return e.id == recipeID;
    }))[0];
document.title = recipeObject.name;
//put in an image of the recipe
  document.body.innerHTML = '<h1>'+recipeObject.name+'</h1><img src="img/'+recipeObject.id+'.jpg">'
};

    //if(window.location.href.indexOf("r") > -1) {
      // alert("your url contains the name franky");
    //}
//f});
