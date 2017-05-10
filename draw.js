/*
 * Global
 */
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var PhMax=300;
var PwMax=300;
cx = WIDTH / 2;
cy = HEIGHT / 2;
var esq = (PwMax / 2);
var dir =- (PwMax / 2);
var cima =- (PhMax / 2);
var baixo = (PhMax / 2);
context.lineWidth = 3;
context.strokeStyle = "black";
context.cap = "round"
var linhas = new Array();
var origem = new Array();
var V = new Array();
var range = 10;
var ind = -1;

/*________________________________________________________________________*/
function novaLinha(X1, Y1, X2, Y2)
{
	var nova = linhas.length;

	linhas[nova] = {
		edit:-1, //0: Can not be edited | 1: source point | 2: destination point | 3: middle of the line
		x1:X1,
		y1:Y1,
		x2:X2,
		y2:Y2,
	}

	origem[nova] = {
		oX1:0,
		oY1:0,
		oX2:0,
		oY2:0
	}
}

function criaVertice()
{
	var novo = V.length;

	V[V.length] = {
		x:0,
		y:0
	}

	return novo;
}

function achaVertices(n)
{
	for(i = 0; i < n; i++) {
		criaVertice();
	}

	if( n == 3 ) {
		V[0].x = cx + esq;
		V[0].y = cy + baixo;
		V[1].x = cx + dir;
		V[1].y = cy + baixo;
		V[2].x = cx;
		V[2].y = cy+cima;
	} else if( n == 4 ) {
		V[0].x = cx+esq;
		V[0].y = cy + baixo;
		V[1].x = cx + dir;
		V[1].y = cy + baixo;
		V[2].x = cx+dir;
		V[2].y = cy+cima;
		V[3].x = cx + esq;
		V[3].y = cy+cima;
	} else if( n== 5 ) {
		V[0].x = cx + esq - 50;
		V[0].y = cy + baixo;
		V[1].x = cx + dir + 50;
		V[1].y = cy + baixo;
		V[2].x = cx + dir;
		V[2].y = cy;
		V[3].x = cx;
		V[3].y = cy + cima;
		V[4].x = cx + esq;
		V[4].y = cy;
	} else if( n == 6 ) {
		V[0].x = cx + esq - 75;
		V[0].y = cy + baixo;
		V[1].x = cx + dir + 75;
		V[1].y = cy + baixo;
		V[2].x = cx + dir;
		V[2].y = cy;
		V[3].x = cx + dir + 75;
		V[3].y = cy + cima;
		V[4].x = cx + esq - 75;
		V[4].y = cy + cima;
		V[5].x = cx + esq;
		V[5].y = cy;
	} else if( n == 7 ) {
		V[0].x = cx + esq - 50;
		V[0].y = cy + baixo;
		V[1].x = cx + dir + 50;
		V[1].y = cy + baixo;
		V[2].x = cx + dir;
		V[2].y = cy + 25;
		V[3].x = cx + dir + 25;
		V[3].y = cy + cima + 75;
		V[4].x = cx;
		V[4].y = cy + cima;
		V[5].x = cx + esq - 25;
		V[5].y = cy + cima + 75;
		V[6].x = cx + esq;
		V[6].y = cy + 25;
	} else if( n == 8 ) {
		V[0].x = cx + esq - 75;
		V[0].y = cy + baixo;
		V[1].x = cx + dir + 75;
		V[1].y = cy + baixo;
		V[2].x = cx + dir;
		V[2].y = cy + baixo - 75;
		V[3].x = cx + dir;
		V[3].y = cy + cima + 75;
		V[4].x = cx + dir + 75;
		V[4].y = cy + cima;
		V[5].x = cx + esq - 75;
		V[5].y = cy + cima;
		V[6].x = cx + esq;
		V[6].y = cy + cima + 75;
		V[7].x = cx + esq;
		V[7].y = cy + baixo - 75;
	}

	for (var i = 0; i < n - 1; i++) {
		novaLinha(V[i].x, V[i].y, V[i+1].x, V[i+1].y);
	}
	novaLinha(V[n-1].x, V[n-1].y, V[0].x, V[0].y);
}

function novoPoligono()
{

	context.clearRect(0, 0, WIDTH, HEIGHT);
	linhas = new Array();
	origem = new Array();
	V = new Array();

	n = prompt("Digite um número >=3 e <=8");
	while( (n > 8) || ( n < 3) ) {
		alert("Valor fora da faixa aceitável!");
		n = prompt("Digite um número >=3 e <=8");
	}
	achaVertices(n);
}

