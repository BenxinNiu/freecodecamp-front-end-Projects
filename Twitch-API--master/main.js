$(document).ready(function() {
var playerList = ["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
//https://api.twitch.tv/kraken/
  //https://api.twitch.tv/kraken/streams
function all(channel) {
  var game, logo, link;
  $.getJSON("https://api.twitch.tv/kraken/streams/" + channel +"?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?", function(data) {
    console.log(data);
    if (data.stream === null) {
      game = "Offline";
      logo = "http://cdn.batman-news.com/wp-content/uploads/2015/11/logo_batman-shield.svg";
      $('.streamer').append("<div class='statusOffline'>" + "<img src='" + logo + "'" + " id='logo' " + ">" + "<a class='link' href='https://www.twitch.tv/" + channel + "' target='_blank'>" + channel + "</a>" + " <span class='game'>" + game + "</span>");
    } else {
      game = data.stream.game + " " + data.stream.viewers + " viewers";
      logo = data.stream.channel.logo;
      $('.streamer').append("<div class='statusOnline'>" + "<img src='" + logo + "'" + " id='logo' " + ">" + "<a class='link' href='https://www.twitch.tv/" + channel + "' target='_blank'>" + channel + "</a>" + " <span class='game'>" + game + "</span>");
    }
  });
}

function getAll(){
  for (var i = 0; i < playerList.length; i++) {
    all(playerList[i]);
  }
};

function getOnline() {
  for (var i = 0; i < playerList.length; i++) {
    var name = playerList[i];
    online(name);
  }
}

function online(channel) {
  var game, logo, link;
  $.getJSON("https://api.twitch.tv/kraken/streams/" + channel + "?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?", function(data) {
    if (data.stream !== null) {
      game = data.stream.game;
      logo = data.stream.channel.logo;
      $('.streamer').append("<div class='statusOnline'>" + "<img src='" + logo + "'" + " id='logo' " + ">" + "<a class='link' href='https://www.twitch.tv/" + channel + "' target='_blank'>" + channel + "</a>" + " <span class='game'>" + game + "</span>");
    }

  });
}

function getOffline() {
  for (var i = 0; i < playerList.length; i++) {
    var name = playerList[i];
    offline(name);
  }
}

function offline(channel) {
  var game, logo, link;
  $.getJSON("https://api.twitch.tv/kraken/streams/" + channel + "?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?", function(data) {
    if (data.stream === null) {
      game = "Offline";
      logo = "http://cdn.batman-news.com/wp-content/uploads/2015/11/logo_batman-shield.svg";
      $('.streamer').append("<div class='statusOffline'>" + "<img src='" + logo + "'" + " id='logo' " + ">" + "<a class='link' href='https://www.twitch.tv/" + channel + "' target='_blank'>" + channel + "</a>" + " <span class='game'>" + game + "</span></div>");
    }
  });
}

function get(channel) {  //search by name
  var game, logo, link;
  $('.statusError').remove();
  $.getJSON("https://api.twitch.tv/kraken/streams/" + channel + "?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?", function(data) {
    if (data.hasOwnProperty('error')){
      $('.streamer').prepend("<div class='statusError'>" + "'" + channel + "'" + " Channel not found!" + "</div>");
   $('.statusError').fadeOut(4000);
    }   
    else{
      if (data.stream === null) {
      game = "Offline";
      logo = "http://cdn.batman-news.com/wp-content/uploads/2015/11/logo_batman-shield.svg";
      $('.streamer').prepend("<div class='statusOffline'>" + "<img src='" + logo + "'" + " id='logo' " + ">" + "<a class='addedLink' href='https://www.twitch.tv/" + channel + "' target='_blank'>" + channel + "</a>" + " <span class='game'>" + game + "</span></div>");
    } else {
      game = data.stream.game + " " + data.stream.viewers + " viewers";
      logo = data.stream.channel.logo;
      $('.streamer').prepend("<div class='statusOnline'>" + "<img src='" + logo + "'" + " id='logo' " + ">" + "<a class='addedLink' href='https://www.twitch.tv/" + channel + "' target='_blank'>" + channel + "</a>" + " <span class='game'>" + game + "</span></div>");
    }}
    
  });
}


  getAll();
  $('form').addClass("animated shake");
   $('.streamer').animate({height: "350px"},1500);
  $('form').on('submit', function(event) {
    event.preventDefault();
    var newChannel = $('#searchBar').val();
    if (newChannel !== ""){
    playerList.unshift(newChannel);
    $('#searchBar').val("");
    get(newChannel);
    $('.streamer').toggle();
    $('.streamer').toggle(1100);}
    
  })
  $('.online').on('click', function() {
    $('.streamer').empty();
    getOnline();
    $('.streamer').toggle();
    $('.streamer').toggle(1800);
  });
  $('.offline').on('click', function() {
    $('.streamer').empty();
    getOffline();
    $('.streamer').toggle();
    $('.streamer').toggle(1800);
  });
 $('.all').on('click', function() {
    $('.streamer').empty();
    getAll();
    $('.streamer').toggle();
   $('.streamer').toggle(1800);
   
  });

});
  
