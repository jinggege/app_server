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

var instance = null;
C_ROOM.prototype = {
    getControl:function*(){
        var cUrl = this.request.url;
        var args = url.parse(cUrl,true).query;
        var roomId = args.roomId;

        var roomInfo = d_manage.getRoomInfoById(roomId);
        var u1Id = roomInfo.u1Id;
        var u2Id = roomInfo.u2Id;

        var userList = [];
        var userInfo =null;
        if(u1Id != -1){
            userInfo = d_manage.getUserInfo(u1Id);
            userList.push({uId:u1Id,color:userInfo.color,order:userInfo.order});
        }

        if(u2Id != -1){
            userInfo = d_manage.getUserInfo(u2Id);
            userList.push({uId:u2Id,color:userInfo.color,order:userInfo.order});
        }

        var resBody = {};
        var respone = {};
        resBody.respone = respone;
        respone.data = userList;
        respone.msg  = "成功";
        respone.code = 1;
        var str = JSON.stringify(resBody);
        this.body = str;

    }



};

instance = instance==null? new C_ROOM() : instance;
module.exports = instance;