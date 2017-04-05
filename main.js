var running = false;
var animationTimer;
var t;
var range = document.getElementById("mySlider");
var width = window.innerWidth;
var height = window.innerHeight;
noise(math.random());

function setup() {
  canv = createCanvas(width*14, height*7);
  // background(35);
  noFill();
  t = 0;
  canv.parent("canvasHolder");
}

function calcBright(r,g,b){
  //calculates brightness so that background can be adjusted for contrast
  r = r/255;
  g = g/255;
  b = b/255;
  bright = (r+g+b);
  return bright;
}

function noiseFuzz(coeff, amp=0){
  return coeff * noise(t+amp);
}

function mainAnimation() {
  //uses p5's built in perlin noise generator for colors
  //r is 50 because blue green bias for aetheic reasons
  r = noiseFuzz(150,-20);
  g = noiseFuzz(150,20);
  b = noiseFuzz(150,10);
  a = noiseFuzz(100);
  stroke('rgba('+r+'%,'+g+'%,'+b+'%,'+a+')');

  birght = calcBright(r,g,b);
  document.body.style.backgroundColor = 'rgba('+r/bright+'%,'+g/bright+'%,'+b/bright+'%,'+a+')';
  document.getElementById('author').style.color = 'rgba('+r/bright+'%,'+g/bright+'%,'+b/bright+'%,.3)';
  document.getElementById('btn').style.color = 'rgba('+r/(bright*1.5)+'%,'+g/(bright*1.5)+'%,'+b/(bright*1.5)+'%,.3)';
  //background is complimentary to stroke color
  document.body.style.filter = 'hue-rotate('+180+'deg)';
  document.getElementById('author').filter = 'hue-rotate('+180+'deg)';
  //uses built in perlin noise generator for bezier curve points
  //scales generated coordinates
  curve_scale = 1.1;
  x1 = noiseFuzz(width,50)*curve_scale;
  x2 = noiseFuzz(width,60)*curve_scale;
  x3 = noiseFuzz(width,70)*curve_scale;
  x4 = noiseFuzz(width,80)*curve_scale;
  y1 = noiseFuzz(height,90)*curve_scale;
  y2 = noiseFuzz(height,100)*curve_scale;
  y3 = noiseFuzz(height,110)*curve_scale;
  y4 = noiseFuzz(height,120)*curve_scale;

  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  //creates illusion of depth by creating shadow displaced distance shad from
  //bottom of first curves
  var shad = 3;
    y1 = noiseFuzz(shad) + noiseFuzz(height,90)*curve_scale;
  y2 = noiseFuzz(shad) + noiseFuzz(height,100)*curve_scale;
  y3 = noiseFuzz(shad) + noiseFuzz(height,110)*curve_scale;
  y4 = noiseFuzz(shad) + noiseFuzz(height,120)*curve_scale;

  stroke('rgba('+r/(2*bright)+'%,'+g/(2*bright)+'%,'+b/(2*bright)+'%,.2)');
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  t += parseFloat(range.value);
  if(running){
    document.getElementById('btn').innerHTML = '1';
  }
}

function onLoad(){
  r = noiseFuzz(150,-20);
  g = noiseFuzz(150,20);
  b = noiseFuzz(150,10);
  a = noiseFuzz(100);
  birght = calcBright(r,g,b);

  document.body.style.backgroundColor = 'rgba('+r/bright+'%,'+g/bright+'%,'+b/bright+'%,'+a+')';
  document.getElementById('author').style.color = 'rgba('+r/bright+'%,'+g/bright+'%,'+b/bright+'%,.3)';
}

function start() {
	if (!running) {
		console.log('started');
    animationTimer = setInterval(mainAnimation, 10+1000*(parseFloat(range.value)));
		running = true;
	} else {
		console.log('stopped')
		clearInterval(animationTimer);
    document.getElementById("btn").innerHTML = '0';
		running = false;
	}
}
