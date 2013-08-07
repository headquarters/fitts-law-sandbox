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
	var distance = null;
	var previousDistance = null;
	var startTime = null;
	var endTime = null;
	var $distance = $('#distance');
	var $width = $('#width');
	var $movementTime = $('#movement-time');
	var $actualMovementTime = $('#actual-movement-time');
	
	self.init = function(){
		target = sandbox.rect(midpointX - (targetWidth / 2), midpointY - (targetHeight / 2), targetWidth, targetHeight, 5);
		target.attr({
			fill: "#fff"
		});
		
		sandbox.text(midpointX, midpointY, "Target").attr({
			font: "16px Arial",
			fill: "#999"
		});
		
		$width.text(targetWidth);
		
		$('#sandbox').on('mousemove', self.cursorMoves);
		
		$(target.node).on('mouseenter', self.enterTarget).on('mouseleave', self.leaveTarget);
		
	};
	
	self.cursorMoves = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		
		if (lineToTarget == null) {
			lineToTarget = sandbox.path("M" + x + " " + y + "L" + midpointX + " " + midpointY);
		} else {
			lineToTarget.attr("path", "M" + x + " " + y + "L"+ midpointX + " " + midpointY);
		}
		
		distance = self.getDistance(midpointX, midpointY, x, y);
				
		if(distance >= previousDistance) {
			console.log('decreasing');
			//distance is increasing, user is moving away from target
			startTime = (new Date).getTime();	
		} else {
			//distance is decreasing, user is moving toward the target
			//clearInterval(intervalID);
			
			if (startTime == null) {
				console.log('update start time');
				startTime = (new Date).getTime();	
				
			} else {
				console.log('update end time, start time: ', startTime);
				endTime = (new Date).getTime();
			}
			
			
		}
		
		if (distanceText == null) {
			distanceText = sandbox.text(midpointX + (distance/2), midpointY + (distance/2), distance.toFixed(2)).attr({
				font: "12px Arial",
				fill: "#666"
			});
		} else {
			var textMidpoint = self.getMidpoint(x, midpointX, y, midpointY);

			distanceText.attr({ x: textMidpoint.x, y: textMidpoint.y, text: distance.toFixed(2)});
		}
		
		$distance.text(distance.toFixed(2));
		
		var mt = Fitts.getMovementTime(distance, targetWidth);
		
		$movementTime.text(mt.toFixed(2));
		
		//stash distance for next cursorMove
		previousDistance = distance;
	};
	
	self.enterTarget = function(){
		//clearInterval(intervalID);
		$('#sandbox').off('mousemove');
		
		lineToTarget.remove();
		distanceText.remove();
		
		lineToTarget = null;
		distanceText = null;
		
		$actualMovementTime.text(endTime - startTime);
	}
	
	self.leaveTarget = function(){
		$('#sandbox').on('mousemove', self.cursorMoves);
		
		startTime = null;
		endTime = null;
	}
	
	self.getDistance = function(x1, y1, x2, y2){
		return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) );
	};
	
	self.getMidpoint = function(x1, x2, y1, y2){
		return { x: ((x1 + x2) / 2), y: ((y1 + y2) / 2) };
	}
	
	return self;
}();

Sandbox.init();





	