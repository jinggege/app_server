/**
 * Created by dell on 2016/2/26.
 */
var url = require("url");
var render   = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var C_ADDROOM = function(){};

var instance = null;
C_ADDROOM.prototype = {
    getControl:function*(){
        var cUrl   = this.request.url;
        var arg    = url.parse(cUrl, true).query;
        var roomId = arg.room;

        var roomItem = instance.getRoomInfoById(roomId);
        if(roomItem.currCount>= roomItem.maxCount){
            this.body = yield render('roomfull', {});
            return;
        }

        d_manage.updataRoomListByRoomId(roomId);

        var renderData = {};
        renderData.roomId = roomId;
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;

        this.body = yield render('roomtest', renderData);
    },

    getRoomInfoById:function(roomId){
        var roomList = d_manage.getRoomList();
        var roomItem = null;
        for(var i=0; i<roomList.length; i++){
            roomItem = roomList[i];
            if(roomItem.roomId == roomId){
                return roomItem
            }

        }//end for
    }


};

instance = instance==null? new C_ADDROOM() : instance;
module.exports = instance;


/*
function *roomLog(){
    var cUrl = this.request.url;
    var arg  = url.parse(cUrl, true).query;
    trace(["jsonp",arg.callback]);
    this.body = arg.callback+'('+'{"msg":"jsonp  test--"}'+')';  //jsonp 解决跨域请求问题
}
    */