function inLine(reta, Px, Py)
{
	var x1 = reta.x1;
	var x2 = reta.x2;
	var y1 = reta.y1;
	var y2 = reta.y2;
	var Y = 0;
	var range2 = range / 2;

	if( (((Px>=x1-range) && (Px<=x2+range)) || ((Px<=x1+range) && (Px>=x2-range))) &&
		(((Py>=y1-range) && (Py<=y2+range)) || ((Py<=y1+range) && (Py>=y2-range)))) {
		Y = Math.floor(((y2 - y1) / (x2-x1)) * (Px - x1)) + y1;

		if( (!isFinite(Y)) || ((Y >= (Py - range)) && ((Y <= Py + range))) ) {
			return 1;
		}
	}

	return 0;
}

function Desenhar()
{
	for (var i=0; i < linhas.length; i++) {
		reta = linhas[i];
		context.beginPath();
		context.moveTo(reta.x1, reta.y1);
		context.lineTo(reta.x2, reta.y2);
		context.stroke();
		context.closePath();
	}
}

function MouseDown(evt)
{
	Yd = evt.clientY;
	Xd = evt.clientX;

	for (var i=0; i < linhas.length; i++) {
		if( ind == -1) {
			reta = linhas[i];
			ind=i;
			if( (evt.which==1) &&
				(((reta.x1 - range <= Xd) && (Xd <= reta.x1+range)) && ((reta.y1-range <= Yd) && (Yd <= reta.y1 + range))) ) {
				linhas[i].edit = 1;
				window.addEventListener('mousemove', MouseMove, true);
			} else if( (evt.which == 1) && ((reta.x2-range <= Xd) && (Xd <= reta.x2 + range)) &&
					   ((reta.y2 - range <= Yd) && (Yd <= reta.y2 + range))) {
				linhas[i].edit = 2;
				window.addEventListener('mousemove', MouseMove, true);
			}else if( (evt.which==1) && (inLine(linhas[i], Xd, Yd)) ) {
				origem[i].oX1 = linhas[i].x1,
				origem[i].oY1 = linhas[i].y1,
				origem[i].oX2 = linhas[i].x2,
				origem[i].oY2 = linhas[i].y2,
				linhas[i].edit = 3;
				window.addEventListener('mousemove', MouseMove, true);
			}else if( (inLine(linhas[i], Xd, Yd)) && (evt.which == 3)) {
				novaLinha(linhas[i].x1, linhas[i].y1, linhas[i].x2, linhas[i].y2);
				linhas[i].edit = 4;
				window.addEventListener('mousemove', MouseMove, false);
			}else {
				ind=-1;
			}
		}
	}
}

function MouseUp(evt)
{
	if( linhas[ind] != null ) {
		if( linhas[ind].edit > 0 ) {
			window.removeEventListener('mousemove', MouseMove, true);
			linhas[ind].edit=0;
			ind=-1;
		}
	}
}

function MouseMove(evt)
{
	var Ym = evt.clientY;
	var Xm = evt.clientX;
	if( linhas[ind]!=null ) {
		switch (linhas[ind].edit) {
			case 1:
				if( (Xm < WIDTH) && (Xm > 0) ) {
					linhas[ind].x1=Xm;
				}
				if( (Ym < HEIGHT) && ( Ym > 0)) {
					linhas[ind].y1 = Ym;
				}
			break;

			case 2:
				if( (Xm < WIDTH) && (Xm > 0)) {
					linhas[ind].x2 = Xm;
				}
				if( (Ym < HEIGHT) && (Ym > 0) ) {
					linhas[ind].y2 = Ym;
				}
			break;

			case 3:
				if( ((Xm < WIDTH) && (Xm > 0)) && ((Ym < HEIGHT) && (Ym > 0)) ) {
					linhas[ind].x1 = origem[ind].oX1 + (Xm - Xd);
					linhas[ind].y1 = origem[ind].oY1 + (Ym - Yd);
					linhas[ind].x2 = origem[ind].oX2 + (Xm - Xd);
					linhas[ind].y2 = origem[ind].oY2 + (Ym - Yd);
				}
			break;

			case 4:
				var newInd = linhas.length - 1;
				linhas[newInd].x1 = Xm;
				linhas[newInd].y1 = Ym;
				linhas[ind].x2 = Xm;
				linhas[ind].y2 = Ym;
			break;
		}
	}
}

function Atualizar()
{
	context.clearRect(0, 0, WIDTH, HEIGHT);
	Desenhar();
}

document.oncontextmenu=function()
{ return false };

function MousePosXY(evt)
{ document.getElementById('mouse_pos').innerHTML = "(X, Y) = " + evt.clientX + ", " + evt.clientY; }

window.onload = function()
{ setInterval(Atualizar, 10); }

window.addEventListener('mousedown', MouseDown, true);
window.addEventListener('mouseup', MouseUp, true);
window.addEventListener('mousemove', MousePosXY, true);
document.getElementById('new_polygon').addEventListener('click', novoPoligono, true);

novaLinha(350, 300, 700, 300);
