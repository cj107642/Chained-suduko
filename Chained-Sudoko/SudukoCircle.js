import { v4 as uuid } from 'uuid';
export class SudukoCircle {
    constructor(x, y, radius, color, value, size, circle, ctx) {
        this.neighbours = [];
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
    draw(color = "") {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.strokeStyle = color == "" ? this.color : color;
        this.ctx.fillStyle = 'white';
        this.ctx.fill(this.circle);
        this.ctx.stroke(this.circle);
        this.ctx.font = "20px georgia";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.value.toString(), -4, 4);
        this.ctx.restore();
    }
    isCordinateOnCircle(x, y) {
        // x = x - marginLeft;
        // y = y + scrollTop;
        var bounds = {
            minX: this.x - this.radius,
            minY: this.y - this.radius,
            maxX: this.x + this.radius,
            maxY: this.y + this.radius,
        };
        var isInLeftBound = x >= bounds.minX;
        var isInRightBound = x <= bounds.maxX;
        var isInBottomBound = y >= bounds.minY;
        var isInTopBound = y <= bounds.maxY;
        return isInLeftBound && isInRightBound && isInBottomBound && isInTopBound;
    }
    openSelectNumbers() {
        let x = this.x;
        let y = this.y + this.radius;
        for (let i = 0; i < this.size; i++) {
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
