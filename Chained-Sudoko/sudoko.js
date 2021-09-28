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

var node = new Path2D();
node.arc(0, 0, radius, 0, 2 * Math.PI);

var board = new Board(7);
board.populateNeighbours();
board.buildPath();

function draw() {
  board.draw();
  
  console.log("board", board);
}


function drawLines() {

  
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



}



var uniqueColorsPerConnection = {};

