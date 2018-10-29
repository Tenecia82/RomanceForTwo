'use strict';
let appID = '27a174ce';
let appKey = '0b136be4f2b49a7cc16f34fd64eb8924';


//Display Entree' Search
$('#search1').on('click', function(event){
  event.preventDefault();
  $('.info1').empty();
  let input = $('#input1').val().replace(' ', '+');
  let yummlyUrl=`https://api.yummly.com/v1/api/recipes?_app_id=${appID}&_app_key=${appKey}&q=${input}&requirePictures=true&excludedCourse[]=course^course-Dessert`;

  $.getJSON(yummlyUrl, {
    //OPTIONS....
  }).done(function(data){
    
    $.each(data.matches,function(index, results){
      
      let divContents = '.info1';

      yummlyHtml(index, results, divContents);

    })
  }).fail(function(data){

    if (data.status == 400){
      alert('Bad Request');
    }
    if (data.status == 409){
      alert('Request Limit Exceeded');
    }
    if (data.status == 500){
      alert('Internal Server Error');
    } 
  });
});

//Display Dessert Search
$('#search2').on('click', function(event){
  event.preventDefault();
  $('.info2').empty();

  let input = $('#input2').val().replace(' ', '+');
  let yummlyUrl=`https://api.yummly.com/v1/api/recipes?_app_id=${appID}&_app_key=${appKey}&q=${input}&requirePictures=true&allowedCourse[]=course^course-Dessert`;

  $.getJSON(yummlyUrl, {
    //OPTIONS....
  }).done(function(data){
    
    $.each(data.matches,function(index, results){
     
      let divContents = '.info2';

      yummlyHtml(index, results, divContents);
      

      
    })
  }).fail(function(data){

    if (data.status == 400){
      alert('Bad Request');
    }
    if (data.status == 409){
      alert('Request Limit Exceeded');
    }
    if (data.status == 500){
      alert('Internal Server Error');
    } 
  });
});

// Load Drink Recipes
$('#search3').on('click', function(event){
  event.preventDefault();
  $('.info3').empty();
  let tail = $('#select').val();

  let input = $('#input3').val().replace(' ', '&');;

  if(tail == 'cocktail'){
    let theCocktaildbUrl='https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + input;
    
    $.getJSON(theCocktaildbUrl, {
      //OPTIONS....
    }).done(function(data){
    
      $.each(data.drinks,function(index, drink){
    
        if (drink.strAlcoholic == 'Alcoholic'){

          let divSyntax = '.info3';

          beverage(index, drink, divSyntax);
        }

        if (index == 10){
          return false;
        }
      
      });
    
    })
      .fail(function(data){

        if (data.status == 400){
          alert('Bad Request');
        }
        if (data.status == 409){
          alert('Request Limit Exceeded');
        }
        if (data.status == 500){
          alert('Internal Server Error');
        } 
      });
  
  }
  if(tail == 'mocktail'){
 
    let theCocktaildbUrl='https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + input;
      
    $.getJSON(theCocktaildbUrl, {
      //OPTIONS....
    }).done(function(data){
      $.each(data.drinks,function(index, drink){
        if (drink.strAlcoholic == 'Non alcoholic'){
          let divSyntax = '.info3';

          beverage(index, drink, divSyntax);
        }

        if (index == 10){
          return false;
        }
      
      });
    
  
    })
      .fail(function(data){

        if (data.status == 400){
          alert('Bad Request');
        }
        if (data.status == 409){
          alert('Request Limit Exceeded');
        }
        if (data.status == 500){
          alert('Internal Server Error');
        } 
      });
  }
    


});

const yummlyHtml = function(index, results, divContents){

  let name = results.recipeName;

  let ingredients = results.ingredients;

  let id = results.id;

  let image = results.imageUrlsBySize[90].replace('s90-c','s320-c-rj-v1-e365');

  $(divContents).append(`<p class="name">${name}</p><br>`);

  $(divContents).append(`<a href="https://www.yummly.com/recipe/${id}" target="_blank"><img src="${image}" class="thumb" alt="dish image"></a><br>`);

  $(divContents).append(`<p class="ingredient">Ingredients:</p> <br>${ingredients.map(ingredient => `<li class="ingreients">${ingredient}</li>`).join('')} <br>`);
};


const beverage = function(index, drink, divSyntax){

  let name = drink.strDrink;

  let id = drink.idDrink;

  let image = drink.strDrinkThumb;


  $(divSyntax).append(`<p class="name">${name}</p><br>`);

  $(divSyntax).append(`<a href="https://www.thecocktaildb.com/drink.php?c=+${id} " target="_blank"><img src="${image}" class="thumb" alt="drink image"></a><br>`);
  let ingredient= true;
  let i = 0;
  $(divSyntax).append('<p class="ingredient"> Ingredients:</p>')
  while(ingredient){
    i = i + 1;
    ingredient = drink[`strIngredient${i}`];

    if(ingredient.length >= 2){
             
      $(divSyntax).append(`<li class="ingredients">${ingredient}</li>`);
    }
  }
};