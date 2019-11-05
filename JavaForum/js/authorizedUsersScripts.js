$.ajaxSetup({
    beforeSend: function (xhr)
    {
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
    }
});

$('#logout').click(function() {
    localStorage.clear();
    location.href = "index.html";
});

$(".user-info").click(function() {
    $(".user-account-settingss").slideToggle( "fast");
    $("#message").not($(this).next("#message")).slideUp();
    $("#notification").not($(this).next("#notification")).slideUp();
});

$(document).ready(function() {
    jQuery.ajax ({
        url: "https://java-forum-application.herokuapp.com/user/me",
        type: 'GET',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: {},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
        },
        success: function(data){
            $("#user-name").html(data.username);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            localStorage.clear();
            location.href = "index.html";
        }
    });
});