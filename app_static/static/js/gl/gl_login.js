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

            $('.btn-login').on('click',function(){
                if(domName.val()=='' || domPassword.val()==''){
                    alert('用户名或密码不能为空!');
                    return;
                }

                    $.post(
                        '/gl_login',
                        {
                            uName:domName.val(),
                            uPassword:domPassword.val()
                        },
                        function(data,status){
                            console.log(data,status);
                            location.href = '/gl_index';
                        }
                    );

              });





        }

    };

    module.exports = new Login();
});