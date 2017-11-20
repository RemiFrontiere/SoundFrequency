var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

var ball = { x: w/2, y: h/2, r: w/20};



var audio = document.querySelector("audio");
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
var source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
audio.play();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

function analyseSound(timestamp) {
		analyser.getByteFrequencyData(frequencyData);
		c.clearRect(0,0,w,h);
		c.beginPath();
		c.fillStyle = "#FC284F";
		for(var i in frequencyData){
			var freq = frequencyData[i];
			c.beginPath();
			c.fillRect(
				w*i/frequencyData.length,
				h/2 - freq/2,
				w/frequencyData.length,
				freq
			);
		}
		c.beginPath();
		c.fillStyle = "rgba(0,0,0,0.5)";
		c.arc(ball.x, ball.y, ball.r, 0, Math.PI*2, true);
		c.fill();
		ball.vy += 0.1;
		if(ball.y+ball.vy+ball.r > h)
			ball.vy = -ball.vy*0.9;
		ball.y += ball.vy;

		window.requestAnimationFrame(analyseSound);
}
window.requestAnimationFrame(analyseSound);
