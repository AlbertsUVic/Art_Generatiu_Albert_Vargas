/*********
En aquesta adaptació de la pràctica d'art generatiu he fet que amb la mà esquerra i el primer dit d'aquesta puguis anar creant Cercles que van rebotant per tota la pantalla, creant així quadrats cada cop que una d'elles col·lisiona amb un dels marges.

Amb la mà dreta i el primer dit es canvia la direcció dels cercles, o més ben dit s'inverteix la direcció.

Amb la mateixa mà però el segon dit quan tu fas "pinch" amb el dit, cambies el color dels cercles, cambiant així els colors també de la lectura digital de la teva mà.

I per últim amb la matèixa ma però el tercer dit fas el matèix que la anterior funció però en una escala de grisos.

A diferència de l'altra pràctica la interactivitat és millor, ja que en l'altre si apretaves la tecla 'A' els cercles cambiaven de color al col·lisionar amb un dels marges, en aquest cas tu fas que canvii el color cada cop que fas "pinch" amb el dit indicat.


Com a observacions, vaig tenir problemes alhora de la funció de pintar en escala de grisos, però un cop entès com fer servir la funció de pintar en colors comuns, vaig poder fer la funció de la escala de grisos.

**********/


class quadrat2 {
  constructor (a, b, c){
    this.x=a; 
    this.y=b; 
    this.radi=c; 
    this.vx=5;
    this.vy=5;
    this.r = 0;
    this.g = 0;
    this.bl = 0;
  } 
  drawSquare(){
    square(this.x, this.y, this.radi);
  }

  omplir2(){
    this.r=random(0,255);
    this.g=random(0,255);
    this.bl=random(0,255);
    
    fill(this.r,this.g,this.bl);
  }
}



class quadrat{
  
  constructor ( _a,  _b, _c){
    this.x=_a; 
    this.y=_b; 
    this.radi=_c; 
    this.vx=5;
    this.vy=5;
    this.r=0;
    this.g=0;
    this.b=0;
    this.myRed=0
    this.myGreen=0;
    this.myBlue=0;
    
    this.quadrats2=new quadrat2(this.x,this.y, random(50,100));
  } 
  drawBall(){ 
    ellipse(this.x,this.y,this.radi); 
  } 
  
  omplir(){
    //push();
    this.r=random(0,255);
    this.g=random(0,255);
    this.b=random(0,255);
    
    fill(this.r,this.g,this.b);
    this.drawBall();
    //pop();
  }
  
  omplirBW(){
    this.myRed= random(0,255);
    this.myGreen = this.myRed;
    this.myBlue = this.myGreen
    
    fill(this.myRed, this.myGreen, this.myBlue);
    this.drawBall();
  }
  
  comportament2(){
    this.x+=this.vx;
    this.y+=this.vy;
    if ((this.x<0)||(this.x<width)){
      this.vx=-this.vx; 
    }
    if ((this.y<0)||(this.y<height)){
      this.vy=-this.vy; 
    }
    
  }
  
  
  
  moveBall(){

   this.x+=this.vx;
   this.y+=this.vy;
   if ((this.x<0)||(this.x>width)){
    this.vx=-this.vx; 
    this.quadrats2.x = -this.vx;
    this.quadrats2.y = this.y;
    this.quadrats2.drawSquare();
     
   }
    
   if ((this.y<0)||(this.y>height)){
     this.vy=-this.vy; 
     this.quadrats2.x = this.x;
     this.quadrats2.y = -this.vy;
     this.quadrats2.drawSquare();
   }
  }
}




let bPoseURocksLeft = false;
let bPoseURocksRight = false;
let imgRocks, imgTouExtended;
let myFont;
let pinchesData = [];
let pinchActiveHand = -1;
let pinchActiveId = -1;

let pintat = false;



let bola = [];
let quadrats;
quadrats = quadrat2 ;
let qt = 0;
let red, green , blue ;

let myColorFill;

