var Fitts = function(){
	var self = {};
	
	//"back of the envelope" calculations in milliseconds (Raskin, 2000)
	var a = 50;
	var b = 150;
	
	/**
	 * Calculates Fitts's Law to return average Movement Time.
	 */
	self.getMovementTime = function(distanceFromMouseToTarget, targetWidth){
		return (a + b * (Math.log( (distanceFromMouseToTarget / targetWidth) + 1) / Math.log(2) ));
	};
	
	return self;
}();

var Sandbox = function(){
	var self = {};
	var width = 800;
	var height = 600;
	var midpointX = width / 2;
	var midpointY = height / 2;
	var targetWidth = 80;
	var targetHeight = 50;
	var target = null;
	var targetText = null;
	var sandbox = Raphael("sandbox", width, height);
	var lineToTarget = null;
	var distanceText = null;
	//var result = document.getElementById('result');
	
	self.init = function(){
		target = sandbox.rect(midpointX - (targetWidth / 2), midpointY - (targetHeight / 2), targetWidth, targetHeight, 5);
		target.attr({
			fill: "#fff"
		});
		
		sandbox.text(midpointX, midpointY, "Target").attr({
			font: "16px Arial",
			fill: "#999"
		});
		
		$('#sandbox').on('mousemove', self.cursorMoves);
	};
	
	self.cursorMoves = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		
		if (lineToTarget == null) {
			lineToTarget = sandbox.path("M" + x + " " + y + "L" + midpointX + " " + midpointY);
		} else {
			lineToTarget.attr("path", "M" + x + " " + y + "L"+ midpointX + " " + midpointY);
		}
		
		var distance = self.getDistance(midpointX, midpointY, x, y);
		
		if (distanceText == null) {
			distanceText = sandbox.text(midpointX + (distance/2), midpointY + (distance/2), distance.toFixed(2)).attr({
				font: "12px Arial",
				fill: "#666"
			});
		} else {
			console.log(distanceText);
			distanceText.attr({ x: midpointX + (distance/2), y: midpointY + (distance/2), text: distance.toFixed(2)});
		}
		
	};
	
	
	self.getDistance = function(x1, y1, x2, y2){
		return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) );
	};
	
	//sandbox: offsetLeft is 30, offsetTop is 80
	/*self.calculateMovementTime = function(e){
		var targetWidth = target.clientWidth;
		//compensate for #sandbox offset
		//TODO: calculate from appropriate corner, rather than always top left, depending on where mouse is
		var targetX = target.offsetLeft - sandbox.offsetLeft;
		var targetY = target.offsetTop - sandbox.offsetTop;
		var mouseX = e.pageX - sandbox.offsetLeft;
		var mouseY = e.pageY - sandbox.offsetTop;
		
		//use e.offsetX and e.offsetY to get mouse relative to #sandbox
		var distanceFromMouseToTarget = self.getDistance(targetX, targetY, mouseX, mouseY);
		
		console.log(distanceFromMouseToTarget);
		
		var movementTime = Fitts.getMovementTime(distanceFromMouseToTarget, targetWidth);
		//console.log(movementTime);
		result.innerHTML = movementTime;
	};

	*/
	return self;
}();

Sandbox.init();





	