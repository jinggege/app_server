/**
 * Created by dell on 2016/2/26.
 * 全局数据管理类
 */

'use strict';

var util = require(global.rootUrl+'/lib/util.js');

var D_MANAGE = function(){};

D_MANAGE.prototype = {
    start:function(){
        this.allGoodsList = [];
        this.createGoods();
    },

    getAllGoods:function(){
        return this.allGoodsList;
    },

    setRecommendStatus:function(gId,rec){
        for(var i=0; i<this.allGoodsList.length; i++){
            if(String(gId) == String(this.allGoodsList[i].gId)){
                this.allGoodsList[i].rec = rec;
                return true;
            }
        }
    },

    getRecommendList:function(){

        var recList = [];

        for(var i=0; i<this.allGoodsList.length; i++){
            if(this.allGoodsList[i].rec == 1){
                var obj = this.allGoodsList[i];
                recList.push(obj);
            }
        }

        return recList;
    },

    /** 删除*/
    delGoodsById:function(gId){
        for(var i=0; i<this.allGoodsList.length; i++){
            if(String(gId) == String(this.allGoodsList[i].gId)){
                this.allGoodsList.splice(i,1);
                return true;
            }
        }

        return false;
    },

    /** 增加 */
    increaseGood:function(gInfo){
        gInfo.gId = util.createGid();
        this.allGoodsList.push(gInfo);
        return true;
    },


    createGoods:function(){
        this.allGoodsList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:util.createGid(),
                rec:0
            }
        );
        this.allGoodsList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:util.createGid(),
                rec:0
            }
        );
        this.allGoodsList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:util.createGid(),
                rec:0
            }
        );

    }



};


module.exports = new D_MANAGE();