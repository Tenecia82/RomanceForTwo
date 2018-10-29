'use strict';
var z;
let appID = '27a174ce';
let appKey = '0b136be4f2b49a7cc16f34fd64eb8924';


$('#search1').on('click', function(event){
  event.preventDefault();
  $('.info1').empty();
  loadMovie();
});

const loadMovie = function() {
  let input = $('.input1').val().replace(' ', '+');
  $.ajax({
    type: "GET",
    url: `https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=${input}`,
    data: {
    },
    dataType: 'json',
    headers: {
      'X-Mashape-Key': 'W3trTwye33mshIvTXlVc7AoP1iXcp1tAHIUjsnHCucm6lmMqE9'
    },

    success: function(data) {
      $.each(data.results,function(index, result){

        $('.info1').append(`<p class="name">'${result.name}</p><br>`);

        $('.info1').append(`<img class="thumb" src="${result.picture}" alt="movie image"></a><br>`);


        let movie = result.locations.map(location => `<a href="${location.url}" target="_blank"><img class="location" src=${location.icon} alt="location icon"></a><br> `);
        
        $('.info1').append(movie);

      });
    },
    statusCode: {
      400: function() {
        alert('Bad Request');
      },

      statusCode: {
        500: function() {
          alert('Internal Server Error');
        }
      }
    },
  });
};

$('#search2').on('click', function(event){
  event.preventDefault();
  $('.info2').empty();
  let input = $('.input2').val().replace(' ', '+');
  
  let yummlyUrl=`https://api.yummly.com/v1/api/recipes?_app_id=${appID}&_app_key=+${appKey}&q=${input}&requirePictures=true&allowedCourse[]=course^course-Snacks`;

  $.getJSON(yummlyUrl, {
    //OPTIONS....
  }).done(function(data){
    
    $.each(data.matches,function(index, results){
      let divContents = '.info2';
      yummlyHtml(index, results, divContents);

    });
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


$('#search3').on('click', function(event){
  event.preventDefault();
  $('.info3').empty();
  loadQuote();
});

const loadQuote = function() {
  $.ajax({
    type: "GET",
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=10',
    data: {
    
    },
    dataType: 'json',
    headers: {
      'X-Mashape-Key': 'WEr1c45i8omshtZFF7NJ0cfx5s5kp1kk4TajsnFwo5S2IYWvFk'
    },
    success: function(data) {
      $.each(data,function(index, value){

        if (index == 10){
          return false;
        }
        let quote = value.quote;
        let movie = value.author;
        
        let z = index; 

        $('.info3').append(`<p class="quote"><span id="title">Quote:<span> ${quote} </p> <br>`);

        $('.info3').append(`<div class="view"><button class="answer">Movie</button>
        <br>
        <p id="quoteMovie${z}" class="movie">Movie: ${movie}</p></div>
        <br>`);
     
        $(`#quoteMovie${z}`).hide();


        $('.info3').on('click', 'button.answer',function(event){
          event.preventDefault();
          let z =index;
          $(this).siblings(`#quoteMovie${z}`).show();
        });
      });
    },
    statusCode: {
      400: function() {
        alert('Bad Request');
      },
      
      statusCode: {
        500: function() {
          alert('Internal Server Error');
        }
      }
    },
  });
};

const yummlyHtml = function(index, results, divContents){

  let name = results.recipeName;

  let ingredients = results.ingredients;

  let id = results.id;

  let image = results.imageUrlsBySize[90].replace('s90-c', 's320-c-rj-v1-e365');

  $(divContents).append(`<p class="name">${name}</p><br>`);

  $(divContents).append(`<a href="https://www.yummly.com/recipe/${id}" target="_blank"><img src="${image}" class="thumb" alt="dish image"></a><br>`);

  $(divContents).append(`<p class="ingredient">Ingredients:</p> <br>${ingredients.map(ingredient => `<li class="ingredients">${ingredient}</li>`).join('')} <br>`);
};

