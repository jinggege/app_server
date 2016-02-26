/**
 * Created by dell on 2016/2/26.
 */
/**
 * Created by dell on 2016/2/26.
 */
var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');
var d_manage = require(global.rootUrl+'/data/d_manage.js');

var C_INDEX = function(){};

var instance = null;
C_INDEX.prototype = {
    getControl:function*(){
        this.body = yield render('index', {desc:"Room List",author:'demo',roomList:d_manage.getRoomList() });
    },

    checkRoomStatus:function(){
        console.log("room status");
    }

};

instance = instance==null? new C_INDEX() : instance;
module.exports = instance;