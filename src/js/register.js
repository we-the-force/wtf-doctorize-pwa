
import $$ from 'dom7';

var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var regex2 = /^([0-9]){10}$/;
var username,password,email,phone;

$$(document).on('page:init', '.page[data-name="register-step1"]', function (e) {
    $$('#register-step1 .login-button').addClass('grey');
    $$('#register-step1 .login-button').off('click');
    $$(document).on('input:notempty', '#username', function(e){
        $$(document).on('input:notempty', '#password', function(e){
            $$('#register-step1 .login-button').removeClass('grey');
            $$('#register-step1 .login-button').off('click');
            $$('#register-step1 .login-button').on('click', function(e){
                username = $$('[name="fullname"]').val();
                password = $$('[name="password"]').val();

            });
        });
    });
});

$$(document).on('page:init', '.page[data-name="register-step2"]', function (e) {
    $$('#register-step2 .login-button').addClass('grey');
    $$('#register-step2 .login-button').off('click');
    $$(document).on('input:notempty', '#email', function(e){
        $$(document).on('input:notempty', '#phone', function(e){
            email = $$('[name="email"]').val();
            phone = $$('[name="phone"]').val();
            if(regex.test(email) && regex2.test(phone))
            {
                $$('#register-step2 .login-button').removeClass('grey');
                $$('#register-step2 .login-button').off('click');
                $$('#register-step2 .login-button').on('click', function(e){

                });
            }else{
                $$('#register-step2 .login-button').addClass('grey');
                $$('#register-step2 .login-button').off('click');
            }
        });
    });
});

$$(document).on('page:init', '.page[data-name="register-step3"]', function (e) {
    $$('#register-step3 .login-button').off('click')
    $$('#register-step3 .login-button').on('click', function(e){
        app.request.postJSON('http://206.189.192.79:8080/user/save', { 	
        "password": password,
        "email": email,
        "name": username,
        "cellphone": phone
        }, function(e){
            console.log(e);
        });
    });
});