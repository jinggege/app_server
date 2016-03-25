/**
 * Created by dell on 2016/3/24.
 */

var url         = require("url");
var render      = require(global.rootUrl+'/lib/render.js');
var single      = require(global.rootUrl+'/lib/singleclass.js');

var GL_Admin = function(){};

GL_Admin.prototype = {
    getControl:function*(){
        var query = url.parse(this.request.url,true).query;

        var dataM = single.getSingleClass(single.getCKEY().DATA_MANAGE);

        var actionType = query.ac;
        var gId = query.gid;

        switch(actionType){
            case 'del':

               var operateFlag =  dataM.delGoodsById(gId);
                var resp = {};
                resp.response = operateFlag? {data:gId,code:0,msg:'success'} : {data:gId,code:1,msg:'fail'};
                this.body = JSON.stringify(resp);
                break;

            default :
                var renderData = {};

                renderData.allGoodsList = dataM.getAllGoods();

                renderData.STATIC_DOMAIN = global.appConfig.app_static_domain;
                this.body = yield render('gl_admin', renderData);
                break;
        }//end switch

    }

};


module.exports = new GL_Admin();