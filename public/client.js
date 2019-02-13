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
    // if(data.playlist.market == "SE"){
      data.items.map(function(playlist, i) {
        var img = $('<img class="cover-image"/>');
        img.attr('src', playlist.images[0].url);
        img.appendTo('#category-playlists-container');
      });
     
  });
    //need to change the country for the playlist categories
  $.get('/category-playlists', function(data2) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data2);
    console.groupEnd();
    
    // Display the covers of the playlists
    // if(data.playlist.market == "SE"){
      data2.items.map(function(playlist, i) {
        var img = $('<img class="cover-image"/>');
        img.attr('src', playlist[0].images[1].url);
        img.appendTo('#category-playlists-container1');
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
    
    // Display the artist's image
    var img = $('<img class="circle-image" />');
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    // Display the artist name
    var trackName = $('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = $('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
  });
  
$.get('/v1/artists', function(data) {
  // Display the artist name
    var artists = '';
    //for more than one artist
    data.artists.forEach(function(element){
     //console.log("Loop:" + element); 
     artists = artists + element.name + '';
    });
    console.log(artists);
    
    var artistName = $('<h5>' + data.artists[0].name + '</h5>');
    //adds value of popularity
    var pop = $('<p>Popularity: ' + data.artists[0].popularity + '</p>');
    //adds followers for artist
    var followers = $('<p>Followers: ' + data.artists[0].followers.total + '</p>');
  console.log(data.artists[0].followers.total);
    
    //adds them to correct container
    artistName.appendTo('#artist-container1');
    pop.appendTo('#artist-container1');
    followers.appendTo('#artist-container1');
  });
  
  
  
  
  $.get('/artist-top-tracks', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    
    var artistName = $('<h5>' + data[0].artists[0].name + '</h5>');
        artistName.appendTo('#top-tracks-container');

    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  });
  
$.get('/artist-top-tracks', function(data_2) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data_2);
    console.groupEnd();
    
    
    var artistName = $('<h5>' + data_2[1].artists[0].name + '</h5>');
        artistName.appendTo('#top-tracks-container1');

    // Display the audio features
    data_2.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container1');
    });
  });  
  
  $.get('/recommendations', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /recommendations', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    var artistName = $('<h5>' + data[0].tracks[0].artists[0].name + '</h5>');
        artistName.appendTo('#recommendations-container');

   
    });
  
  
  
  
  
  
  
  
});