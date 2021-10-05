import { v4 as uuid } from 'uuid'

export class SudukoCircle {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  value: number;
  size: number;
  neighbours:Array<SudukoCircle> = [];
  connectionId! : number;
  circle:Path2D;
  ctx:CanvasRenderingContext2D;
  constructor(x: number, y: number, radius: number, color: string, value: number, size: number,circle:Path2D,ctx:CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.value = value;
    this.size = size;
    this.id = uuid();
    this.circle = circle;
    this.ctx = ctx;
  }
 
  draw(color: string = ""): void {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.strokeStyle = color == "" ?  this.color : color;
    this.ctx.fillStyle = 'white';
    this.ctx.fill(this.circle);
    this.ctx.stroke(this.circle);
    this.ctx.font = "20px georgia";
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(this.value.toString(), -4, 4)
    this.ctx.restore();
  }

  isCordinateOnCircle(x: number, y: number): boolean {
    // x = x - marginLeft;
    // y = y + scrollTop;

    var bounds:any = {
      minX: this.x - this.radius,
      minY: this.y - this.radius,
      maxX: this.x + this.radius,
      maxY: this.y + this.radius,
    }

    var isInLeftBound :boolean= x >= bounds.minX;
    var isInRightBound: boolean = x <= bounds.maxX;

    var isInBottomBound: boolean = y >= bounds.minY;
    var isInTopBound: boolean = y <= bounds.maxY

    return isInLeftBound && isInRightBound && isInBottomBound && isInTopBound;
  }

  openSelectNumbers():void {
    let x:number = this.x;
    let y:number = this.y + this.radius
    for (let i:number = 0; i < this.size; i++) {
      console.log("x", x);
      console.log("y", y);
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.fillRect(0, 0, 20, 20);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}