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