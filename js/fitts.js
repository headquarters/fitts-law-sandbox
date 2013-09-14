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
	var distance = 0;
	var previousDistance = 0;
	var startTime = null;
	var endTime = null;
	var $distance = $('#distance');
	var $width = $('#width');
	var $movementTime = $('#movement-time');
	var $actualMovementTime = $('#actual-movement-time');
	var $slider = $('#slider').slider({
		min: 0,
		max: 5,
		step: 1
	});
	var sizes = [
		{
			width: targetWidth,
			height: targetHeight
		},
		{
			width: 100,
			height: 60
		},
		{
			width: 120,
			height: 70
		},
		{
			width: 140,
			height: 80
		},
		{
			width: 160,
			height: 90
		},
		{
			width: 180,
			height: 100
		}
	]
	
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
		
		$slider.on('slidestop', self.slidestop);
	};
	
	self.cursorMoves = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		
		if (lineToTarget == null) {
			lineToTarget = sandbox.path("M" + x + " " + y + "L" + midpointX + " " + midpointY).attr({
				opacity:0.3	
			});
		} else {
			lineToTarget.attr("path", "M" + x + " " + y + "L"+ midpointX + " " + midpointY);
		}
		
		distance = self.getDistance(midpointX, midpointY, x, y);
				
		
		console.log(distance, previousDistance);
		
		if(previousDistance > 0 && distance >= previousDistance) {
			console.log("moving away from target");
			//distance is increasing, user is moving away from target
			startTime = null;
			endTime = null;
		}
		
		if (startTime == null && distance < previousDistance) {
			console.log("starting the clock");
			//distance is decreasing, user is moving toward the target
			startTime = (new Date).getTime();	
		}
		
		
		if (distanceText == null) {
			distanceText = sandbox.text(midpointX + (distance/2), midpointY + (distance/2) + 50, distance.toFixed(2)).attr({
				font: "12px Arial",
				fill: "#666"
			});
		} else {
			var textMidpoint = self.getMidpoint(x, midpointX, y, midpointY);

			distanceText.attr({ x: textMidpoint.x, y: textMidpoint.y - 10, text: distance.toFixed(2)});
		}
		
		$distance.text(distance.toFixed(2));
		
		var mt = Fitts.getMovementTime(distance, target.attr('width'));
		
		$movementTime.text(mt.toFixed(2));
		
		//stash distance for next cursorMove
		previousDistance = distance;
	};
	
	self.slidestop = function(event, ui){
		
		var newWidth = sizes[ui.value].width;
		var newHeight = sizes[ui.value].height;
		
		target.attr({ width: newWidth, height: newHeight });
		
		console.log(newWidth, newHeight);
	}
	
	self.enterTarget = function(){
		//clearInterval(intervalID);
		$('#sandbox').off('mousemove');
		
		lineToTarget.remove();
		distanceText.remove();
		
		lineToTarget = null;
		distanceText = null;
		
		endTime = (new Date).getTime();	
		
		console.log("endTime: ", endTime, " startTime: ", startTime);
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





	