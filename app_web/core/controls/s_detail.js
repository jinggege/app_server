/**
 * Created by dell on 2016/3/24.
 */

var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');

var G_Detail = function(){};

G_Detail.prototype = {
    getControl:function*(){
         var renderData = {};
         renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
         this.body = yield render('gl_detail', renderData);
    }

};


module.exports = new G_Detail();