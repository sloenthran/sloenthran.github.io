$(document).ready(function() {
    if(localStorage.token) {
        location.href = "index_logged.html";
    }
});

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

/////////////////////////////////// REGISTER ///////////////////////////////////

$("#register-form").on("submit", function() {
    $("#error-register").hide();

    var _username = $('#register-username').val();
    var _password = $('#register-password').val();
    var _email = $('#register-email').val();

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/register",
        type: "PUT",
        data: JSON.stringify({username: _username, password: _password, email: _email}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(){
            $("#register-box").removeClass("open");
            $(".wrapper").removeClass("overlay");
            alert("Successful register!");
            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-register").html(responseText.message);
            $("#error-register").show();
        }
    });

    return false;
});

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

/////////////////////////////////// END REGISTER ///////////////////////////////////

/////////////////////////////////// LOGIN ///////////////////////////////////

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
            localStorage.token = data.token;

            $("#login-box").removeClass("open");
            $(".wrapper").removeClass("overlay");

            location.href = "index_logged.html";

            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-login").html(responseText.message);
            $("#error-login").show();
        }
    });

    return false;
});

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

/////////////////////////////////// END LOGIN ///////////////////////////////////