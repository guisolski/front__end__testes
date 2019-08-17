x = 750;
y = 365;
x2 = 3750;//0 3600
y2 = 120;
speed = 5;
angle = 0;
speed2 = 1.6;
mod = 0;
gas = 500;
GameOver_Gas = 0;
width_Car = 200;
height_Car = 200;
width_Car2 = 100;
height_Car2 = 100;
width_bandeira = 100;
height_bandeira = 100;
width_gas = 100;
height_gas = 100;
Contbandeira  = 0;
DestBandeira = 0;
DestGas = 0;
Gas_Surge = 0;
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
car = new Image();
map = new Image();
gasI = new Image();
explocao= new Image();
bandeira = new Image();
car.src = "car.png";
explocao.src = "explosion.png"
map.src = "map.png";
gasI.src = "gasolina.png";
bandeira.src = "bandeira.jpg";

var collision = 0;


window.addEventListener("keydown", keypress_handler, false);

var moveInterval = setInterval(function () {
    main();
	 Time();
	
}, 30);


function main() {
    ApagaTela();
    gameover();
   
    checkcollision();
	
	    context = canvas.getContext("2d");

    if(GameOver_Gas == 0){
	    Gases();
	    mov();
		DesenhaExplocao();
	}
	Minimap();
    Bacground();
	    
		if(GameOver_Gas != 0){
	    
		DesenhaExplocao();
	}
    if(DestBandeira == 0){
	     DesenhaBandeiras() ;
    }
	 DesenhaInformacao();
	
    carrro();
	carrro2();
	 clearTimeout ();

	}


function checkcollision() {
      if(DestBandeira == 0){
        if (x < 490 + width_bandeira  && x + width_Car  > 490 &&
            y < 120 + height_bandeira && y + height_Car > 120) {
              DestBandeira = 1;
              Contbandeira += 1;
        }
		
      }

}
function Gas_Main(){
 if(DestGas == 0)
	{
	 checkcollision_gas();
     DesenhaGas();
	 clearTimeout ();
	}	
}
function Gas_Para(){
Gas_Surge = 1;
}
function Gas_Volta(){
Gas_Surge = 0;
}


function Time(){
if(Gas_Surge == 0){
	setTimeout(function(){Gas_Main();},5000);
		setTimeout(function(){Gas_Para();},10000);
	}
if(Gas_Surge == 1){
	setTimeout(function(){Gas_Volta();},3000);
	}
}

function checkcollision_gas() {
	   if (x < 890 + width_gas && x + width_Car  > 890 &&
            y < 120 + height_gas && y + height_Car > 120) {
              DestGas = 1;
			  gas += 1000;
			  
        } 
}

function mov(){
  x += (speed * mod) * Math.cos(Math.PI / 180 * angle);
  y += (speed * mod) * Math.sin(Math.PI / 180 * angle);
  
  x2 += ((speed2 * mod) * Math.cos(Math.PI / 180 * angle));
  y2 += ((speed2 * mod) * Math.sin(Math.PI / 180 * angle));

}
function carrro(){
    context.save();
    context.translate(x, y);
    context.rotate(Math.PI / 180 * angle);

    car.width = width_Car;
    car.height= height_Car;
	
	if(GameOver_Gas == 0){
     	
		 car.width = width_Car;
		 car.height= height_Car;
 		 context.drawImage(car, -(car.width / 2 ), -(car.height / 2 ) , width_Car,height_Car);
	     context.restore();
	  }
}
function carrro2(){
    context.save();
    context.translate(x2, y2);
    context.rotate(Math.PI / 180 * angle);

    car.width = width_Car2;
    car.height= height_Car2;
	
	if(GameOver_Gas == 0){
     	
		 car.width = width_Car2;
		 car.height= height_Car2;
 		 context.drawImage(car, -(car.width / 2 ), -(car.height / 2 ) , width_Car2,height_Car2);
	     context.restore();
	  }
}


function  DesenhaBandeiras() {
   context.drawImage(bandeira , 500 , 100 , width_bandeira ,height_bandeira);
      context.drawImage(bandeira , 500+3170 , 100-60 , width_bandeira-70 ,height_bandeira-70);

}
function  DesenhaGas() {
   context.drawImage(gasI , 900 , 100 , width_bandeira ,height_bandeira);
      context.drawImage(gasI , 900+2900 , 100-60 , width_gas-70 ,height_gas-70);
}

function  DesenhaExplocao() {
   context.drawImage(explocao , x , y, 200, 200);
      context.drawImage(explocao , x2 , y2, 100, 100);

}

function gameover(){
  if(GameOver_Gas == 1){
    context.fillText("Acabou seu gas" , 100 ,100);
  }
}



function DesenhaInformacao(){
  context.font = "100px Arial";
  context.fillStyle ="#FF0000" ;
  context.fillText("Gas: " + gas , 3500 ,1500);
  context.fillText("Bandeiras: " + Contbandeira , 3500 ,2000	);
    context.fillText("Ao pegar um gas nao pode pegar o mesmo de volta", 3500 ,1700	);
	    context.fillText(" pode pegar o mesmo de volta", 3500 ,1800	);

}


function Bacground(){
  context.drawImage(map , 0 ,0 , 3000, 3000);
}
function Minimap(){
  context.drawImage(map , 3500 ,0 , 1000, 1000);
}
function ApagaTela() {
  context.clearRect(0,0,canvas.width,canvas.height);

}


function Gases() {
    if(mod != 0)
      gas -= 1;
    if(gas < 0)
      GameOver_Gas = 1;
}

function keypress_handler(event) {

    console.log(event.keyCode);
        mod = 1;

    if (event.keyCode == 83) {
        angle -= 180;
    }
    if (event.keyCode == 65) {
        angle -= 90;
    }
    if (event.keyCode == 68) {
        angle += 90;
    }
}
