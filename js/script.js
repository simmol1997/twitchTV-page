var streamers = ["imaqtpie", "eulcs1", "ESL_SC2", "freecodecamp"];
var streamURL = "https://www.twitch.tv/";

$(document).ready(function() {

  for (var i = 0; i < streamers.length; i++) {

    getStreamers(i);
  }

  //The following works just like an a tag but for every td element
  $("td").on("click", function() {
    var index = Number($(this).attr("id").slice(-1)) - 1;
    var streamer = streamers[index];
    window.open(streamURL + streamer);
  });

  /* Makes both the description and stream ids behave the same */
  $("td").hover(function() {

    var index = Number($(this).attr("id").slice(-1)) - 1;
    $("#stream" + (index+1)).addClass("hover");
    $("#description" + (index+1)).addClass("hover");
  }, function() {

    var index = Number($(this).attr("id").slice(-1)) - 1;
    $("#stream" + (index+1)).removeClass("hover");
    $("#description" + (index+1)).removeClass("hover");
  });
});

function getStreamers(index) {

  var streamer = streamers[index];

  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + streamer, function(response) {

    var streamerHTML = "<h3>" + streamer + "</h3>";
    if(response.stream) { // is currently streaming

      var descHTML = "<p>Currently playing: " + response.stream.game + "</p>";

      $("#stream" + (index+1)).addClass("online");
      $("#description" + (index+1)).addClass("online");
      $("#description" + (index+1)).html(descHTML);
    }
    else {
      $("#stream" + (index+1)).addClass("offline");
      $("#description" + (index+1)).addClass("offline");
    }
    $("#stream" + (index+1)).html(streamerHTML);
  });
}
