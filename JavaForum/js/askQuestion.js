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