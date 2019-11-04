$(document).ready(function() {
    $("#login_form").submit(function(event){
        var username      = $('#login-username').val();
        var password   = $('#login-password').val();

        jQuery.ajax ({
            url: "https://java-forum-application.herokuapp.com/login",
            type: "POST",
            data: JSON.stringify({username: this.username, password: this.password}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data){
                $.cookie('token',data.token);
                alert(data.token);
            }
        });
    })
});
