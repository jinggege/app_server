var DATA = function(){};
var instance = null;

DATA.prototype = {
	getRoomList:function(){
		var list = [];
		for(var i=0; i<5; i++){
			var roomObj = {};
			roomObj.roomId = i;
			roomObj.maxCount = 2;
			roomObj.currCount = 0;
			
			roomObj.pCount = String(roomObj.currCount)+"/"+String(roomObj.maxCount)
			list.push(roomObj);
		}
		
		return  list;
		
	}

	
}

 instance = instance==null? new DATA():instance;

module.exports = instance;