// client-side js
// run by the browser each time your view template is loaded

$(function() {
    
  $.get('/search-track', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = $(
        // '<h3><a href="' +  data.external_urls.spotify + '"target = "blank">' + data.name + '</a></h3>';
    `<h3><a href="${data.external_urls.spotify}">${data.name}</a></h3>`
    );
    trackName.appendTo('#search-track-container');
    console.log(data.artists);
    
    // Display the artist name
    var artists = '';
    //for more than one artist
    data.artists.forEach(function(element){
     //console.log("Loop:" + element); 
     artists = artists + element.name + '';
    });
    
    var artistName = $('<h5>' + data.artists[0].name + '</h5>');
    artistName.appendTo('#search-track-container');
    
    // Display the album art
    var img = $('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  //need to change the country for the playlist categories
  $.get('/category-playlists', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data.items.map(function(playlist, i) {
      var img = $('<img class="cover-image"/>');
      img.attr('src', playlist.images[0].url);
      img.appendTo('#category-playlists-container');
    });
  });
  
   $.get('/audio-features', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "loudness", "liveness"]
    
//     var trackName = this.getTracks().name{
      
//     }
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
        // feature[0].appendTo('#audio-features-container1');
        // feature[1].appendTo('#audio-features-container2');

      }
    });
  });
  
  
  $.get('/artist', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // // Display the artist name
    // var artists = '';
    // //for more than one artist
    // data.artists.forEach(function(element){
    //  //console.log("Loop:" + element); 
    //  artists = artists + element.name + '';
    // });
    
//     var artistName = $('<h5>' + data.artists[0].name + data.artists[1].name  + '</h5>');
//     artistName.appendTo('#artist-container');
    
    
    
var artists = '';
var img = $('<img class="circle-image" />');
var trackName = $('<h3>' + data.name + '</h3>');
var genreItem = $('<p>' + genre + '</p>');
 
    data.artists.forEach(function(element){
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    trackName.appendTo('#artist-container');
    data.genres.map(function(genre, i) {
       genreItem.appendTo('#artist-container');
    }
                    
                    }
                    });
  });
  
  
  $.get('/artist-top-tracks', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  });

});
