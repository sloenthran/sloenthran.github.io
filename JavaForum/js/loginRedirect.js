$(document).ready(function() {
    if(localStorage.token) {
        location.href = "index_logged.html";
    }
});