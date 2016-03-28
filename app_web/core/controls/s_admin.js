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

        var resp = {};
        switch(actionType){
            case 'gdel':
                //todo 需要改为异步操作
               var operateFlag =  dataM.delGoodsById(gId);
                resp.response = operateFlag? {data:gId,code:0,msg:'success'} : {data:gId,code:1,msg:'fail'};
                this.body = JSON.stringify(resp);
                break;
            case 'gin':
                    var gInfo   = {};
                    gInfo.url   = query.url;
                    gInfo.label = query.label;
                    gInfo.price = query.price;

                    //todo 需要改为异步操作
                    var increaseFlag = dataM.increaseGood(gInfo);
                    resp.response = increaseFlag? {data:'inscrease success',code:0,msg:'success'} : {data:'',code:1,msg:'fail'};
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