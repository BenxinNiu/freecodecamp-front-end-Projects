function openURL(url){
  window.open(url, 'Share', 'width=1000, height=800, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function start (){
    interval=setInterval(get,5000);
  }
function stop (){
  clearInterval(interval);
}
var background=['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857" ];

var quote;
var author;
var interval;
function get(){
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=', 
   
success: function(data){
 var i = JSON.parse(data);
  console.log(i)
  quote=i.quote;
  author=i.author;
  
  $(".quote").animate({opacity: 0}, 700, function() {
          $(this).animate({opacity: 1}, 1000);
          $("#quote-text").text(i.quote);
        });// get quote 

  $(".author").animate({opacity:0},700,function(){
  $(this).animate({opacity:1},600);
  $("#quote-author").text(i.author);
});// get corresponding author
  
 var colorNum = Math.floor(Math.random() * background.length);
   $("html body").animate({
        backgroundColor: background[colorNum], }, 600);
  $(".quote").animate({ color: background[colorNum]},600);
  $(".author").animate({ color: background[colorNum]},600);
  $(".Get-quote").animate({backgroundColor: background[colorNum]},600);
  $(".forward").animate({backgroundColor: background[colorNum]},600);
} //success
 });// ajax
}
  
$(document).ready(function(){
 get();
  $(".quote-area").on('mouseenter', stop).on('mouseleave', start);
 $(".Get-quote").on('click',get);
 $('#tweet').on('click', function() {
     openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
  });
 $('#weibo').on('click', function() {
   openURL('service.weibo.com/share/share.php?url=http%3A%2F%2Fwww.meihua.info%2Fa%2F66979%230-tsina-1-62313-397232819ff9a47a7b7e80a40613cfe1&title=' + encodeURIComponent('"' + quote + '" ' + author));
  });

});
 
