var hours = 8,
	minutes = hours * 60,
	seconds = minutes * 60,
	milliseconds = seconds * 1000;

var tau = 2.0 * Math.PI;

var width = $(document).width(),
	height = $(document).height(),
	cx = width / 2,
	cy = height / 2;

var none = "none",
	dark = "#222",
	grey = "#999",
	light = "#bbb";

var baseRadius = Math.min(width, height) / 12,
	faceRadius = baseRadius * 4
	numCircles = 3,
	lineWeight = 4;

var canvas = SVG("canvas").size("100%", "100%");
canvas.fill(light);

var rect = canvas.rect(cx, height);
rect.fill(dark);

var face = makeCircle(faceRadius * 2);
moveCircle(face, cx, cy);

var circles = [];
for (var i = 0; i < numCircles; i++) {
	var diameter = 2 * baseRadius * (i + 1) / numCircles;
	circles.push(makeCircle(diameter));
}

function makeCircle(d) {
	var circle = canvas.circle(d);
	circle.fill(none);
	circle.stroke({color: grey, width: lineWeight});
	return circle;
}

function moveCircle(circle, x, y) {
	var r = circle.attr("r");
	circle.move(x - r, y - r);
}

window.setInterval(function() {
	var d = new Date(),
		h = d.getHours(),
		m = d.getMinutes() + h * 60,
		s = d.getSeconds() + m * 60,
		ms = d.getMilliseconds() + s * 1000,
		pct = ms / milliseconds % 1;

	for (var i = 0; i < numCircles; i++) {
		var arc = pct * Math.pow(2, numCircles - i - 1);
		var x = cx + faceRadius * Math.sin(arc * tau);
		var y = cy - faceRadius * Math.cos(arc * tau);
		moveCircle(circles[i], x, y);
	}
});
