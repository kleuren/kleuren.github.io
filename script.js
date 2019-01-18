var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var pixel = 25; //size of the squares
var posArray = []; //array with all possible positions for a new square to spawn
var squares = []; //array with position and color of all drawn squares
for(var i = 0; i < width; i+= pixel){for(var j = 0; j < height; j+= pixel){posArray.push([i,j]);}} //fill the array with all possitions

function color(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas before refilling it
	for(i = 0; i < width; i+=pixel){
		for(j = 0; j < height; j+=pixel){
			var randomPos = Math.floor(Math.random()*posArray.length); //get random position
			var x = posArray[randomPos][0];
			var y = posArray[randomPos][1];

			var red = Math.floor(Math.random()*255); //get random color
			var green = Math.floor(Math.random()*255);
			var blue = Math.floor(Math.random()*255);

			for (var z = 0; z < squares.length; z++) {
				var distance = Math.hypot(squares[z][0]-x, squares[z][1]-y);
				if(distance <= pixel){ //check if the square is next to another one
					red = squares[z][2]; //change the color of the square to that one
					green = squares[z][3];
					blue = squares[z][4];
				}
			}

			squares.push([x,y,red,green,blue]); //add position and color to the array

			ctx.fillStyle = "rgba("+red+","+green+","+blue+")"; //draw square
			ctx.fillRect(x, y, pixel, pixel);

		    posArray.splice(randomPos,1); //get rid of the position of drawn square
		}
	}
	requestAnimationFrame(color); //refresh the function
	for(var i = 0; i < width; i+= pixel){for(var j = 0; j < height; j+= pixel){posArray.push([i,j]);}} //refill the array when the entire screen is filled
	squares = [];
}

color();