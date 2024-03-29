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

/////////////////////////////////// NEW TOPIC ///////////////////////////////////

$("#question-form").on("submit", function() {
    $("#error-question").hide();

    var _title = $('#question-title').val();
    var _text = $('#question-text').val();
    var _tag = $("#question-tag option:selected").text();;

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topic",
        type: "POST",
        data: JSON.stringify({title: _title, tag: _tag, text: _text}),
        dataType: "json",
        success: function(data){
            $("#question-box").removeClass("open");
            $(".wrapper").removeClass("overlay");

            alert("Topic created!");
            location.href = "index_logged.html";

            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-question").html(responseText.message);
            $("#error-question").show();
        }
    });
    return false;
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

/////////////////////////////////// END NEW TOPIC ///////////////////////////////////

/////////////////////////////////// EDIT COMMENT ///////////////////////////////////

function prepareEditComment(id) {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/comment/" + id,
        type: 'GET',
        success: function(data) {
            $("#edit-text").val(data.text);
            $("#edit-id").val(data.id);
            $("#edit-box").addClass("open");
            $(".wrapper").addClass("overlay");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            alert(responseText.message);
        }
    });
}

$("#edit-form").on("submit", function() {
    $("#error-edit").hide();

    var _id = $('#edit-id').val();
    var _text = $('#edit-text').val();

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/comment",
        type: "PUT",
        data: JSON.stringify({commentId: _id, text: _text}),
        dataType: "json",
        success: function(data){
            $("#edit-box").removeClass("open");
            $(".wrapper").removeClass("overlay");

            alert("Comment edited!");
            location.href = "post_logged.html?id=" + data.topicId;

            return true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $("#error-edit").html(responseText.message);
            $("#error-edit").show();
        }
    });
    return false;
});

$("#close-edit-box").on("click", function(){
    $("#edit-box").removeClass("open");
    $(".wrapper").removeClass("overlay");
    return false;
});

/////////////////////////////////// END EDIT COMMENT ///////////////////////////////////

function getTopic() {
    var topicId = getTopicId();

    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topic/" + topicId,
        type: 'GET',
        success: function(data) {
            var output = "";

            output += "<div class=\"usr_quest\">" +
                "<h3>"+ data.topic.title +"</h3>" +
                "<span><i class=\"fa fa-clock-o\"></i>"+ data.topic.createdDate.replace("T", " ") +" by "+ data.comments[0].author +"</span>" +
                "<ul class=\"react-links\">" +
                    "<li><a href=\"#\" title=\"\" onclick='like()'><i class=\"fa fa-heart\"></i> Vote "+ data.topic.likesCount +"</a></li>" +
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
                                "<span><i class=\"fa fa-clock-o\"></i>"+ data.comments[i].createdDate.replace("T", " ") +"</span>";

                if(localStorage.admin === 'OK') {
                    output += "&nbsp;&nbsp;&nbsp;<span onclick='deleteComment("+ data.comments[i].id +")'><i class=\"fa fa-trash\"></i> Delete comment</span>";
                }

                if(localStorage.moderator === 'OK') {
                    output += "&nbsp;&nbsp;&nbsp;<span onclick='prepareEditComment("+ data.comments[i].id +")'><i class=\"fa fa-edit\"></i> Edit comment</span>";
                }

                output +=       "<p>"+ data.comments[i].text +"</p>" +
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
            location.href = "index_logged.html";
        }
    });
}

function getTopics() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topics",
        type: 'GET',
        success: function(data) {
            var output = "";

            for(var i in data) {
                output += "<div class=\"usr-question\">" +
                    "<div class=\"usr_quest\">" +
                    "<h3><a href=\"post_logged.html?id="+data[i].id+"\" title=\"\">"+ data[i].title +"</a></h3>" +
                    "<ul class=\"react-links\">" +
                    "<li><a href=\"post_logged.html?id="+data[i].id+"\" title=\"\"><i class=\"fas fa-comment-alt\"></i> "+ data[i].commentsCount +"</a></li>" +
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
}

function getUserInfo() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/user/me",
        type: 'GET',
        success: function(data){
            $("#user-name").html(data.username);

            localStorage.moderator = 'NOT';
            localStorage.admin = 'NOT';

            for(var i in data.authorities) {
                if(data.authorities[i].role === 'ADMIN') {
                    localStorage.admin = 'OK';
                }

                if(data.authorities[i].role === 'MODERATOR') {
                    localStorage.moderator = 'OK';
                }
            }
        },
        error: function() {
            localStorage.clear();
            location.href = "index.html";
        }
    });
}

function getTags() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/tags",
        type: 'GET',
        success: function(data) {
            for(var i in data) {
                $("#question-tag").append(new Option(data[i].tag, data[i].tag));
            }
        },
        error: function() {
            localStorage.clear();
            location.href = "index.html";
        }
    });
}

function deleteComment(id) {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/comment/" + id,
        type: 'DELETE',
        success: function(data) {
            alert(data.message);
            location.href = "post_logged.html?id=" + getTopicId();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            alert(responseText.message);
        }
    });
}

function like() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/post/topic/like/" + getTopicId(),
        type: 'PUT',
        success: function(data) {
            alert(data.message);
            location.href = "post_logged.html?id=" + data.topicId;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            alert(responseText.message);
        }
    });
}

function getTopicId() {
    window.$_GET = new URLSearchParams(location.search);
    var id = $_GET.get('id');

    if(id == null) {
        location.href = "index_logged.html";
    }

    return id;
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
                    "<a href='post_logged.html?id="+ data[i].topicId +"'><h3>"+ data[i].topicName +"</h3></a>" +
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