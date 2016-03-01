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
var stepInfo = {uId:-1,step:0,order:0,activeId:-1};

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
                var step = args.hasOwnProperty("step")? args.step : 0;
                var activeId = args.hasOwnProperty("activeId")? args.activeId : -1;
                if(d_manage.roomIsFull(roomId) && stepInfo.step==0){
                    activeId = d_manage.getUserByOrder(1).uId;
                    stepInfo.activeId = activeId;
                }

                stepInfo.uId = uId;
                stepInfo.step = step;
                response.stepInfo = stepInfo;
                var stepStr = JSON.stringify(resBody);
                this.body = stepStr;

                break;

        }//END SWITCH

    }//END FUNC



};

instance = instance==null? new C_ROOM() : instance;
module.exports = instance;