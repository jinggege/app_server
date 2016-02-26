/**
 * Created by dell on 2016/2/26.
 */
var url = require("url");
var render = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var C_ADDROOM = function(){};

var instance = null;
C_ADDROOM.prototype = {
    getControl:function*(){
        var cUrl = this.request.url;
        var arg  = url.parse(cUrl, true).query;
        var roomId = arg.room;
        d_manage.updataRoomListByRoomId(roomId);
        this.body = yield render('roomtest', {roomId:roomId});
    },

    checkRoomStatus:function(){
        console.log("room status");
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