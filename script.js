$(document).ready(function() {

  var alive = true;

  var snake = {
    location: [[20,20]],
    direction: "right",
    size: 1
  };
  var food = {
    location: [20,20],
  };

  var myTimeout;
  var currentDimension;
  var lastBodyPiece;

  $("#continue").hide();

  function render(dimension) {

    currentDimension = dimension;

    var containerWidth = (dimension * 15).toString();
    $(".content").css('width', containerWidth);

    for (row = 1; row <= dimension; row++) {
      $(".content").append('<div class="row"></div>');
    }
    for (col = 1; col <= dimension; col++) {
      $(".row").append('<div class="cell col"></div>');
    }
    $(".content").append("<button id='continue'>Try Again</button>");
    $("#continue").hide();

    var randomCell = [(Math.floor(Math.random() * (dimension - 1)) + 1), (Math.floor(Math.random() * (dimension - 1)) + 1)];
    $(".row:nth-of-type("+randomCell[0]+") > .col:nth-of-type("+randomCell[1]+")").addClass("snake");
    snake.location[0] = randomCell;

    var randomCell = [(Math.floor(Math.random() * (dimension - 1)) + 1), (Math.floor(Math.random() * (dimension - 1)) + 1)];
    $(".row:nth-of-type("+randomCell[0]+") > .col:nth-of-type("+randomCell[1]+")").addClass("food");
    food.location = randomCell;

    loopTimeout();
  }

  $("body").keydown(function(input) {
    if (input.which == 40) {
      snake.direction = "down";
    }
    if (input.which == 39) {
      snake.direction = "right";
    }
    if (input.which == 38) {
      snake.direction = "up";
    }
    if (input.which == 37) {
      snake.direction = "left";
    }
  });

  function loopTimeout() {
    if (alive) {
      myTimeout = setTimeout(function() {
        move();
        loopTimeout();
      }, 250);
    }
  }

  function move() {
    lastBodyPiece = snake.location[snake.location.length - 1].toString();
    lastBodyPiece = JSON.parse("[" + lastBodyPiece + "]");

    for (var i = snake.location.length - 1; i > 0; i--) {
      snake.location[i] = snake.location[i-1].toString();
      snake.location[i] = JSON.parse("[" + snake.location[i] + "]");
      console.log(snake.location[i] + " "+i);
    }

    switch (snake.direction) {
      case "right":
        snake.location[0][1] = snake.location[0][1] + 1;
        break;
      case "left":
        snake.location[0][1] = snake.location[0][1] - 1;
        break;
      case "up":
        snake.location[0][0] = snake.location[0][0] - 1;
        break;
      case "down":
        snake.location[0][0] = snake.location[0][0] + 1;
        break;
    }

    $(".snake").removeClass('snake');
    for (var i = 0; i < snake.location.length; i++) {
      $(".row:nth-of-type("+snake.location[i][0]+") > .col:nth-of-type("+snake.location[i][1]+")").addClass('snake');
    }

    if (snake.location[0][1] > $(".row:first-of-type > .col").length ||
        snake.location[0][1] < 1 ||
        snake.location[0][0] < 1 ||
        snake.location[0][0] > $(".row").length)
    {
      clearTimeout(myTimeout);
      alive = false;
      $("#continue").show();
    }

    if (snake.location[0][0] == food.location[0] && snake.location[0][1] == food.location[1]) {
      $(".food").removeClass('food');
      snake.size++;
      snake.location.push(lastBodyPiece);
      console.log(snake.location[0] + "      " +snake.location[snake.location.length - 1]);

      var randomCell = [(Math.floor(Math.random() * (currentDimension - 1)) + 1), (Math.floor(Math.random() * (currentDimension - 1)) + 1)];
      $(".row:nth-of-type("+randomCell[0]+") > .col:nth-of-type("+randomCell[1]+")").addClass("food");
      food.location = randomCell;
    }
    console.log("end of move");
  }

  $("body").on("click", "#continue", function() {
    $("#continue, .row").remove();
    snake.size = 1;
    alive = true;
    render(prompt("Input grid size", "20"));
  });

  render(prompt("Input grid size", "20"));


});
