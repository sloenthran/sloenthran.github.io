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

    $('button#submit-login-button').click( function() {
        var _username = $('#login-username').val();
        var _password = $('#login-password').val();

        jQuery.ajax ({
            url: "https://java-forum-application.herokuapp.com/login",
            type: "POST",
            data: JSON.stringify({username: _username, password: _password}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data){
                console.log(data);
            }
        });
    })
});