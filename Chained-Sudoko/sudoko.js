var size = 7;
var lines = [];
var height = Math.floor(800 / size);
var width = Math.floor(800 / size);
var canvas = document.getElementById("suduko");

var marginLeftText = window.getComputedStyle(canvas).marginLeft;
var marginLeft = Math.floor(
  parseInt(marginLeftText.substring(0, marginLeftText.length - "px".length))
);
var scrollTop = canvas.scrollTop;
var ctx = canvas.getContext("2d");

var radius = Math.floor(height / 4);

var circle = new Path2D();
circle.arc(0, 0, radius, 0, 2 * Math.PI);

var board = new Board(7);
board.populateNeighbours();

function draw() {
  board.draw();
  
  console.log("board", board);
  drawLines();
}

function drawLines() {

  // var couldBuildPaths = sudukoBoard.some((path, i) => {
  //   console.log("index", i);
  //   if (i === 48) {
  //     debugger;
  //   }
  //   var b = checkIfAbleToBuildPath(path, sudukoBoard);
  //   return b === false;
  // });

  // for (var i = 0; i < sudukoBoard.length - 1; i++) {
  //   var a = sudukoBoard[i];
  //   var b = sudukoBoard[i + 1];
  //   if (a.line === b.line) {
  //     ctx.beginPath();
  //     ctx.moveTo(a.x, a.y);
  //     ctx.lineTo(b.x, b.y);
  //     ctx.stroke();
  //     a.draw();
  //     b.draw();
  //   }
  // }

  var pathsWithoutConnections = board.circles.filter((x) => !x.connectionId);
  while (pathsWithoutConnections.length > 0) {
    checkIfAbleToBuildPath(pathsWithoutConnections[0], board.circles);
    pathsWithoutConnections = pathsWithoutConnections.filter(
      (x) => !x.connectionId
    );
  }

  var connections = {};
  board.circles.forEach((x) => {
    if (!connections[x.connectionId]) {
      connections[x.connectionId] = [];
    }

    connections[x.connectionId].push(x);
  });

  Object.keys(connections).forEach((key) => {
    for (var i = 0; i < connections[key].length - 1; i++) {
      var a = connections[key][i];
      var b = connections[key][i + 1];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      a.draw();
      b.draw();
    }
  });


  console.log("sudukoBoard", board); console.log("connections", connections);
}



function RandomHexValue() {
  return Math.floor(Math.random(0) * 16)
    .toString(16)
    .toUpperCase();
}

function generateRandomHexColor() {
  return (
    "#" +
    RandomHexValue() +
    RandomHexValue() +
    RandomHexValue() +
    RandomHexValue() +
    RandomHexValue() +
    RandomHexValue()
  );
}

var uniqueColorsPerConnection = {};

function checkIfAbleToBuildPath(circle, board) {
  console.log("circle", circle);
  console.log("board", board);
  var startLength = 0;
  if (circle.connectionId) {
    startLength = board.filter(function (x) {
      return (x.connectionId = circle.connectionId);
    }).length;
  }

  var connectionsToMake = size - 1 - startLength;
  var path = circle;
  var possibleToMakePath = true;
  for (var i = 0; i < connectionsToMake; i++) {
    var clonedNeighbours = path.neighbours.slice();
    path.color = "yellow";
    path.draw();
    clonedNeighbours.forEach((x) => {
      x.draw();
    });

    var found = false;
    var searching = true;
    while (searching && clonedNeighbours.length) {
      neighbour = clonedNeighbours.splice(
        Math.floor(Math.random() * clonedNeighbours.length),
        1
      )[0];

      if (path.connectionId && neighbour.connectionId) {
        continue;
      }

      if (neighbour.connectionId && !path.connectionId) {
        var connections = board.filter(
          (x) => x.connectionId === neighbour.connectionId
        );

        if (connections.length < 7) {
          path.connectionId = neighbour.connectionId;
          path.color = uniqueColorsPerConnection[path.connectionId];
          neighbour.color = uniqueColorsPerConnection[path.connectionId];
          i += connections.length;
          path.draw();
          neighbour.draw();
          path = neighbour;
          searching = false;
          found = true;
          break;
        }
      }

      if (!path.connectionId) {
        path.connectionId = Math.floor(Math.random() * 1000);
      }

      neighbour.connectionId = path.connectionId;
      if (!uniqueColorsPerConnection[path.connectionId]) {
        uniqueColorsPerConnection[path.connectionId] = generateRandomHexColor();
      }

      board.forEach((x) => {
        if (x.connectionId) {
          x.color = uniqueColorsPerConnection[x.connectionId];
        } else {
          x.color = "black";
          x.draw();
        }
      });
      path.color = uniqueColorsPerConnection[path.connectionId];
      neighbour.color = uniqueColorsPerConnection[path.connectionId];
      path.draw();
      neighbour.draw();
      path = neighbour;
      searching = false;
      found = true;
    }

    if (!found) {
      possibleToMakePath = false;
      break;
    }
  }
  return possibleToMakePath;
}
