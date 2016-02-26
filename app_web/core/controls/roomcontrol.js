
var globalData = require(global.rootUrl+"/data/globaldata.js");

var RoomControl = function(){};



RoomControl.prototype = {
	
	updataRoomListByRoomId:function(roomId){
		var baseRoomList = globalData.getRoomList();
		var roomItem = null;
		for(var i=0; i<baseRoomList.length; i++){
			roomItem = baseRoomList[i];
			if(roomItem.roomId == roomId){
				baseRoomList[i].currCount +=1;
				baseRoomList[i].pCount =String(baseRoomList[i].currCount)+"/"+String(baseRoomList[i].maxCount)
				return;
			}
			
		}
		
		globalData.setRoomList = baseRoomList;

	},
	
	getRoomInfoByRoomId:function(roomId){
		var baseRoomList = globalData.getRoomList();
		var roomItem = null;
		for(var i=0; i<baseRoomList.length; i++){
			roomItem = baseRoomList[i];
			if(roomItem.roomId == roomId){
				return roomItem;
			}

		}
		
	}

	
}

module.exports = new RoomControl();