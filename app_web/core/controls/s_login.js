/**
 * Created by mj on 2016/3/21.
 * good life  index
 */
'use strict';
var url          = require("url");
var render       = require(global.rootUrl+'/lib/render.js');
var querystring = require('querystring');

var GL_LOGIN = function(){};

var instance = null;
GL_LOGIN.prototype = {
    getControl:function*(){
        var _this = this;
        if(this.request.method=='POST'){
            this.req.setEncoding('utf-8');

            var postData = '';
            this.req.addListener('data',function(chunk){
                postData += chunk;
            });

            this.req.addListener('end',function(){
                var cData = querystring.parse(postData);
                _this.body = 'ok';
                _this.redirect('/gl_index')
            });

            return;
        }

        var renderData = {};
        renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
        this.body = yield render('gl_login', renderData);
    }

};

instance = instance==null? new GL_LOGIN() : instance;
module.exports = instance;