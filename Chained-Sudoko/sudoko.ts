import { Board } from "./Board";
const size = 7;
const height = 800;
const width = 800;
const canvas = document.getElementById("suduko") as HTMLCanvasElement;

var marginLeftText = window.getComputedStyle(canvas).marginLeft;
var marginLeft = Math.floor(
  parseInt(marginLeftText.substring(0, marginLeftText.length - "px".length))
);
var scrollTop = canvas.scrollTop;
var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const radius = Math.floor(Math.floor(height/size) / 4);



var board = new Board(size, width, height, radius,ctx);
board.populateNeighbours();
board.buildPath();