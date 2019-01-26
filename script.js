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

var size = 50;
var blur = 0;
var switchSpeed = 1;
var fadeSpeed = 1;
var proximity = 1;
var redMin = 0; var redMax = 255; var greenMin = 0; var greenMax = 255; var blueMin = 0; var blueMax = 255;

var rotation = 1;
var squares = [];
var posArray = [];
for(var i = 0; i < width; i+= size){for(var j = 0; j < height; j+= size){posArray.push([i,j]);}}

function refresh(){
	var currentSize = size;
	var currentFadeSpeed = fadeSpeed;
	var currentSwitchSpeed = switchSpeed;
	var currentProximity = proximity;
	var currentBlur = blur;
	var currentRedMin = redMin; var currentRedMax = redMax; var currentGreenMin = greenMin; var currentGreenMax = greenMax; var currentBlueMin = blueMin; var currentBlueMax = blueMax;
	var currentPosArray = posArray;


	var redBG = Math.floor(Math.random()*(currentRedMax-currentRedMin+1)+currentRedMin);
	var greenBG = Math.floor(Math.random()*(currentGreenMax-currentGreenMin+1)+currentGreenMin);
	var blueBG = Math.floor(Math.random()*(currentBlueMax-currentBlueMin+1)+currentBlueMin);
	document.body.style.backgroundColor = "rgba("+redBG+","+greenBG+","+blueBG+")";
	if(rotation%2==0){
		ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
		for(i = 0; i < width; i+=currentSize){
			for(j = 0; j < height; j+=currentSize){
				
				var randomPos = Math.floor(Math.random()*currentPosArray.length);
				var x = currentPosArray[randomPos][0];
				var y = currentPosArray[randomPos][1];

				var red = Math.floor(Math.random()*(currentRedMax-currentRedMin+1)+currentRedMin);
				var green = Math.floor(Math.random()*(currentGreenMax-currentGreenMin+1)+currentGreenMin);
				var blue = Math.floor(Math.random()*(currentBlueMax-currentBlueMin+1)+currentBlueMin);

				for (var z = 0; z < squares.length; z++) {
					var distance = Math.hypot(squares[z][0]-x, squares[z][1]-y);
					if(distance <= currentProximity*currentSize){
						red = squares[z][2];
						green = squares[z][3];
						blue = squares[z][4];
					}
				}

				squares.push([x,y,red,green,blue]);

				var grd = ctx1.createRadialGradient(x+currentSize/2, y+currentSize/2, currentSize, x+currentSize/2, y+currentSize/2, currentSize*2);
				grd.addColorStop(0, "rgba("+red+","+green+","+blue+")");
				grd.addColorStop(1, "rgba("+red+","+green+","+blue+","+currentBlur+")");

				ctx1.beginPath();
				ctx1.arc(x+currentSize/2, y+currentSize/2, currentSize*2, 0, 2 * Math.PI);
				ctx1.closePath();
				ctx1.fillStyle = grd;
				ctx1.fill();

				currentPosArray.splice(randomPos,1);

			}
		}
		$("#canvas1").fadeIn(1000/currentSwitchSpeed*currentFadeSpeed);
		$("#canvas2").fadeOut(1000/currentSwitchSpeed*currentFadeSpeed);
	}
	else{
		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
		for(i = 0; i < width; i+=currentSize){
			for(j = 0; j < height; j+=currentSize){
				
				var randomPos = Math.floor(Math.random()*currentPosArray.length);
				var x = currentPosArray[randomPos][0];
				var y = currentPosArray[randomPos][1];

				var red = Math.floor(Math.random()*(currentRedMax-currentRedMin+1)+currentRedMin);
				var green = Math.floor(Math.random()*(currentGreenMax-currentGreenMin+1)+currentGreenMin);
				var blue = Math.floor(Math.random()*(currentBlueMax-currentBlueMin+1)+currentBlueMin);

				for (var z = 0; z < squares.length; z++) {
					var distance = Math.hypot(squares[z][0]-x, squares[z][1]-y);
					if(distance <= currentProximity*currentSize){
						red = squares[z][2];
						green = squares[z][3];
						blue = squares[z][4];
					}
				}

				squares.push([x,y,red,green,blue]);

				var grd = ctx2.createRadialGradient(x+currentSize/2, y+currentSize/2, currentSize, x+currentSize/2, y+currentSize/2, currentSize*2);
				grd.addColorStop(0, "rgba("+red+","+green+","+blue+")");
				grd.addColorStop(1, "rgba("+red+","+green+","+blue+","+currentBlur+")");

				ctx2.beginPath();
				ctx2.arc(x+currentSize/2, y+currentSize/2, currentSize*2, 0, 2 * Math.PI);
				ctx2.closePath();
				ctx2.fillStyle = grd;
				ctx2.fill();

				currentPosArray.splice(randomPos,1);

			}
		}
		$("#canvas2").fadeIn(1000/currentSwitchSpeed*currentFadeSpeed);
		$("#canvas1").fadeOut(1000/currentSwitchSpeed*currentFadeSpeed);
	}


	for(var i = 0; i < width; i+= currentSize){for(var j = 0; j < height; j+= currentSize){currentPosArray.push([i,j]);}}
	squares = [];

	rotation++;

	setTimeout(function() {requestAnimationFrame(refresh);}, 1000/currentSwitchSpeed);
}

refresh();

var navCheck = true;

function openNavBar(){
	if(navCheck){
		document.getElementById("navBar").style.width = "200px";
		document.getElementById("navBar").style.height = "380px";
		for (var i = 0; i < document.getElementsByClassName("navContent").length; i++) {
			document.getElementsByClassName("navContent")[i].style.display = "block";
		}

		navCheck = false;
	}
	else{
		document.getElementById("navBar").style.width = "25px";
		document.getElementById("navBar").style.height = "25px";
		for (var i = 0; i < document.getElementsByClassName("navContent").length; i++) {
			document.getElementsByClassName("navContent")[i].style.display = "none";
		}
		navCheck = true;
	}
}

