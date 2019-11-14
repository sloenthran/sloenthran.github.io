$(document).ready(function() {
    if(!localStorage.token) {
        location.href = "index.html";
    }
});

$.ajaxSetup({
    beforeSend: function (xhr)
    {
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    },
    dataType: 'json'
});

$('#logout').click(function() {
    localStorage.clear();
    location.href = "index.html";
});

$(".user-info").click(function() {
    $(".user-account-settingss").slideToggle( "fast");
});

/////////////////////////////////// INITIAL DATA ///////////////////////////////////

//Get username
$(document).ready(function() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/user/me",
        type: 'GET',
        success: function(data){
            $("#user-name").html(data.username);
        },
        error: function() {
            localStorage.clear();
            location.href = "index.html";
        }
    });
});

//Get topics
$(document).ready(function() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topics",
        type: 'GET',
        success: function(data) {
            var output;

            for(var i in data) {
                output += "<div class=\"usr-question\">" +
                                "<div class=\"usr_quest\">" +
                                    "<h3>"+ data[i].title +"</h3>" +
                                    "<ul class=\"react-links\">" +
                                        "<li><a href=\"#\" title=\"\"><i class=\"fas fa-comment-alt\"></i> "+ data[i].commentsCount +"</a></li>" +
                                    "</ul>" +
                                    "<ul class=\"quest-tags\">" +
                                        "<li><a href=\"#\" title=\"\">"+ data[i].tag +"</a></li>" +
                                    "</ul>" +
                                "</div>" +
                                "<span class=\"quest-posted-time\"><i class=\"fa fa-clock-o\"></i>3 min ago by Sloenthran</span>" +
                            "</div>";
            }

            $("#forum-questions").html(output);
        },
        error: function() {
            localStorage.clear();
            location.href = "index.html";
        }
    });
});

/////////////////////////////////// END INITIAL DATA ///////////////////////////////////

/////////////////////////////////// CHANGE PASSWORD ///////////////////////////////////

$("#change-password-form").on("submit", function() {
    $("#error-change-password").hide();

    var _oldPass = $('#change-password-old').val();
    var _newPass = $('#change-password-new').val();

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/user/change/password",
        type: "PUT",
        data: JSON.stringify({oldPassword: _oldPass, newPassword: _newPass}),
        success: function(data){
            $("#change-password-box").removeClass("open");
            $(".wrapper").removeClass("overlay");

            alert("Password change successful!");

            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-change-password").html(responseText.message);
            $("#error-change-password").show();
        }
    });
    return false;
});

$(".change-password-box").on("click", function(){
    $("#change-password-box").addClass("open");
    $(".wrapper").addClass("overlay");
    $(".user-account-settingss").slideToggle( "fast");
    return false;
});

$("#close-change-password-box").on("click", function(){
    $("#change-password-box").removeClass("open");
    $(".wrapper").removeClass("overlay");
    return false;
});

/////////////////////////////////// END CHANGE PASSWORD ///////////////////////////////////

/////////////////////////////////// CHANGE EMAIL ///////////////////////////////////

$("#change-email-form").on("submit", function() {
    $("#error-change-email").hide();

    var _newMail = $('#change-email-new').val();
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/user/change/email/?email=" + _newMail,
        type: "PUT",
        success: function(data){
            $("#change-email-box").removeClass("open");
            $(".wrapper").removeClass("overlay");

            alert("Email change successful!");

            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-change-email").html(responseText.message);
            $("#error-change-email").show();
        }
    });
    return false;
});

$(".change-email-box").on("click", function(){
    $("#change-email-box").addClass("open");
    $(".wrapper").addClass("overlay");
    $(".user-account-settingss").slideToggle( "fast");
    return false;
});

$("#close-change-email-box").on("click", function(){
    $("#change-email-box").removeClass("open");
    $(".wrapper").removeClass("overlay");
    return false;
});

/////////////////////////////////// END CHANGE EMAIL ///////////////////////////////////