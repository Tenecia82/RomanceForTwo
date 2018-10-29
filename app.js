'use strict';

// Define Global Variables
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let container = document.querySelector('.container');
let eat = document.querySelector('.eat');
let play = document.querySelector('#play');

$(document).ready(function(){

  // Load all event listeners
  loadEventListeners();
  
});

// Load all event listeners
function loadEventListeners() {

  //Left Side Screen Effects
  left.addEventListener('mouseenter', () => {
    container.classList.add('hover-left');
  });

  left.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left');
  });
  //Right Side Screen Effects
  right.addEventListener('mouseenter', () => {
    container.classList.add('hover-right');
  });

  right.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right');
  });

}