var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var slider3 = document.getElementById("slider3");
var slider4 = document.getElementById("slider4");
var slider5 = document.getElementById("slider5");

slider1.oninput = function() {
    size = Number(slider1.value);
    document.getElementById("size").innerHTML = "Size (25-250): " + slider1.value;
    posArray = [];
	for(var i = 0; i < width; i+= size){for(var j = 0; j < height; j+= size){posArray.push([i,j]);}}
}

slider2.oninput = function() {
    blur = Number((slider2.value-100)/-100);
    document.getElementById("blur").innerHTML = "Blur (0-100): " + slider2.value;
}

slider3.oninput = function() {
    switchSpeed = Number(slider3.value/10);
    document.getElementById("switchSpeed").innerHTML = "Changing speed (1-50): " + slider3.value;
}

slider4.oninput = function() {
    fadeSpeed = Number((slider4.value-100)/-100);
    document.getElementById("fadeSpeed").innerHTML = "Fading speed (0-100): " + slider4.value;
}

slider5.oninput = function() {
    proximity = Number(-(slider5.value-6));
    document.getElementById("proximity").innerHTML = "Color variety (1-5): " + slider5.value;
}

function red(max){
	var redMinTemp = Number(document.getElementById("redMin").value);
	var redMaxTemp = Number(document.getElementById("redMax").value);
	if(redMinTemp<0){redMinTemp = 0; document.getElementById("redMin").value = 0;}
	if(redMinTemp>255){redMinTemp = 255; document.getElementById("redMin").value = 255;}
	if(redMaxTemp<0){redMaxTemp = 0; document.getElementById("redMax").value = 0;}
	if(redMaxTemp>255){redMaxTemp = 255; document.getElementById("redMax").value = 255;}
	if(redMinTemp<redMaxTemp){
		redMin = redMinTemp;
		redMax = redMaxTemp;
	}
	else{
		if(max){
			document.getElementById("redMin").value = redMaxTemp;
		}
		else{
			document.getElementById("redMax").value = redMinTemp;
		}
		redMin = redMinTemp;
		redMax = redMaxTemp;
	}
}

function green(max){
	var greenMinTemp = Number(document.getElementById("greenMin").value);
	var greenMaxTemp = Number(document.getElementById("greenMax").value);
	if(greenMinTemp<0){greenMinTemp = 0; document.getElementById("greenMin").value = 0;}
	if(greenMinTemp>255){greenMinTemp = 255; document.getElementById("greenMin").value = 255;}
	if(greenMaxTemp<0){greenMaxTemp = 0; document.getElementById("greenMax").value = 0;}
	if(greenMaxTemp>255){greenMaxTemp = 255; document.getElementById("greenMax").value = 255;}
	if(greenMinTemp<greenMaxTemp){
		greenMin = greenMinTemp;
		greenMax = greenMaxTemp;
	}
	else{
		if(max){
			document.getElementById("greenMin").value = greenMaxTemp;
		}
		else{
			document.getElementById("greenMax").value = greenMinTemp;
		}
		greenMin = greenMinTemp;
		greenMax = greenMaxTemp;
	}
}

function blue(max){
	var blueMinTemp = Number(document.getElementById("blueMin").value);
	var blueMaxTemp = Number(document.getElementById("blueMax").value);
	if(blueMinTemp<0){blueMinTemp = 0; document.getElementById("blueMin").value = 0;}
	if(blueMinTemp>255){blueMinTemp = 255; document.getElementById("blueMin").value = 255;}
	if(blueMaxTemp<0){blueMaxTemp = 0; document.getElementById("blueMax").value = 0;}
	if(blueMaxTemp>255){blueMaxTemp = 255; document.getElementById("blueMax").value = 255;}
	if(blueMinTemp<blueMaxTemp){
		blueMin = blueMinTemp;
		blueMax = blueMaxTemp;
	}
	else{
		if(max){
			document.getElementById("blueMin").value = blueMaxTemp;
		}
		else{
			document.getElementById("blueMax").value = blueMinTemp;
		}
		blueMin = blueMinTemp;
		blueMax = blueMaxTemp;
	}
}

function reset(){
	size = 50;
    document.getElementById("size").innerHTML = "Size (25-250): 50";
    posArray = [];
	for(var i = 0; i < width; i+= size){for(var j = 0; j < height; j+= size){posArray.push([i,j]);}}
	document.getElementById("slider1").value = 50;

	blur = 0;
    document.getElementById("blur").innerHTML = "Blur (0-100): 100";
    document.getElementById("slider2").value = 100;

    switchSpeed = 1;
    document.getElementById("switchSpeed").innerHTML = "Changing speed (1-50): 10";
    document.getElementById("slider3").value = 10;

    fadeSpeed = 1;
    document.getElementById("fadeSpeed").innerHTML = "Fading speed (0-100): 0";
    document.getElementById("slider4").value = 0;

    proximity = 1;
    document.getElementById("proximity").innerHTML = "Color variety (1-5): 5";
    document.getElementById("slider5").value = 5;

    document.getElementById("redMin").value = 0; redMin = 0;
    document.getElementById("redMax").value = 255; redMax = 255;
    document.getElementById("greenMin").value = 0; greenMin = 0;
    document.getElementById("greenMax").value = 255; greenMax = 255;
    document.getElementById("blueMin").value = 0; blueMin = 0;
    document.getElementById("blueMax").value = 255; blueMax = 255;
}