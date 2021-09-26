function SudukoCircle (x, y, radius, color, number, line, size) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.number = number;
    this.startNumber = number;
    this.line = line
    this.size = size;
    this.potentialnumbers = []
    this.selected = false;
 
    this.draw = function(){
           ctx.save();
           ctx.translate(this.x, this.y);
           ctx.strokeStyle = this.color;
           ctx.fillStyle = 'white';
           ctx.fill(circle);
           ctx.stroke(circle);
           ctx.font = "20px georgia";
           ctx.fillStyle = 'black';
           ctx.fillText(number,-4,4)
           ctx.restore();
    }
 
 
    this.isCordinateOnCircle = function(x,y){
     x = x - marginLeft;
     y = y + scrollTop;
       var bounds = {
           minX : this.x - this.radius,
           minY : this.y - this.radius,
           maxX : this.x + this.radius,
           maxY : this.y + this.radius,
       }
 
       bounds.minXBound = x >= bounds.minX;
       bounds.maxXBound = x <= bounds.maxX,
           
       bounds.minYBound =  y >= bounds.minY,
       bounds.maxYBound =  y <= bounds.maxY
       
       // console.log("bounds", bounds);
       return bounds.minXBound && bounds.minYBound && bounds.maxXBound && bounds.maxYBound;
    }
 
    this.update = function(){
    }

    this.openSelectNumbers = function(sc){
        var x = this.x;
        var y = this.y + this.radius
        for(var i = 0; i < this.size; i++){
            console.log("x", x);
            console.log("y", y);
            ctx.save();
            ctx.translate(x,y);
            ctx.fillRect(0,0,20,20);
            ctx.fill();
            ctx.restore();
        }
    }
 }