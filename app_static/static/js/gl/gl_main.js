/**
 * Created by mj on 2016/3/21.
 * gl-index
 */
define(function(require,exports,module){

    var $ = require('JQ');
    var recommend = require('http://10.155.11.94/static/js/gl/recommend.js');

    var Main = function(){};

    Main.prototype = {
        init:function(){
            var arr = [];
            arr.push({url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg'});
            arr.push({url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg'});
            arr.push({url:'http://www.d9js.com/ProductImages/Pd_201006182310290000067_s.jpg'});
            recommend.show($('.rec-con'),arr);
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