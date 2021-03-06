/**
 * Created by dell on 2016/2/26.
 * 全局数据管理类
 */
var D_MANAGE = function(){};

var instance = null;

D_MANAGE.prototype = {
    start:function(){
        this.initRoomList();
        this.initUserInfo();
    },
    initRoomList:function(){
        var list = [];
        for(var i=0; i<5; i++){
            var roomObj = {};
            roomObj.roomId = i;
            roomObj.name = "room_"+i;
            roomObj.maxCount = 2;
            roomObj.currCount = 0;
            roomObj.u1Id = -1;
            roomObj.u2Id = -1;
            roomObj.pCount = String(roomObj.currCount)+"/"+String(roomObj.maxCount);
            list.push(roomObj);
        }
        global.roomList = list;
    },

    initUserInfo:function(){
        var userList = [];
      // userList.push( {uId:0,uName:"",color:#000000,order:1,roomId:xxx,step:0});
        global.userList = userList;

    },
    getRoomList:function(){
        return global.roomList;
    },

    joinRoom:function(roomId,uId){
        var baseRoomList = global.roomList;
        var roomItem = null;
        for(var i=0; i<baseRoomList.length; i++){
            roomItem = baseRoomList[i];
            if(roomItem.roomId == roomId){

                if(roomItem.u1Id == -1){
                    roomItem.u1Id = uId;
                    this.setUserInfo(uId,1,'#FFFFFF');
                }else{
                    roomItem.u2Id = uId;
                    this.setUserInfo(uId,2,'#000000');
                }

                roomItem.currCount +=1;
                roomItem.pCount =String(roomItem.currCount)+"/"+String(roomItem.maxCount);

                if(roomItem.currCount>= roomItem.maxCount){
                    roomItem.status = "doing";
                }else{
                    roomItem.status = "waiting";
                }

                return;
            }
        }

        global.roomList = baseRoomList;
    },

    roomIsFull: function (roomId) {
        var roomList = this.getRoomList();
        var roomItem = null;
        for(var i=0; i<roomList.length; i++){
            roomItem = roomList[i];
            if(roomItem.roomId == roomId){
                return roomItem.currCount >= roomItem.maxCount;
            }
        }//end for
        return false;
    },
    getRoomInfoById:function(roomId){
        var baseRoomList = global.roomList;
        var roomItem = null;
        for(var i=0; i<baseRoomList.length; i++){
            roomItem = baseRoomList[i];
            if(roomItem.roomId == roomId){
                return roomItem;
            }
        }//END FOR

    },
    setUserInfo:function(uId,order,color){
        global.userList.push({uId:uId,order:order,color:color,step:0});
    },

    setUserStep:function(uId,step){
        global.userList[uId].step = step;
    },
    getUserByOrder:function(order){
        var userList = global.userList;
        var uItem = null;
        for(var i=0; i<userList.length; i++){
            uItem = userList[i];
            if(uItem.order == order){
                return uItem;
            }
        }//END FOR
        return null;
    },
    getUserById:function(uId){
        var userList = global.userList;
        var uItem = null;
        for(var i=0; i<userList.length; i++){
            uItem = userList[i];
            if(uItem.uId == uId){
                return uItem;
            }
        }//END FOR
        return null;
    }

};


instance = instance == null? new D_MANAGE() : instance;
module.exports = instance;