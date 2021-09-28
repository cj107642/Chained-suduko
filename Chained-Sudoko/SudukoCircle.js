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
    this.neighbours = [];
    this.newGuid = function() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }

    this.id = this.newGuid();
    this.draw = function(color){
           ctx.save();
           ctx.translate(this.x, this.y);
           ctx.strokeStyle = color ?? this.color;
           ctx.fillStyle = 'white';
           ctx.fill(node);
           ctx.stroke(node);
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
 
       bounds.isInLeftBound = x >= bounds.minX;
       bounds.isInRightBound = x <= bounds.maxX,
           
       bounds.isInBottomBound =  y >= bounds.minY,
       bounds.isInTopBound =  y <= bounds.maxY
       
       // console.log("boisunds", bounds);
       return bounds.isInLeftBound && bounds.isInRightBound && bounds.isInBottomBound && bounds.isInTopBound;
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