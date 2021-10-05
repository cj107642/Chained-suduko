import { SudukoCircle } from './SudukoCircle'
import { GenerateRandomHexColor } from "./misc"

export class Board {
  size: number;
  width: number;
  height: number;
  radius: number;
  circles: Array<SudukoCircle>;
  ctx: CanvasRenderingContext2D;
  uniqueColors: any = {};

  constructor(size: number, width: number, height: number, radius: number, ctx: CanvasRenderingContext2D) {
    this.size = size;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.radius = radius;
    this.circles = [];
  }

  existsInRow(row: number, nodeValue: number): boolean {
    let rowLength: number = this.circles.length - row * this.size + 1;
    for (let i: number = 0; i < rowLength; i++) {
      let index: number = row * this.size + i;
      if ((this.circles[index] || {}).value == nodeValue) {
        return true;
      }
    }

    return false;
  };

  existsInColumn(column: number, nodeValue: number): boolean {
    let columnLength: number = Math.floor(this.circles.length / 7) + 1;
    for (let i: number = 0; i < columnLength; i++) {
      let index: number = i * this.size + column;
      if ((this.circles[index] || {}).value == nodeValue) {
        return true;
      }
    }

    return false;
  }

  generateBoard(): void {
    let node = new Path2D();
    node.arc(0, 0, this.radius, 0, 2 * Math.PI);
    for (let i = 0; i < this.size * this.size; i++) {
      let found: boolean = false;
      let row: number = Math.floor(i / 7);
      let col: number = i % 7;
      let numberArray: Array<number> = [];
      let value: number = 0;
      for (let j = 0; j < this.size; j++) {
        numberArray.push(j + 1);
      }

      while (!found && numberArray.length) {
        value = numberArray.splice(
          Math.floor(Math.random() * numberArray.length),
          1
        )[0];
        if (!this.existsInRow(row, value) &&
          !this.existsInColumn(col, value)
        ) {
          found = true;
        }
      }

      let x = Math.floor(this.width / 2) + Math.floor(i % 7) * this.width;
      let y = Math.floor(this.height / 2) + Math.floor(i / 7) * this.height;
      let circle = new SudukoCircle(x, y, this.radius, "black", value, this.size, node, this.ctx);
      this.circles.push(circle);
    }
  };

  populateNeighbours(): void {
    this.circles.forEach((c, index) => {
      // Above
      var above = index - this.size;
      c.neighbours.push(this.circles[above]);
      // Below
      var below = index + this.size;
      c.neighbours.push(this.circles[below]);

      var outOfRightBounds = (index % this.size) + 1 > 6;
      if (!outOfRightBounds) {
        // Right
        var right = index + 1;
        c.neighbours.push(this.circles[right]);

        // Below Right
        var belowRight = index + 1 + this.size;
        c.neighbours.push(this.circles[belowRight]);

        // Above Right
        var aboveRight = index + 1 - this.size;
        c.neighbours.push(this.circles[aboveRight]);
      }

      var outOfLeftBounds = (index % this.size) - 1 < 0;
      if (!outOfLeftBounds) {
        // Left
        var left = index - 1;
        c.neighbours.push(this.circles[left]);

        // Below Left
        var belowLeft = index - 1 + this.size;
        c.neighbours.push(this.circles[belowLeft]);

        // Above Left
        var aboveLeft = index - 1 - this.size;
        c.neighbours.push(this.circles[aboveLeft]);
      }

      // All undefined neighbours are index of out bounds.
      c.neighbours = c.neighbours.filter(function (x) {
        return x !== undefined;
      });
    });
  };

  connectCircle(node: SudukoCircle, path: Array<SudukoCircle>): Array<SudukoCircle> {
    if (path.length >= 7) {
      return path;
    }

    var clonedNeighbours = node.neighbours.slice();

    var found = false;
    var searching = true;
    while (searching && clonedNeighbours.length) {
      let neighbour: SudukoCircle = clonedNeighbours.splice(
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
          node.color = this.uniqueColors[node.connectionId];
          neighbour.color = this.uniqueColors[node.connectionId];
          node.draw();
          neighbour.draw();
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
      if (!this.uniqueColors[node.connectionId]) {
        this.uniqueColors[node.connectionId] =
          GenerateRandomHexColor();
      }

      node.color = this.uniqueColors[node.connectionId];
      neighbour.color = this.uniqueColors[node.connectionId];
      node.draw();
      neighbour.draw();
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

  buildPath(): void {
    var paths = []

    while (this.circles.filter(x => !x.connectionId).length > 0) {
      let node: SudukoCircle = this.circles.find(x => !x.connectionId) as SudukoCircle;

      var path = this.connectCircle(node, []);
      for (var i = 0; i < path.length - 1; i++) {
        var a = path[i];
        var b = path[i + 1];
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.stroke();
        a.draw();
        b.draw();
      }
      paths.push(path)
    }

    console.log("paths", paths);
  };

  draw(): void {
    this.circles.forEach((circle) => {
      circle.draw();
    });
  };
};