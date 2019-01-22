var width = window.innerWidth;
var height = window.innerHeight;

var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext("2d");
canvas1.setAttribute("width", window.innerWidth);
canvas1.setAttribute("height", window.innerHeight);

var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
canvas2.setAttribute("width", window.innerWidth);
canvas2.setAttribute("height", window.innerHeight);

var size = 25; //pixels or=f the radius
var fadeSpeed = 1; //0-1, percentage of the time it has
var switchSpeed = 0.5; //fps
var grouping; //???
var proximity = 5; //1-10 or something
var blur = 0;//0-1
var redMin = 0; var redMax = 255; var greenMin = 0; var greenMax = 255; var blueMin = 0; var blueMax = 255;

var rotation = 1;
var posArray = [];
var squares = [];
for(var i = 0; i < width; i+= size){for(var j = 0; j < height; j+= size){posArray.push([i,j]);}}

function refresh(){
	var redBG = Math.floor(Math.random()*(256));
	var greenBG = Math.floor(Math.random()*(256));
	var blueBG = Math.floor(Math.random()*(256));
	document.body.style.backgroundColor = "rgba("+redBG+","+greenBG+","+blueBG+")";
	if(rotation%2==0){
		ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
		for(i = 0; i < width; i+=size){
			for(j = 0; j < height; j+=size){
				
				var randomPos = Math.floor(Math.random()*posArray.length);
				var x = posArray[randomPos][0];
				var y = posArray[randomPos][1];

				var red = Math.floor(Math.random()*(redMax-redMin+1)+redMin);
				var green = Math.floor(Math.random()*(greenMax-greenMin+1)+greenMin);
				var blue = Math.floor(Math.random()*(blueMax-blueMin+1)+blueMin);

				for (var z = 0; z < squares.length; z++) {
					var distance = Math.hypot(squares[z][0]-x, squares[z][1]-y);
					if(distance <= proximity*size){
						//something with grouping
						red = squares[z][2];
						green = squares[z][3];
						blue = squares[z][4];
					}
				}

				squares.push([x,y,red,green,blue]);

				var grd = ctx1.createRadialGradient(x+size/2, y+size/2, size, x+size/2, y+size/2, size*2);
				grd.addColorStop(0, "rgba("+red+","+green+","+blue+")");
				grd.addColorStop(1, "rgba("+red+","+green+","+blue+","+blur+")");

				ctx1.beginPath();
				ctx1.arc(x+size/2, y+size/2, size*2, 0, 2 * Math.PI);
				ctx1.closePath();
				ctx1.fillStyle = grd;
				ctx1.fill();

				posArray.splice(randomPos,1);

			}
		}
		$("#canvas1").fadeIn(1000/switchSpeed*fadeSpeed);
		$("#canvas2").fadeOut(1000/switchSpeed*fadeSpeed);
	}
	else{
		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
		for(i = 0; i < width; i+=size){
			for(j = 0; j < height; j+=size){
				
				var randomPos = Math.floor(Math.random()*posArray.length);
				var x = posArray[randomPos][0];
				var y = posArray[randomPos][1];

				var red = Math.floor(Math.random()*(redMax-redMin+1)+redMin);
				var green = Math.floor(Math.random()*(greenMax-greenMin+1)+greenMin);
				var blue = Math.floor(Math.random()*(blueMax-blueMin+1)+blueMin);

				for (var z = 0; z < squares.length; z++) {
					var distance = Math.hypot(squares[z][0]-x, squares[z][1]-y);
					if(distance <= proximity*size){
						//something with grouping
						red = squares[z][2];
						green = squares[z][3];
						blue = squares[z][4];
					}
				}

				squares.push([x,y,red,green,blue]);

				var grd = ctx2.createRadialGradient(x+size/2, y+size/2, size, x+size/2, y+size/2, size*2);
				grd.addColorStop(0, "rgba("+red+","+green+","+blue+")");
				grd.addColorStop(1, "rgba("+red+","+green+","+blue+","+blur+")");

				ctx2.beginPath();
				ctx2.arc(x+size/2, y+size/2, size*2, 0, 2 * Math.PI);
				ctx2.closePath();
				ctx2.fillStyle = grd;
				ctx2.fill();

				posArray.splice(randomPos,1);

			}
		}
		$("#canvas2").fadeIn(1000/switchSpeed*fadeSpeed);
		$("#canvas1").fadeOut(1000/switchSpeed*fadeSpeed);
	}


	for(var i = 0; i < width; i+= size){for(var j = 0; j < height; j+= size){posArray.push([i,j]);}}
	squares = [];

	rotation++;

	setTimeout(function() {requestAnimationFrame(refresh);}, 1000 / switchSpeed);
}

refresh();