function setup(){
  
  createCanvas(800,600);
   sketch = createCanvas(640, 480);

  capture = createCapture(VIDEO);
  capture.hide();
  colorMap = [
    [
      color(0, 0, 0),
      color(255, 0, 255),
      color(0, 0, 255),
      color(255, 255, 255),
    ],
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)],
  ];

  
  handsfree = new Handsfree({
    showDebug: true, 
    hands: true,
    setup: {
      video: {
        $el: capture.elt,
      },
    },
  });

  
  buttonStart = createButton("Start Webcam");
  buttonStart.class("handsfree-show-when-stopped");
  buttonStart.class("handsfree-hide-when-loading");
  buttonStart.mousePressed(() => handsfree.start());

  
  buttonLoading = createButton("...loading...");
  buttonLoading.class("handsfree-show-when-loading");

  
  buttonStop = createButton("Stop Webcam");
  buttonStop.class("handsfree-show-when-started");
  buttonStop.mousePressed(() => handsfree.stop());
  
}


function draw(){
  background(255,255,255);
  stroke(0);
  for (let i= 0; i<bola.length;i++){
      print("ENTRA2!");
      strokeWeight(1);
      bola[i].moveBall();
      bola[i].drawBall();
    }
  

  fingerPaint();
  drawHands();
}
paint = [];
function fingerPaint() {
  // Check for pinches and create dots if something is pinched
  const hands = handsfree.data?.hands;
  if (hands?.pinchState) {
    // Loop through each hand
    hands.pinchState.forEach((hand, handIndex) => {
      // Loop through each finger
      hand.forEach((state, finger) => {
        // Other states are "start" and "released"
        if (state === "held") {
          // Left [0] index finger [0] is the eraser, so let's make it paint larger
          const circleSize = handIndex === 0 && finger === 0 ? 40 : 10;

          // Store the paint
          paint.push([
            hands.curPinch[handIndex][finger].x,
            hands.curPinch[handIndex][finger].y,
            handIndex,
            finger,
            circleSize,
          ]);
        }
      });
    });
  }

  
  
  
  if (hands?.pinchState && hands.pinchState[0][0] === "released"){
        bola.push(new quadrat(width-hands.curPinch[0][0].x *width, hands.curPinch[0][0].y *   height, random(50,100)));

    print(bola);
    
    print("ENTRA!");
    
  }
  
  if(hands?.pinchState && hands.pinchState[1][0] === "released"){
    for (let i= 0; i<bola.length;i++){
      bola[i].comportament2();
    }
  }
  
  if(hands?.pinchState && hands.pinchState[1][1] === "released"){
      for (let i= 0; i<bola.length;i++){
        bola[i].omplir();
      }
    
  }
  
  if(hands?.pinchState && hands.pinchState[1][2] === "released"){
      for (let i= 0; i<bola.length;i++){
        bola[i].omplirBW();
      }
    
  }
  
}

function drawHands() {
  const hands = handsfree.data?.hands;

  if (!hands?.landmarks) return;
    hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      if (colorMap[handIndex]) {
        switch (landmarkIndex) {
          case 8:
            push();
            fill(colorMap[handIndex][0]);
            pop();
            break;
          case 12:
            push();
            fill(colorMap[handIndex][1]);
            pop();
            break;
          case 16:
            push();
            fill(colorMap[handIndex][2]);
            pop();
            break;
          case 20:
            push();
            fill(colorMap[handIndex][3]);
            pop();
            break;
          default:
            push();
            fill(color(255, 255, 255));
            pop();
        }
      }
      if (handIndex === 0 && landmarkIndex === 8) {
        stroke(color(255, 255, 255));
        strokeWeight(5);
        circleSize = 40;
      } else {
        stroke(color(0, 0, 0));
        strokeWeight(0);
        circleSize = 10;
      }

      circle(
        sketch.width - landmark.x * sketch.width,
        landmark.y * sketch.height,
        circleSize
      );
    });
  });
}


