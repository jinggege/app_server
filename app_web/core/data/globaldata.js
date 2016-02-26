var GLOBAL = function(){};

GLOBAL.prototype = {
	setRoomList:function(roomList){
		global.roomList = roomList;
	},
	getRoomList:function(){
		return global.roomList;
	}
	
}

global.dataModule = global.dataModule==null? new GLOBAL() : global.dataModule;
module.exports = global.dataModule;