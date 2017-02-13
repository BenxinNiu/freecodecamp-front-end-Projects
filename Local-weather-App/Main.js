var lng;
var lat;
var name;

function getWeather() {

  navigator.geolocation.getCurrentPosition(function(pos) {
    lng = pos.coords.longitude;
    lat = pos.coords.latitude;
  });

  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=366338935ff2de3aa019b95d6ceb81d2", function(data) {
    var i = JSON.stringify(data);
    var j = JSON.parse(i);
    var msg1 = j.weather[0].description;
    var msg2 = j.main.temp + "F";
    $('#condition').text(msg1);
    $('#temperatureF').text(msg2);
    var temp = j.main.temp;
    $('#cityName').html('at' + ' ' + j.name);
    $('#condition').html(j.weather[0].description);
    $('#temperatureF').html(temp.toFixed(1) + 'F');
    $('#celcius').html((temp - 273.15).toFixed(1) + '°C');
  });
};

$(document).ready(function() {
  $('#byCity').focus();
  var skycons = new Skycons({
    "color": "#FFFAFF"
  });
  skycons.add("icon1", Skycons.CLEAR_DAY);
  skycons.play();
  $("#getLocation").on('click', function() {
    getWeather();
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    name = $('#byCity').val();
    document.getElementById("searchCity").reset();
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + name + "&APPID=366338935ff2de3aa019b95d6ceb81d2", function(data) {

      var i = JSON.stringify(data);
      var j = JSON.parse(i);
      if (j.cod==='404'){
        $('.header').html("City Not Found");
      } else {
        var weather=j.weather[0].description;
        var temp = j.main.temp;
        $('#cityName').html('at' + ' ' + j.name);
        $('#condition').html(weather);
        $('#temperatureF').html(temp.toFixed(1) + 'F');
        $('#celcius').html((temp - 273.15).toFixed(1) + '°C');
      if (weather.indexOf('rain') >=0){
        skycons.set("icon1", Skycons.RAIN);
  skycons.play();
      }
        else if(weather.indexOf('cloud')>=0){
          skycons.set("icon1", Skycons.CLOUDY);
  skycons.play();
        }
        else if (weather.indexOf('snow')>=0){
          skycons.set("icon1", Skycons.SNOW);
           skycons.play();
        }
        else if(weather.indeOf('fog')>=0 || weather.indexOf('haze')>=0){
          skycons.set("icon1", Skycons.FOG);
           skycons.play();
        }
        
      } //else
    });
  });
  $('#temperatureF').on('click', function() {
    $('#temperatureF').hide();
    $('#celcius').removeClass('hidden');
  });
  $('#celcius').on('click', function() {
    $('#celcius').addClass('hidden');
    $('#temperatureF').show();
  });
});