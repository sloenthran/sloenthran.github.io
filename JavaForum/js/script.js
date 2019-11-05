$(window).on("load", function() {
    "use strict";

    //AskQuestion Popup
    $(".ask-question").on("click", function(){
        $("#question-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $("#close-question-box").on("click", function(){
        $("#question-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //Login Popup
    $(".login-box").on("click", function(){
        $("#login-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $("#close-login-box").on("click", function(){
        $("#login-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //Register Popup
    $(".register-box").on("click", function(){
        $("#register-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $("#close-register-box").on("click", function(){
        $("#register-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });
});

//Login
$("#login-form").on("submit", function() {
    $("#error-login").hide();

    var _username = $('#login-username').val();
    var _password = $('#login-password').val();

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/login",
        type: "POST",
        data: JSON.stringify({username: _username, password: _password}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            $.cookie('token', data.token)

            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-login").html(responseText.message);
            $("#error-login").show();
        }
    });

    return false;
})

$("#register-form").on("submit", function() {
    $("#error-register").hide();

    var _username = $('#register-username').val();
    var _password = $('#register-password').val();
    var _email = $('#register-email').val();

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/register",
        type: "POST",
        data: JSON.stringify({username: _username, password: _password, email: _email}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-register").html(responseText.message);
            $("#error-register").show();
        }
    });

    return false;
})