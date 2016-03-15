/**
 * Created by dell on 2016/3/11.
 * admin manage
 */
var url = require("url");
var render   = require(global.basePath+'/admin/lib/renderAdmin.js');

var CAdmin = function(){};

var instance = null;

CAdmin.prototype = {

    getControl:function*(){

        console.log(this.request);
        var cUrl   = this.request.url;
        var args    = url.parse(cUrl, true).query;

        var uName = args.uName;

        this.body = yield render('a_main', {});
        /*
        if(uName == null || uName== undefined){
            this.body = yield render('a_login', {});
        }else{
            this.redirect("/admin_main");
        }
        */
    }

};

instance= instance==null? new CAdmin(): instance;
module.exports = instance;

