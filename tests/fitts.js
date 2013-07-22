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
