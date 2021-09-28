window.addEventListener("click", function(event){
    for(var i = 0; i < board.circles.length; i++){
      if(sudukoBoard[i].isCordinateOnCircle(event.x, event.y)){
        sudukoBoard[i].selected = !sudukoBoard[i].selected;
      }
    }
  });
  
  window.addEventListener('resize', function(event){
    console.log("event", event);
  });
  
  window.addEventListener("scroll", function (event) {
    scrollTop = this.scrollY;
  });

  window.addEventListener("keyup", (KeyboardEvent) => {
      console.log("keyBoardEvent", KeyboardEvent);
  })
  