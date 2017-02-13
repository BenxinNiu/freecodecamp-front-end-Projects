var hits;

function getResult(keyword) {
  $('.header').hide();
  $('#search').addClass('searchAfter');
  $('#line-break').remove();
  $('#random').remove();
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=search&inprop=url&srsearch=" + keyword,
    dataType: "jsonp",
    success: function(result) {
      hits = result.query.searchinfo.totalhits;
      if (hits > 0) {
        $('.resultArea').append("<span>" + hits + " article found for you" + "</span>");
        display(result);
      } else {
        $('.resultArea').append("<span>" + "0 article found " + "</span>");

      }
    },
    error: function() {
      alert("Sorry, article not found!");
    }
  })
};

function display(jsonData) {
  if (hits > 10) {
    for (var i = 0; i < 10; i++) {
      $('.resultArea').append("<div class='result result-" + i + "'>" + "<span class='title title-" + i + "'> </span> <span class='snippet snippet-" + i + "'></span><span class='infor infor-" + i + "'></span></div>");
    };

    for (var j = 0; j < 10; j++) {
      var url = "https://en.wikipedia.org/wiki/" + jsonData.query.search[j].title;
      var size = jsonData.query.search[j].size;
      var words = jsonData.query.search[j].wordcount;
      var stamp = jsonData.query.search[j].timestamp;
      stamp = new Date(stamp);
      $(".title-" + j).html("<a href='" + url + "'" + "target='_blank'>" + jsonData.query.search[j].title + "</a>");
      $(".snippet-" + j).html(jsonData.query.search[j].snippet);
      $(".infor-" + j).html("Size:" + (size / 1024).toFixed(1) + "kb," + " words:" + words + "," + stamp);
    };
  } else {
    for (var i = 0; i < hits; i++) {
      $('.resultArea').append("<div class='result result-" + i + "'>" + "<span class='title title-" + i + "'> </span> <span class='snippet snippet-" + i + "'></span><span class='infor infor-" + i + "'></span></div>");
    };

    for (var j = 0; j < hits; j++) {
      var url = "https://en.wikipedia.org/wiki/" + jsonData.query.search[j].title;
      var size = jsonData.query.search[j].size;
      var words = jsonData.query.search[j].wordcount;
      var stamp = jsonData.query.search[j].timestamp;
      stamp = new Date(stamp);
      $(".title-" + j).html("<a href='" + url + "'" + "target='_blank'>" + jsonData.query.search[j].title + "</a>");
      $(".snippet-" + j).html(jsonData.query.search[j].snippet);
      $(".infor-" + j).html("Size:" + (size / 1024).toFixed(1) + "kb," + " words:" + words + "," + stamp);
    };
  }
}

$(document).ready(function() {
  $('#bar').focus();
  $('#searchButton').on('click', function(event) {
    event.preventDefault();
    $('.resultArea').empty();
    var title = $("#bar").val();
    if (title !== "") {
      $('#bar').val("");
      getResult(title);
    }
  });

})
