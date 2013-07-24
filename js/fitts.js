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
	var target = null;
	var targetText = null;
	var sandbox = Raphael("sandbox", 800, 600);
	var lineToTarget = null;
	//var result = document.getElementById('result');
	
	self.init = function(){
		//sandbox.addEventListener('mousemove', self.calculateMovementTime, true);
		target = sandbox.rect(360, 275, 80, 50, 5);
		target.attr({
			fill: "#fff"
		});
		
		sandbox.text(400, 300, "Target").attr({
			font: "16px Arial",
			fill: "#999"
		});
		
		$('#sandbox').on('mousemove', self.cursorMoves);
	};
	
	self.cursorMoves = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		
		if (lineToTarget == null) {
			lineToTarget = sandbox.path("M" + x + " " + y + "L400 300");
		} else {
			lineToTarget.attr("path", "M" + x + " " + y + "L400 300");
		}
		
		console.log(self.getDistance(400, 300, x, y));
		
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





	