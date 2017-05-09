	var context = canvas.getContext("2d");

 var xPos = canvas.width/2;

var yPos = 50;

var xPosT = canvas.width/2;

var yPosT = 35;

var xPos2 = canvas.width/2;

var yPos2 = 100;

var width2 = 10;

var height2 = 10;

var width = 100;

var height = 50;

context.beginPath();

context.rect(xPos-50, yPos, width, height);

context.fillStyle = 'yellow';

context.fill();

context.lineWidth = 2;

context.strokeStyle = 'lime';

context.stroke();

context.fillStyle = "black";

context.font = "30pt comic sans MS";

context.textAlign = "center";

context.fillText("Hello", xPosT, yPosT);

context.fillStyle = "orange";

context.beginPath();

context.rect(xPos2-50, yPos2, width, height);

context.fill();

context.lineWidth = 4;

context.strokeStyle = "yellow";

context.stroke();

var _width = 90;

var _height = 60;

var gradLH = context.createLinearGradient(

20, //Start 'X'.

0, //Start 'y'.

100, //End 'X'.

0 //End 'Y'.

);

var gradLV = context.createLinearGradient(

0, //Start 'X'.

130, //Start 'y'.

0, //End 'X'.

100 //End 'Y'.

);

//Start 'X'/End 'X' and Start 'Y'/End 'Y', Will be different for different gradient angles. They specify the Starting and Ending

//positions of the gradient's along the 'X' (Horizontal) and 'Y' (vertical) Axis. These will be specified differently for

//Vertical, Horizontal And diagonal 'Linear' gradients. The same goes for centred and OffSet 'Radial' Gradients.

var gradLD = context.createLinearGradient(

220, //Start 'X'.

0, //Start 'Y'.

320, //End 'X'.

100 //End 'Y'.

);

gradLH.addColorStop( 0, "deeppink" );

gradLH.addColorStop(.3, "orange" );

gradLH.addColorStop(.7, "yellow" );

gradLH.addColorStop(.8, "lime" );

gradLH.addColorStop( 1, "blue" );

gradLV.addColorStop(.3, "red" );

gradLV.addColorStop(.6, "lime" );

gradLV.addColorStop( 1, "gold" );

gradLD.addColorStop( 0, "#0033CC" );

gradLD.addColorStop(.5, "#00FF00" );

gradLD.addColorStop(.7, "#FF6600" );

gradLD.addColorStop( 1, "#0033CC" );

context.beginPath();

context.rect(5, 5, _width, _height);

context.fillStyle = gradLH;

context.fill();

context.strokeStyle = "#00FF00";

context.lineWidth = "0.5";

context.stroke();

context.beginPath();

context.rect(5, 80, _width, _height);

context.fillStyle = gradLV;

context.fill();

context.strokeStyle = "cornflowerblue";

context.lineWidth = 1;

context.stroke();

context.beginPath();

context.rect(205, 5, _width, _height);

context.fillStyle = gradLD;

context.fill();

context.strokeStyle = "#00FF00";

context.lineWidth = "1";

context.stroke();
