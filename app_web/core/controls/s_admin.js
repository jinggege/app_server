/**
 * Created by dell on 2016/3/24.
 */

var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');
var single      = require(global.rootUrl+'/lib/singleclass.js');

var GL_Admin = function(){};

GL_Admin.prototype = {
    getControl:function*(){
        var renderData = {};

        var dataM = single.getSingleClass(single.getCKEY().DATA_MANAGE);
        renderData.allGoodsList = dataM.getAllGoods();

        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
        this.body = yield render('gl_admin', renderData);
    }

};


module.exports = new GL_Admin();