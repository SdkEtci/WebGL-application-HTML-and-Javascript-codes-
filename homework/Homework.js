var gl;
var theta;
var thetaLoc;
var isDirClockwise = false;
var delay = 50;
var x=true;
var my_color;
function buttonPressedFunc(){
	isDirClockwise=!isDirClockwise;
}

function buttonPressedFunc1(){

x=!x;
}

function buttonPressedFunc2(){

x=true;
}

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;
	}
  
	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram( program );
	
	var myButton = document.getElementById("ColorButton"); 
	myButton.addEventListener("click", buttonPressedFunc);
	
	var myButton1 = document.getElementById("Stop"); 
	myButton1.addEventListener("click", buttonPressedFunc1);
	
	var myButton2 = document.getElementById("Start"); 
	myButton2.addEventListener("click", buttonPressedFunc2);
	
	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
		switch (m.selectedIndex) {
			case 0:
			{
				break;
			}
			case 1:
			{
				break;
			}
			case 2:
			{	
				break;
			}
		}
	});


	
	var vertices = new Float32Array( [
				 //first
				-.5, .5, 
				0, .5,
				-.5, .3,
				0,.3,
				0,.5,
				-.5,.3,
				// second
				-.5, .3,
				-0.2, .3,
				-.5,.1,
				-0.2,.1,
				-.2,.3,
				-.5,.1,
				// third
				0,.1,
				-.5,-.1,
				-.5,.1,
				0,.1,
				-.5,-.1,
				0,-.1,
				//fourth
				0,-.1,
				-.2,-.3,
				-.2,-.1,
				0,-.1,
				-.2,-.3,
				0,-.3,
				//fifth
				0,-.3,
				-.5,-.5,
				-.5,-.3,
				0,-.3,
				-.5,-.5,
				0,-.5,
				// for ı
				.4,.5,
				.2,-.5,
				.2,.5,
				.4,.5,
				.2,-.5,
				.4,-.5,
				]);

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	
	theta = 0;
	gl.uniform1f(thetaLoc, theta);

	
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	requestAnimFrame(render);
	document.getElementById("slide").onchange = 		function() {delay = this.value;};

	canvas.addEventListener("click", function(event) {
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	var t = vec2(-1 + 2*event.clientX/canvas.width,
	-1 + 2*(canvas.height-event.clientY)/canvas.height);
	gl.bufferSubData(gl.ARRAY_BUFFER, 
                    sizeof['vec2']*index, 
                    flatten(t));
	index++;
	});
}



function render(){
	setTimeout(function() {
		// Clear the color buffer with specified clear color
		gl.clear(gl.COLOR_BUFFER_BIT);
		(x ? theta += (isDirClockwise ? -0.1 : 0.1): theta += 0);
		gl.uniform1f(thetaLoc, theta);
		gl.drawArrays(gl.TRIANGLES, 0, 36);
		render();
		}, delay);


	
	
}