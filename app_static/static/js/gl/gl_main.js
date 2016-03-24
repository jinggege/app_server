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
            recommend.show($('.rec-con'),window.CATCH.recommendList);
            goods.show($('.display-con'),window.CATCH.goodsList);
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