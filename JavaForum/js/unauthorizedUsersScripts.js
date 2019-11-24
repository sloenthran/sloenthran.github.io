$(document).ready(function() {
    if(localStorage.token) {
        location.href = "index_logged.html";
    }
});

$.ajaxSetup({
    beforeSend: function (xhr)
    {
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    },
    dataType: 'json'
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

$(document).ready(function() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topics",
        type: 'GET',
        success: function(data) {
            var output = "";

            for(var i in data) {
                output += "<div class=\"usr-question\">" +
                    "<div class=\"usr_quest\">" +
                    "<h3><a href=\"post.html?id="+data[i].id+"\" title=\"\">"+ data[i].title +"</a></h3>" +
                    "<ul class=\"react-links\">" +
                    "<li><a href=\"post.html?id="+data[i].id+"\" title=\"\"><i class=\"fas fa-comment-alt\"></i> "+ data[i].commentsCount +"</a></li>" +
                    "</ul>" +
                    "<ul class=\"quest-tags\">" +
                    "<li><a href=\"#\" title=\"\">"+ data[i].tag +"</a></li>" +
                    "</ul>" +
                    "</div>" +
                    "<span class=\"quest-posted-time\"><i class=\"fa fa-clock-o\"></i>"+ data[i].createdDate.replace("T", " ") +" by "+ data[i].createdBy +"</span>" +
                    "</div>";
            }

            $(".forum-questions").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            alert(responseText.message);
        }
    });
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

function getTopic(topicId) {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topic/" + topicId,
        type: 'GET',
        success: function(data) {
            var output = "";

            output += "<div class=\"usr_quest\">" +
                "<h3>"+ data.topic.title +"</h3>" +
                "<span><i class=\"fa fa-clock-o\"></i>"+ data.topic.createdDate.replace("T", " ")  +" by "+ data.comments[0].author +"</span>" +
                "<ul class=\"react-links\">" +
                "<li><a href=\"#\" title=\"\"><i class=\"fa fa-heart\"></i> Vote "+ data.topic.likesCount +"</a></li>" +
                "</ul>" +
                "<ul class=\"quest-tags\">" +
                "<li><a href=\"#\" title=\"\">"+ data.topic.tag +"</a></li>" +
                "</ul>" +
                "<p>"+data.comments[0].text+"</p>" +
                "<div class=\"comment-section\">" +
                "<h3>"+ data.topic.commentsCount +" Comments</h3>" +
                "<div class=\"comment-sec\">" +
                "<ul>";

            for(var i in data.comments) {
                if(i == 0) continue;

                output += "<li>" +
                    "<div class=\"comment-list\">" +
                    "<div class=\"comment\">" +
                    "<h3>"+ data.comments[i].author +"</h3>" +
                    "<span><i class=\"fa fa-clock-o\"></i>"+ data.comments[i].createdDate.replace("T", " ") +"</span>" +
                    "<p>"+ data.comments[i].text +"</p>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
            }

            output += "</ul></div></div></div>";

            $(".usr-question").html(output);

            var widget = "<ul>" +
                "<li>" +
                "<i class=\"fa fa-heart\"></i>" +
                "<span>"+ data.topic.likesCount +"</span>" +
                "</li>" +
                "<li>" +
                "<i class=\"fa fa-comment\"></i>" +
                "<span>"+ data.topic.commentsCount +"</span>" +
                "</li>" +
                "<li>" +
                "<i class=\"fa fa-eye\"></i>" +
                "<span>"+ data.topic.viewedCount +"</span>" +
                "</li>" +
                "</ul>";

            $(".widget.widget-feat").html(widget);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            alert(responseText.message);
        }
    });
}

function getMostLikedTopics() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topics/likes",
        type: 'GET',
        success: function(data) {
            var output = "<h3 class=\"title-wd\">Most liked Topics</h3>" +
                "<ul>";

            for(var i in data) {
                var image = i;
                image++;

                output += "<li>" +
                        "<div class=\"usr-msg-details\">" +
                            "<div class=\"usr-mg-info\">" +
                                "<a href='post.html?id="+ data[i].topicId +"'><h3>"+ data[i].topicName +"</h3></a>" +
                            "</div>" +
                        "</div>" +
                        "<span><img src=\"./images/place/"+ image +".png\" alt=\"\">"+ data[i].topicLikes +"</span>" +
                    "</li>"
            }

            output += "</ul>";

            $(".widget.widget-user").html(output);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            alert(responseText.message);
        }
    });
}