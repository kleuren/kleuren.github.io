var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
canvas2.setAttribute("width", window.innerWidth);
canvas2.setAttribute("height", window.innerHeight);

var pixel = 50;
var rotation = 0;
var posArray = [];
var squares = [];
for(var i = 0; i < width; i+= pixel){for(var j = 0; j < height; j+= pixel){posArray.push([i,j]);}}

function color(){
	for(i = 0; i < width; i+=pixel){
		for(j = 0; j < height; j+=pixel){
			var randomPos = Math.floor(Math.random()*posArray.length);
			var x = posArray[randomPos][0];
			var y = posArray[randomPos][1];

			var red = Math.floor(Math.random()*255);
			var green = Math.floor(Math.random()*255);
			var blue = Math.floor(Math.random()*255);

			for (var z = 0; z < squares.length; z++) {
				var distance = Math.hypot(squares[z][0]-x, squares[z][1]-y);
				if(distance <= pixel){
					red = squares[z][2];
					green = squares[z][3];
					blue = squares[z][4];
				}
			}

			squares.push([x,y,red,green,blue]);

			if(rotation%2==0){
				var grd = ctx.createRadialGradient(x+pixel/2, y+pixel/2, pixel/2, x+pixel/2, y+pixel/2, pixel*2);
				grd.addColorStop(0, "rgba("+red+","+green+","+blue+")");
				grd.addColorStop(1, "rgba("+red+","+green+","+blue+",0)");

				ctx.beginPath();
				ctx.arc(x+pixel/2, y+pixel/2, pixel*2, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fillStyle = grd;
				ctx.fill();
			}
			else{
				var grd2 = ctx2.createRadialGradient(x+pixel/2, y+pixel/2, pixel/2, x+pixel/2, y+pixel/2, pixel*2);
				grd2.addColorStop(0, "rgba("+red+","+green+","+blue+")");
				grd2.addColorStop(1, "rgba("+red+","+green+","+blue+",0)");

				ctx2.beginPath();
				ctx2.arc(x+pixel/2, y+pixel/2, pixel*2, 0, 2 * Math.PI);
				ctx2.closePath();
				ctx2.fillStyle = grd2;
				ctx2.fill();
			}

			posArray.splice(randomPos,1);
		}
	}

	for(var i = 0; i < width; i+= pixel){for(var j = 0; j < height; j+= pixel){posArray.push([i,j]);}}
	squares = [];
	rotation++;

	if(rotation%2==0){
		$("#canvas2").fadeIn(2500);
		$("#canvas").fadeOut(2500);
	}
	else{
		$("#canvas2").fadeOut(2500);
		$("#canvas").fadeIn(2500);
	}

	setTimeout(function() {requestAnimationFrame(color);}, 1000 / 0.4);
}

color();