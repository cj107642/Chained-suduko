function Board(size) {
  this.size = size;
  this.circles = [];
  this.connecitons = {};

  var number = 0;
  var lastLine = null;

  this.existsInRow = function (row, number) {
    var rowLength = this.circles.length - row * this.size + 1;
    for (var i = 0; i < rowLength; i++) {
      var index = row * this.size + i;
      if ((this.circles[index] || {}).number == number) {
        return true;
      }
    }

    return false;
  };

  this.existsInColumn = function (column, number) {
    var columnLength = Math.floor(this.circles.length / 7) + 1;
    for (var i = 0; i < columnLength; i++) {
      var index = i * this.size + column;
      if ((this.circles[index] || {}).number == number) {
        return true;
      }
    }

    return false;
  };

  this.generateBoard = function () {
    var startArray = [];
    for (var i = 0; i < this.size; i++) {
      startArray.push(i + 1);
    }

    for (var i = 0; i < this.size * this.size; i++) {
      var currentLine = Math.floor(i / 7);
      if (currentLine != lastLine) {
        lastLine = Math.floor(i / 7);
      }

      if (currentLine == 0) {
        number = startArray.splice(
          Math.floor(Math.random() * startArray.length),
          1
        )[0];
      } else {
        var found = false;
        var row = Math.floor(i / 7);
        var col = i % 7;
        var numberArray = [];
        for (var j = 0; j < this.size; j++) {
          numberArray.push(j + 1);
        }
        while (!found && numberArray.length) {
          number = numberArray.splice(
            Math.floor(Math.random() * numberArray.length),
            1
          )[0];
          if (
            !this.existsInRow(row, number) &&
            !this.existsInColumn(col, number)
          ) {
            found = true;
          }
        }
      }

      var x = Math.floor(width / 2) + Math.floor(i % 7) * width;
      var y = Math.floor(height / 2) + Math.floor(i / 7) * height;
      var line = Math.floor(i / 7);
      var circle = new SudukoCircle(x, y, radius, "black", number, line, size);
      this.circles.push(circle);
    }
  };

  this.generateBoard();

  this.populateNeighbours = function () {
    this.circles.forEach((c, index) => {
      // Above
      var above = index - size;
      c.neighbours.push(this.circles[above]);
      // Below
      var below = index + size;
      c.neighbours.push(this.circles[below]);

      var outOfRightBounds = (index % size) + 1 > 6;
      if (!outOfRightBounds) {
        // Right
        var right = index + 1;
        c.neighbours.push(this.circles[right]);

        // Below Right
        var belowRight = index + 1 + size;
        c.neighbours.push(this.circles[belowRight]);

        // Above Right
        var aboveRight = index + 1 - size;
        c.neighbours.push(this.circles[aboveRight]);
      }

      var outOfLeftBounds = (index % size) - 1 < 0;
      if (!outOfLeftBounds) {
        // Left
        var left = index - 1;
        c.neighbours.push(this.circles[left]);

        // Below Left
        var belowLeft = index - 1 + size;
        c.neighbours.push(this.circles[belowLeft]);

        // Above Left
        var aboveLeft = index - 1 - size;
        c.neighbours.push(this.circles[aboveLeft]);
      }

      // All undefined neighbours are index of out bounds.
      c.neighbours = c.neighbours.filter(function (x) {
        return x !== undefined;
      });
    });
  };

  this.addPathDistinct = function (path, node) {
    var found = path.find((x) => x.id === node.id);

    if (!found) {
      path.push(node);
    }
  };

  this.RandomHexValue = function () {
    return Math.floor(Math.random(0) * 16)
      .toString(16)
      .toUpperCase();
  };

  this.generateRandomHexColor = function () {
    return (
      "#" +
      this.RandomHexValue() +
      this.RandomHexValue() +
      this.RandomHexValue() +
      this.RandomHexValue() +
      this.RandomHexValue() +
      this.RandomHexValue()
    );
  };

  this.uniqueColorsPerConnection = {};
  this.connectCircle = function (node, path) {
    if (path.length >= 7) {
      return path;
    }

    var clonedNeighbours = node.neighbours.slice();

    // This is for debugging to paint the current node with yellow and the neighbours in purple.
    node.color = "yellow";
    node.draw();
    clonedNeighbours.forEach((x) => {
      x.draw();
    });

    //Itterate trough all the nodes neighbours to se if we can connect with it.
    var found = false;
    var searching = true;
    while (searching && clonedNeighbours.length) {
      neighbour = clonedNeighbours.splice(
        Math.floor(Math.random() * clonedNeighbours.length),
        1
      )[0];

      if (node.connectionId && neighbour.connectionId) {
        continue;
      }

      if (neighbour.connectionId && !node.connectionId) {
        // Finding all the nodes in the path, to see if it's full or if we can add our node to it.
        var connections = this.circles.filter(
          (x) => x.connectionId === neighbour.connectionId
        );

        if (connections.length < 7) {
          node.connectionId = neighbour.connectionId;
          node.color = this.uniqueColorsPerConnection[node.connectionId];
          neighbour.color = this.uniqueColorsPerConnection[node.connectionId];
          node.draw();
          neighbour.draw();
          this.addPathDistinct(path, node);
          this.addPathDistinct(path, neighbour);
          connections.forEach((x) => this.addPathDistinct(path, x));

          node = neighbour;
          found = true;
          searching = false;
          break;
        }
      }

      if (!node.connectionId) {
        node.connectionId = Math.floor(Math.random() * 1000);
      }

      neighbour.connectionId = node.connectionId;
      if (!this.uniqueColorsPerConnection[node.connectionId]) {
        this.uniqueColorsPerConnection[node.connectionId] =
          this.generateRandomHexColor();
      }

      node.color = this.uniqueColorsPerConnection[node.connectionId];
      neighbour.color = this.uniqueColorsPerConnection[node.connectionId];
      node.draw();
      neighbour.draw();
      this.addPathDistinct(path, node);
      this.addPathDistinct(path, neighbour);
      node = neighbour;
      found = true;
      searching = false;
      break;
    }

    if (!found || path.length >= 7) {
      return path;
    }

    return this.connectCircle(node, path);
  };

  this.buildPath = function () {
    var paths = []

    while(this.circles.filter(x => !x.connectionId).length > 0){
      var node = this.circles.find(x => !x.connectionId);
      
      var path =  this.connectCircle(node, []);
      for (var i = 0; i < path.length - 1; i++) {
        var a = path[i];
        var b = path[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        a.draw();
        b.draw();
      }
      paths.push(path)
    }

    console.log("paths", paths);
  };

  this.draw = function () {
    this.circles.forEach((circle) => {
      circle.draw();
    });
  };

  this.getConnections = function () {
    return this.connections;
  };

  this.addConnection = function (circle) {
    if (!this.connections[circle.connectionId]) {
      this.connections[circle.connectionId] = [];
    }
    this.connections[circle.connectionId].push(circle);
  };

  this.update = function () {};

  this.openSelectNumbers = function (sc) {
    var x = this.x;
    var y = this.y + this.radius;
    for (var i = 0; i < this.size; i++) {
      console.log("x", x);
      console.log("y", y);
      ctx.save();
      ctx.translate(x, y);
      ctx.fillRect(0, 0, 20, 20);
      ctx.fill();
      ctx.restore();
    }
  };
}
