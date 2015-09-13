window.onload = function() {

   window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function(callback) {
            window.setTimeout(callback, 1000 / 60);
         };
   })();

   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");

   var arr = [];
   var triangle = function(ax,ay,bx,by,cx,cy,velx,vely, col) {
      this.ax = ax;
      this.ay=ay;
      this.bx=bx;
      this.by=by;
      this.cx=cx;
      this.cy=cy;
      this.velx=velx;
      this.vely=vely;
      this.col = col;
   };

   var num = 150;

   /*--------------------------------------*/
   function size() {
      canvas.width = (window.innerWidth);
      canvas.height = (window.innerHeight - 250);
   }

   function bg() {
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   function init() {
      var ax, ay, bx, by, cx, cy,velx,vely, col;

      for (var i = 0; i < num; i++) {
         ax = Math.random() * canvas.width;
         ay = Math.random() * canvas.height;
         bx = ax+100*Math.cos(Math.random()*2*Math.PI);
         by = ay+100*Math.sin(Math.random()*2*Math.PI);
         cx = bx+100*Math.cos(Math.random()*2*Math.PI);
         cy = by+100*Math.sin(Math.random()*2*Math.PI);
         velx=.1*Math.random()-.05;
         vely=.1*Math.random()-.05;
         col = 
            "rgba(189,73,50,.5)";

         arr.push(new triangle(ax,ay,bx,by,cx,cy,velx,vely, col));
      }
   }

  function update(t){
     t.ax+=t.velx;
     t.ay+=t.vely;
     
     t.bx+=t.velx;
     t.by+=t.vely;
     
     t.cx+=t.velx;
     t.cy+=t.vely;
  }

   function draw() {
      var t;

      for (var i = 0; i < arr.length; i++) {
         t = arr[i];

         
         ctx.fillStyle=t.col;
         ctx.strokeStyle="rgba(0,0,0,.5)";
         
         ctx.beginPath();
         ctx.moveTo(t.ax, t.ay);
         ctx.lineTo(t.bx, t.by);
         ctx.lineTo(t.cx, t.cy);
         ctx.closePath();
         ctx.fill();
         ctx.stroke();
         
         update(t);

      }

   }

   function loop() {
         bg();

         draw();
         requestAnimFrame(loop);
      }
      /*--------------------------------------*/
   window.onresize = size;

   size();
   init();
   loop();
}