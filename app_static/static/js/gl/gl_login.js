/**
 * Created by dell on 2016/3/23.
 */
define(function(require,exports,module){
    var $ = require('JQ');
    var Login = function(){};

    Login.prototype = {
        init:function(){
            var domName = $('.u-in-name');
            var domPassword = $('.u-in-password');

            if(domName=='' || domPassword==''){
                alert('用户名或密码不能为空!');
                return;
            }

            $('.btn-login').on('click',function(){
                    $.post(
                        '/gl_login',
                        {
                            uName:'xxx',
                            uPassword:'uuuuu'
                        },
                        function(data,status){
                            console.log(data,status);
                        }
                    );

              });





        }

    };

    module.exports = new Login();
});