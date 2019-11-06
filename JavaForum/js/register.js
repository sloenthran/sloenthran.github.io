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

$("#register-box").on("click", function(){
    $("#register-box").addClass("open");
    $(".wrapper").addClass("overlay");
    return false;
});

$("#close-register-box").on("click", function(){
    $("#register-box").removeClass("open");
    $(".wrapper").removeClass("overlay");
    return false;
});