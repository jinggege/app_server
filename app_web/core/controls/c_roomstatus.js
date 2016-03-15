/**
 * Created by dell on 2016/2/26.
 * game server
 */
'use strict';
var url         = require("url");
var render     = require(global.rootUrl+'/lib/render.js');
var d_manage   = require(global.rootUrl+'/data/d_manage.js');

var CRoomStatus = function(){};
var stepInfoMap = {};

var instance = null;
CRoomStatus.prototype = {
    getControl:function*(){
        var cUrl     = this.request.url;
        var args     = url.parse(cUrl,true).query;
        var roomId   = args.roomId;
        var uId      = args.uId;
        var action   = args.action;
        var roomInfo = d_manage.getRoomInfoById(roomId);
        var u1Id     = roomInfo.u1Id;
        var u2Id     = roomInfo.u2Id;

        var stepInfo = instance.getStepInfoByRoomId(roomId);

        var resBody  = {};
        var response = {};
        resBody.response = response;

        switch(action){
            case "getUserInfo":
                var userList = [];
                var userInfo =null;
                if(u1Id != -1){
                    userInfo = d_manage.getRoomUserById(roomId,u1Id);
                    userList.push({uId:u1Id,color:userInfo.color,order:userInfo.order});
                    d_manage.setRoomVersion(roomId,new Date().getTime())
                }

                if(u2Id != -1){
                    userInfo = d_manage.getRoomUserById(roomId,u2Id);
                    userList.push({uId:u2Id,color:userInfo.color,order:userInfo.order});
                    d_manage.setRoomVersion(roomId,new Date().getTime())
                }

                response.uList = userList;
                response.msg   = "成功";
                response.code  = 1;
                this.body     = JSON.stringify(resBody);
                break;

            case "getStepInfo":
                stepInfo.step = args.hasOwnProperty("step")? args.step : stepInfo.step;
                stepInfo.activeId = args.hasOwnProperty("activeId")? args.activeId : stepInfo.activeId;
                if(d_manage.roomIsFull(roomId) && stepInfo.doUid==-1){
                    stepInfo.activeId = d_manage.getRoomUserByOrder(roomId,1).uId;
                }

                stepInfo.uId   = uId;
                stepInfo.doUid = args.hasOwnProperty("doUid")?args.doUid:stepInfo.doUid;
                stepInfo.order = args.hasOwnProperty("order")?args.order:stepInfo.order;
                response.stepInfo = stepInfo;
                this.body  = JSON.stringify(resBody);
                break;

            case "sendStepInfo":
                stepInfo.uId       = args.uId;
                stepInfo.activeId = args.activeId;
                stepInfo.step      = args.step;
                stepInfo.row       = args.row;
                stepInfo.col       = args.col;
                stepInfo.doUid    = args.doUid;
                stepInfo.order    = args.order;
                this.body = JSON.stringify(stepInfo);
                d_manage.setRoomVersion(roomId,new Date().getTime());
                break;

        }//END SWITCH

    },//end getControl

    getStepInfoByRoomId:function(roomId){
        var roomInfo = stepInfoMap[roomId];
        if(roomInfo == null || roomInfo==undefined){
            stepInfoMap[roomId] = {uId:-1,step:0,order:0,activeId:-1,doUid:-1,row:0,col:0};
        }
        return stepInfoMap[roomId];
    },

    checkRoomHealth:function(roomId){

    }

};

instance = instance==null? new CRoomStatus() : instance;
module.exports = instance;