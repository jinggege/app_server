/**
 * Created by mj on 2016/3/21.
 * gl-index
 */
define(function(require,exports,module){

    var $ = require('JQ');
    var recommend = require('http://10.155.11.94/static/js/gl/recommend.js');
    var goods = require('http://10.155.11.94/static/js/gl/goodsitem.js');

    var Main = function(){};

    Main.prototype = {
        init:function(){
            var arr = [];
            arr.push(
                {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                 label:'xxxxx',
                 price:'8888'
                });
            arr.push(
                {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                    label:'xxxxx',
                    price:'8888'
                });
            arr.push(
                {url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg',
                    label:'xxxxx',
                    price:'8888'
                });
            recommend.show($('.rec-con'),arr);


            var goodsArr = [];
            goodsArr.push({url:'http://www.d9js.com/ProductImages/Pd_201602041830320000039_s.jpg',label:'EEE',price:'5555'});
            goodsArr.push({url:'http://www.d9js.com/ProductImages/Pd_201602041830320000039_s.jpg',label:'EEE',price:'5555'});
            goodsArr.push({url:'http://www.d9js.com/ProductImages/Pd_201602041830320000039_s.jpg',label:'EEE',price:'5555'});
            goodsArr.push({url:'http://www.d9js.com/ProductImages/Pd_201602041830320000039_s.jpg',label:'EEE',price:'5555'});
            goodsArr.push({url:'http://www.d9js.com/ProductImages/Pd_201602041830320000039_s.jpg',label:'EEE',price:'5555'});
            goodsArr.push({url:'http://www.d9js.com/ProductImages/Pd_201602041830320000039_s.jpg',label:'EEE',price:'5555'});

            goods.show($('.display-con'),goodsArr);

        },

        refreshNavLeft:function(){
            var winH = $(window).height();
            var navLeftDom = $('.main-nav-left');
            navLeftDom.css('height',winH);

            $(window).resize(
                function(){
                    winH = $(window).height();
                    navLeftDom.css('height',winH);
                }
            );

        }

    };


    module.exports = new Main();
});