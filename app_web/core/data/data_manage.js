/**
 * Created by dell on 2016/2/26.
 * 全局数据管理类
 */

'use strict';

var D_MANAGE = function(){};

D_MANAGE.prototype = {
    start:function(){
        this.allGoodsList = [];
        this.recommendList = [];

        this.createGoods();
        this.createRecommendData();
    },

    getAllGoods:function(){
        return this.allGoodsList;
    },

    getRecommendList:function(){
        return this.recommendList;
    },

    delGoodsById:function(gId){
        for(var i=0; i<this.allGoodsList.length; i++){
            if(String(gId) == String(this.allGoodsList[i].gId)){
                this.allGoodsList.splice(i,1);
                return true;
            }
        }

        return false;
    },

    createGoods:function(){
        this.allGoodsList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:Math.floor(Math.random()*9999)
            }
        );
        this.allGoodsList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:Math.floor(Math.random()*9999)
            }
        );
        this.allGoodsList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:Math.floor(Math.random()*9999)
            }
        );

    },

    createRecommendData:function(){

        this.recommendList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:Math.floor(Math.random()*9999)
            }
        );
        this.recommendList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:Math.floor(Math.random()*9999)
            }
        );
        this.recommendList.push(
            {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                label:'xxxxx',
                price:Math.floor(Math.random()*100),
                gId:Math.floor(Math.random()*9999)
            }
        );



    }



};


module.exports = new D_MANAGE();