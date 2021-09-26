window.addEventListener("click", function(event){
    for(var i = 0; i < sudokoPath.length; i++){
      if(sudokoPath[i].isCordinateOnCircle(event.x, event.y)){
        sudokoPath[i].selected = !sudokoPath[i].selected;
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
  