/**
 * Created by mj on 2016/3/21.
 * good life  index
 */
'use strict';
var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');

var single      = require(global.rootUrl+'/lib/singleclass.js');

var GL_INDEX = function(){};

var instance = null;
GL_INDEX.prototype = {
    getControl:function*(){
        var dataM = single.getSingleClass(single.getCKEY().DATA_MANAGE);

        var renderData = {};
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
        renderData.allGoodsList  = dataM.getAllGoods();
        renderData.recommendList = dataM.getRecommendList();
       this.body = yield render('gl_index', renderData);
    }

};


instance = instance==null? new GL_INDEX() : instance;
module.exports = instance;