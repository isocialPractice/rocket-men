$(document).ready(function () {
 // CONFIG 
 var usePNG = 0; // e.g. use png not svg
 //sets the variables
 var sec = 0;
 var min = 0;
 var limit = 300;
 var limitBad = 300;
 var limitUgly = 10000;
 var limitUgliest = 5000;
 var speed = 3000;
 var score = 0;
 var boxLeft = 20;
 var level = 1;
 var lives = 5;
 var mouseoff = 13;


 //sets the dificulty by changing the variables
 $('#easy').click(function () {
  speed = 4000;
  limit = 450;
  limitBad = 500;
  $('#easy').css('background-color', 'green');
  $('#easy').css('color', 'white');
  $('#hard').css('background-color', 'white');
  $('#hard').css('color', 'black');
  $('#extreme').css('background-color', 'white');
  $('#extreme').css('color', 'black');

 });

 $('#hard').click(function () {
  speed = 3500;
  limit = 350;
  limitBad = 350;
  $('#easy').css('background-color', 'white');
  $('#easy').css('color', 'black');
  $('#hard').css('background-color', 'green');
  $('#hard').css('color', 'white');
  $('#extreme').css('background-color', 'white');
  $('#extreme').css('color', 'black');
 });

 $('#extreme').click(function () {
  speed = 3000;
  limit = 300;
  limitBad = 350;
  $('#easy').css('background-color', 'white');
  $('#easy').css('color', 'black');
  $('#hard').css('background-color', 'white');
  $('#hard').css('color', 'black');
  $('#extreme').css('background-color', 'green');
  $('#extreme').css('color', 'white');
 });
 var box = $("#box");
 var boxSize = {
  height: box.height(),
  width: box.width()
 };
 //sets the timer
 $('#bottom').html(min + " " + sec);
 //colision in the game																	
 function testCollision(position1, size1, position2, size2, el) {
  if (((position1.left + size1.width) > position2.left)
   && ((position1.top + size1.height) > position2.top)
   && ((position2.left + size2.width) > position1.left)
   && ((position2.top + size2.height) > position1.top)) {
   if (el.hasClass('newBlock')) {
    score++;
    boxLeft--;
    $('#score').html('Score<br/>' + score);
    $('#boxLeft').html('Men Left<br/>' + boxLeft);
    el.remove();
    $('#box').css("width", "+=10px");
    boxSize.width = boxSize.width + 5;
    mouseoff += 1;
   } else if (el.hasClass('badBlock')) {
    score--;
    lives--;
    $('#score').html('Score<br/>' + score);
    el.remove();
    $('#box').css("width", "-=4px");
    boxSize.width = boxSize.width - 3;
    $('#lives').html('Shields<br/>' + lives);
    mouseoff -= 1;
   } else if (el.hasClass('lifeBlock')) {
    lives += 2;
    el.remove();
    $('#lives').html('Shields<br/>' + lives);
   } else if (el.hasClass('noLifeBlock')) {
    lives -= 2;
    el.remove();
    $('#lives').html('Shields<br/>' + lives);
   }
   if (boxLeft === 0) {
    level++;
    speed -= 100;
    limit -= 10;
    limitBad -= 10;
    lives++;
    boxLeft = 20;
    $('#box').css('width', '20px');
    if (usePNG == 1) $("#box").css("background-image", "url('../Image/logo.png')");
    boxSize.width = 20;
    $('#level').html('Level<br/>' + level);
    $('#lives').html('Shields<br/>' + lives);
    clearInterval(dropBox);
    clearInterval(baddropBox);
    mouseoff = 13;
    $('#other').css('width', '100%');
    //calls function again
    function fallBlock(el) {
     el.animate({
      'top': '90%'
     }, speed, function () {
      $(this).remove();
     });
    }

    dropBox = setInterval(function () {
     var new_block = $('.good').clone().addClass('newBlock').addClass('col').removeClass('good').css({
      top: '-5px',
      left: Math.floor(Math.random() * 95) + "%"
     }).insertAfter($('.good'));
     fallBlock(new_block);
    }, limit);
    //inserts the bad bricks		
    baddropBox = setInterval(function () {
     var badBlock = $('.bad').clone().addClass('badBlock').addClass('col').removeClass('bad').css({
      top: '-5px',
      left: Math.floor(Math.random() * 95) + "%"
     }).insertAfter($('.bad'));
     fallBlock(badBlock);
    }, limitBad);
   }
   if (lives == 0) {
    clearInterval(myCounter);
    clearInterval(dropBox);
    clearInterval(baddropBox);
    clearInterval(lifedropBox);
    clearInterval(nolifedropBox);
    $('#bottom').html(min + "          " + sec);
    $('#box').css('width', '20px');
    $('#score').html('Score<br/>' + score + '<br/>GAME OVER');
    $('.col').remove();
    boxSize.width = 20;
    $('#easy').click();
    min = 0;
    sec = 0;
    mouseoff = 13;
    $('#other').css('width', '100%');
   }
  }
 }
 //starts the game
 $('#start').click(function () {
  //resets variables
  score = 0;
  boxLeft = 20;
  level = 1;
  lives = 5;
  $('#score').html('Score<br/>' + score);
  $('#lives').html('Shields<br/>' + lives);
  //detects collision
  $('#level').html('Level<br/>' + level);
  $('#boxLeft').html('Men Left<br/>' + boxLeft);
  //sets the box catcher movement
  $('#other').mousemove(function (event) {
   $('#box').offset({
    left: (event.pageX - mouseoff)
   });
  });
  // clock timer

  myCounter = setInterval(function () {
   if (sec < 59) {
    sec += 1;
    $('#bottom').html(min + "          " + sec);
   } else {
    min += 1;
    sec -= 59;
    $('#bottom').html(min + "          " + sec);
   }
  }, 1000);

  function fallBlock(el) {
   el.animate({
    'top': '90%'
   }, speed, function () {
    $(this).remove();
   });
  }
  //inserts new good blocks

  dropBox = setInterval(function () {
   var new_block = $('.good').clone().addClass('newBlock').addClass('col').removeClass('good').css({
    top: '-5px',
    left: Math.floor(Math.random() * 95) + "%"
   }).insertAfter($('.good'));
   checkPNG(); // use pNG image not SVG
   fallBlock(new_block);
  }, limit);
  //inserts the bad bricks		

  baddropBox = setInterval(function () {
   var badBlock = $('.bad').clone().addClass('badBlock').addClass('col').removeClass('bad').css({
    top: '-5px',
    left: Math.floor(Math.random() * 95) + "%"
   }).insertAfter($('.bad'));
   checkPNG(); // use pNG image not SVG
   fallBlock(badBlock);
  }, limitBad);
  //inserts the lives blocks

  lifedropBox = setInterval(function () {
   var lifeBlock = $('.ugly').clone().addClass('lifeBlock').addClass('col').removeClass('ugly').css({
    top: '-5px',
    left: Math.floor(Math.random() * 95) + "%"
   }).insertAfter($('.ugly'));
   checkPNG(); // use pNG image not SVG
   fallBlock(lifeBlock);
  }, limitUgly);
  //inserts the no lives blocks

  nolifedropBox = setInterval(function () {
   var noLifeBlock = $('.ugliest').clone().addClass('noLifeBlock').addClass('col').removeClass('ugliest').css({
    top: '-5px',
    left: Math.floor(Math.random() * 95) + "%"
   }).insertAfter($('.ugliest'));
   checkPNG(); // use pNG image not SVG
   fallBlock(noLifeBlock);
  }, limitUgliest);
 });

 collisionBox = setInterval(function () {
  $('.col').each(function () {
   var new_blockSize = {
    height: $(this).height(),
    width: $(this).width()
   };

   // calls the function
   testCollision(box.position(), boxSize, $(this).position(), new_blockSize, $(this));
  });
 }, 10);
 //stops the game
 $('#stop').click(function () {
  min = 0;
  sec = 0;
  clearInterval(myCounter);
  clearInterval(dropBox);
  clearInterval(baddropBox);
  clearInterval(lifedropBox);
  clearInterval(nolifedropBox);
  $('#bottom').html(min + "          " + sec);
  $('#box').css('width', '20px');
  $('#easy').click();
  boxSize.width = 20;
  $('.col').remove();
  mouseoff = 13;
  $('#other').css('width', '100%');
 });
 function checkPNG() {
 if (usePNG == 1) {
   $("#box").css("background-image", "url('../Image/SpaceShip.png')");
   $(".newBlock").css("background-image", "url('../Image/SpaceManinaBubble.png')");
   $(".badBlock").css("background-image", "url('../Image/Rock.png')");
   $(".lifeBlock").css("background-image", "url('../Image/Mushroom.png')");
   $(".noLifeBlock").css("background-image", "url('../Image/BadMushroom.png')");
  }
 }
 checkPNG();
});