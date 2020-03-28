$(function() {
   $(window).scroll(function () {
     if (($(window).scrollTop() > 1100) && ($(window).scrollTop() < 4200)){
       $('body').css('background-color', "#E8E1DE");
     }

     if ($(window).scrollTop() < 1100){
       $('body').css('background-color', "#000000");
     }

     if ($(window).scrollTop() > 4200){
       $('body').css('background-color', "#000000");
     }
   });

});
