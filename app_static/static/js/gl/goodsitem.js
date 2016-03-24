/**
 * Created by dell on 2016/3/22.
 */
define(function(require,exports,module){

    var $ = require('JQ');

    var GoodsItem = function(){};

    GoodsItem.prototype = {
        show:function(container,arr){

            for(var i=0; i<arr.length; i++){
                $(container).append(this.getItem(arr[i]));
            }
        },

        getItem:function(data){
            var html = [
                '<ul class="goods-list">',
                    '<li>',
                        '<div class="goods-item">',
                            '<a href="/gl_detail?gid='+data.id +'">',
                                '<img class="goods-img" src="'+data.url+'">',
                            '</a>',
                            '<span class="g-item-label">'+data.label+'</span>',
                            '<span class="g-item-price">'+data.price+'</span>',
                        '</div>',
                    '</li>',
                '</ul>'
            ].join('');

            return $(html);
        }

    };



    module.exports = new GoodsItem();

});