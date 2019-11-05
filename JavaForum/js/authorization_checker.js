$(document).ready(function() {
    if(!localStorage.token) {
        location.href = "index.html";
    }
});