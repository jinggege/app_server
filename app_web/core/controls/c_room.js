/**
 * Created by dell on 2016/2/26.
 */
/**
 * Created by dell on 2016/2/26.
 */
var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');


var C_ROOM = function(){};
var stepInfo = {uId:-1,step:0,order:0,activeId:-1,doUid:-1,row:0,col:0};

var instance = null;
C_ROOM.prototype = {
    getControl:function*(){
        var cUrl = this.request.url;
        var args = url.parse(cUrl,true).query;
        var roomId = args.roomId;
        var uId    = args.uId;
        var action = args.action;
        var roomInfo = d_manage.getRoomInfoById(roomId);
        var u1Id = roomInfo.u1Id;
        var u2Id = roomInfo.u2Id;


        var step = 0;
        var activeId = -1;

        var resBody = {};
        var response = {};
        resBody.response = response;

        switch(action){
            case "getUserInfo":
                var userList = [];
                var userInfo =null;
                if(u1Id != -1){
                    userInfo = d_manage.getUserById(u1Id);
                    userList.push({uId:u1Id,color:userInfo.color,order:userInfo.order});
                }

                if(u2Id != -1){
                    userInfo = d_manage.getUserById(u2Id);
                    userList.push({uId:u2Id,color:userInfo.color,order:userInfo.order});
                }

                response.uList = userList;
                response.msg  = "成功";
                response.code = 1;
                var str = JSON.stringify(resBody);
                this.body = str;
                break;

            case "getStepInfo":
                step = args.hasOwnProperty("step")? args.step : stepInfo.step;
                activeId = args.hasOwnProperty("activeId")? args.activeId : stepInfo.activeId;
                if(d_manage.roomIsFull(roomId) && stepInfo.doUid==-1){
                    activeId = d_manage.getUserByOrder(1).uId;
                    stepInfo.activeId = activeId;
                }

                stepInfo.uId  = uId;
                stepInfo.step = step;
                stepInfo.doUid = args.hasOwnProperty("doUid")?args.doUid:stepInfo.doUid;
                response.stepInfo = stepInfo;
                var stepStr = JSON.stringify(resBody);
                this.body  = stepStr;

                break;

            case "sendStepInfo":
                console.log("args==",args);
                stepInfo.uId       = args.uId;
                stepInfo.activeId = args.activeId;
                stepInfo.step      = args.step;
                stepInfo.row       = args.row;
                stepInfo.col       = args.col;
                stepInfo.doUid    = args.doUid;
                break;

        }//END SWITCH

    }//END FUNC



};

instance = instance==null? new C_ROOM() : instance;
module.exports = instance;