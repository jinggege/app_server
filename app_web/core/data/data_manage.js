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