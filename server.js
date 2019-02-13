// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//


// Initialize Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Got an access token: ' + spotifyApi.getAccessToken());
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//


app.get('/search-track', function (request, response) {
  
  // Search for a track!
  spotifyApi.searchTracks('track:Hey Jude', {limit: 1})
    .then(function(data) {
    
      // Send the first (only) track object
      response.send(data.body.tracks.items[0]);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/category-playlists', function (request, response) {
  
  // Get playlists from a browse category
  // Find out which categories are available here: https://beta.developer.spotify.com/console/get-browse-categories/
  //changed to classical playlist category
  spotifyApi.getPlaylistsForCategory('kpop', {country : 'JP', limit : 10 })
    .then(function(data) {
    
    // Send the list of playlists
    // response.send(data.body.playlists.market.from_token("NL"));
    response.send(data.body.playlists);
    
    }, function(err) {
    console.error(err);
  }),
  spotifyApi.getPlaylistsForCategory('indie_alt', {country : 'CA', limit : 10 })
    .then(function(data2) {
    
    // Send the list of playlists
    // response.send(data.body.playlists.market.from_token("NL"));
    response.send(data2.body.playlists);
    
    }, function(err) {
    console.error(err);
  });
  
});

app.get('/audio-features', function (request, response) {
  // Get the audio features for a track ID
  spotifyApi.getAudioFeaturesForTrack(['59NBECAQ5tXNmtKbRFcYil'])
    .then(function(data) {
    
      //Send the audio features object
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/artist', function (request, response) {
  
  // Get information about an artist
  spotifyApi.getArtist(['3dBVyJ7JuOMt4GE9607Qin'])
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});
	
app.get('/v1/artists', function (request, response) {
  
  // Get information about an artist
  spotifyApi.getArtists(['6jJ0s89eD6GaHleKKya26X','3dBVyJ7JuOMt4GE9607Qin'])
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/artist-top-tracks', function (request, response) {
  
  // Get an artist's top tracks in a country
  spotifyApi.getArtistTopTracks('0LcJLqbBmaGUft1e9Mm8HV', 'SE')           
    .then(function(data) {
      // Send the list of tracks
      response.send(data.body.tracks);
    }, function(err) {
      console.error(err);
    }),
    spotifyApi.getArtistTopTracks('4kGuk6HkL6hwuQrgSWISBv', 'ES')           
    .then(function(data_2) {
      // Send the list of tracks
      response.send(data_2.body.tracks);
    }, function(err) {
      console.error(err);
    });
});

	
app.get('/recommendations', function (request, response) {
  
  // Get information about an artist
  spotifyApi.getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 })
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});





//-------------------------------------------------------------//
//------------------------ WEB SERVER -------------------------//
//-------------------------------------------------------------//


// Listen for requests to our app
// We make these requests from client.js
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
