/**
 * Created by dell on 2016/2/26.
 */
var D_MANAGE = function(){};

var instance = null;

D_MANAGE.prototype = {
    start:function(){
        this.initRoomList();
    },
    initRoomList:function(){
        var list = [];
        for(var i=0; i<5; i++){
            var roomObj = {};
            roomObj.roomId = i;
            roomObj.maxCount = 2;
            roomObj.currCount = 0;

            roomObj.pCount = String(roomObj.currCount)+"/"+String(roomObj.maxCount);
            list.push(roomObj);
        }
        global.roomList = list;
    },

    getRoomList:function(){
        return global.roomList;
    },

    updataRoomListByRoomId:function(roomId){
        var baseRoomList = global.roomList;
        var roomItem = null;
        for(var i=0; i<baseRoomList.length; i++){
            roomItem = baseRoomList[i];
            if(roomItem.roomId == roomId){
                baseRoomList[i].currCount +=1;
                baseRoomList[i].pCount =String(baseRoomList[i].currCount)+"/"+String(baseRoomList[i].maxCount)
                return;
            }
        }

        global.roomList = baseRoomList;
    }

};



instance = instance == null? new D_MANAGE() : instance;
module.exports = instance;