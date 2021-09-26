
var size = 7;
var lines = [];
var height = Math.floor(800/size);
var width = Math.floor(800/size);
var canvas = document.getElementById('suduko');

var marginLeftText = window.getComputedStyle(canvas).marginLeft;
var marginLeft = Math.floor(parseInt(marginLeftText.substring(0,marginLeftText.length- "px".length)));
var scrollTop = canvas.scrollTop;
var ctx = canvas.getContext('2d');

var sudokoPath = [];
var radius = Math.floor((height)/4);

var colors = [
  "#004CA3",
  "#8A51A5",
  "#CB5E99",
  "#F47B89",
  "#FFA47E",
  "#FFD286",
  "#FFFFA6",
]

var circle = new Path2D();
circle.arc(0,0, radius, 0, 2 * Math.PI)

function draw() {

      generateBoard();

      console.log("sudokoPath",sudokoPath)
      for(var i = 0; i < sudokoPath.length; i++){
        sudokoPath[i].draw();
      }
      drawLines();
  }


  function drawLines(){



    for(var i = 0; i < sudokoPath.length-1; i++){
      findNeighbours(i,sudokoPath);
      var a = sudokoPath[i];
        var b = sudokoPath[i +1];
        if(a.line === b.line){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          a.draw();
          b.draw();
        }
    }
  }

  function findNeighbours (index,sudukoPaths){
      var row = Math.floor(index / size);
      var col =  index % size;
      var neighBours = [];
      var localSize = size -1;
      var path;
      if (row  > 0){
        path = sudukoPaths[index-size]
        if(!path){
          debugger;
        }
        neighBours.push(path)
      }

      if(row < localSize){
        path = sudukoPaths[index+size]
        if(!path){
          debugger;
        }
        neighBours.push(path)
      }

      if(col > 0){
        path = sudukoPaths[index-1]
        if(!path){
          debugger;
        }
        neighBours.push(path)
        if (row  > 0){
          path = sudukoPaths[index-1-size]
          if(!path){
            debugger;
          }
          neighBours.push(path)
        }
        if(row < localSize){
          path = sudukoPaths[index+1+size]
          if(!path){
            debugger;
          }
          neighBours.push(path)
        }
      }

      if(col < localSize){
        path = sudukoPaths[index+1]
        if(!path){
          debugger;
        }
        neighBours.push(path)
        if(row < localSize){
          path = sudukoPaths[index+1+size]
          if(!path){
            debugger;
          }
          neighBours.push(path)
        }
        if (row  > 0){
          path = sudukoPaths[index-1-size]
          if(!path){
            debugger;
          }
          neighBours.push(path)
        }
      }

      console.log("neighBours",neighBours)
  }

  function existsInRow(row, number){
    var rowLength = sudokoPath.length - row * 7 + 1;
    for(var i = 0; i < rowLength; i++){
      var index = row * 7 + i;
      if((sudokoPath[index] || {}).number == number){
        return true;
      } 
    }

    return false;
  }

  function existsInColumn(column, number){
    var columnLength = Math.floor(sudokoPath.length / 7) + 1
    for(var i = 0; i < columnLength; i++){
      var index = i * 7 + column
      if((sudokoPath[index] || {}).number == number){
        return true;
      } 
    }

    return false;
  }

  var number = 0;
  var lastLine = null;
  function generateBoard()
  {
    var startArray = [1,2,3,4,5,6,7];

    for(var i  = 0; i < size*size; i++){
      var currentLine = Math.floor(i/7);
      if(currentLine != lastLine)
        {
          lastLine = Math.floor(i/7);
        }

        if(currentLine == 0){
          number = startArray.splice(Math.floor(Math.random()*startArray.length),1)[0];
        }else {
          var found = false;
          var row = Math.floor(i / 7);
          var col = i % 7;
          var numberArray = [1,2,3,4,5,6,7];
          while(!found && numberArray.length){
              number = numberArray.splice(Math.floor(Math.random() * numberArray.length),1)[0];
            if(!existsInRow(row, number) && !existsInColumn(col, number)){
              found = true;
            }
          }
        }
      
        var x = Math.floor(width/2) + Math.floor(i%7)*width;
        var y = Math.floor(height/2) + Math.floor(i/7)*height;
        var line = Math.floor(i/7);
        var color = "red";
      sudokoPath.push(new SudukoCircle (x, y, radius, color, number, line, size))
  }
}


