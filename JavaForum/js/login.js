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

$("#login-box").on("click", function(){
    $("#login-box").addClass("open");
    $(".wrapper").addClass("overlay");
    return false;
});

$("#close-login-box").on("click", function(){
    $("#login-box").removeClass("open");
    $(".wrapper").removeClass("overlay");
    return false;
});