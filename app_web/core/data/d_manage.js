/**
 * Created by dell on 2016/2/26.
 * 全局数据管理类
 */

'use strict';

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
            roomObj.lastUpdataTime = 0;
            list.push(roomObj);
        }
        global.roomList = list;
    },

    initUserInfo:function(){
        global.roomUserMap = {};
       // global.roomUserMap[roomId]=[{uId:0,uName:"",color:#000000,order:1,roomId:xxx,step:0}]
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
                    this.setRoomUserInfo(roomId,uId,1,'#FFFFFF');
                }else{
                    roomItem.u2Id = uId;
                    this.setRoomUserInfo(roomId,uId,2,'#000000');
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
    setRoomUserInfo:function(roomId,uId,order,color){
        var uList = global.roomUserMap[roomId];
        if(uList == null || uList==undefined){
            global.roomUserMap[roomId] = [];
        }
        var uInfo = {uId:uId,order:order,color:color};
        global.roomUserMap[roomId].push(uInfo);
    },

    getRoomUserByOrder:function(roomId,order){
        var userList = global.roomUserMap[roomId];
        var uItem = null;
        for(var i=0; i<userList.length; i++){
            uItem = userList[i];
            if(uItem.order == order){
                return uItem;
            }
        }//END FOR
        return null;
    },
    getRoomUserById:function(roomId,uId){
        var userList = global.roomUserMap[roomId];

        if(userList == undefined || userList==null){
            return null;
        }

        var uItem = null;
        for(var i=0; i<userList.length; i++){
            uItem = userList[i];
            if(uItem.uId == uId){
                return uItem;
            }
        }//END FOR
        return null;
    },
    clearRoomById:function(roomId){
        var roomInfo = null;
        for(var i=0; i<global.roomList.length; i++){
            roomInfo = global.roomList[i];
            if(roomInfo.roomId = roomId){
                roomInfo.u1Id = -1;
                roomInfo.u2Id = -1;
                roomInfo.currCount = 0;
                roomInfo.version = 0;
                roomInfo.pCount = "0/"+roomInfo.maxCount;
                global.roomList[i] = roomInfo;
                return;
            }
        }
    },
    setRoomVersion:function(roomId,version){
        var roomInfo = null;
        for(var i=0; i<global.roomList.length; i++){
            roomInfo = global.roomList[i];
            if(roomInfo.roomId = roomId){
                roomInfo.version   = version;
                global.roomList[i] = roomInfo;
                return;
            }
        }
    },

    getRoomVersion:function(roomId){
        var roomInfo = null;
        for(var i=0; i<global.roomList.length; i++){
            roomInfo = global.roomList[i];
            if(roomInfo.roomId = roomId){
                return roomInfo.version;
            }
        }
    }

};



instance = instance == null? new D_MANAGE() : instance;
module.exports = instance;