/**
 * Created by dell on 2016/3/22.
 */
define(function(require,exports,module){
    var $ = require('JQ');
    var Recommend = function(){};

    Recommend.prototype = {

        show:function(container,arr){
            for(var i=0; i<arr.length; i++){
                container.append(this.recommendItem(arr[i]));
            }
        },

        recommendItem:function(data){
            var html = [
                '<div class="recommend-item-con">',
                    '<img src="'+data.url+'">',
                    '<div class="recommend-item-desc"></div>',
                '</div>'
            ].join('');

            return $(html);
        }




    };

    module.exports = new Recommend();
});