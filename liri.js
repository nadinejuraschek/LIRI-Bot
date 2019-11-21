// require npm packages
require("dotenv").config();
const Spotify = require('node-spotify-api');
const fs = require("fs");
const axios = require("axios");

// require data from keys.js
const keys = require("./keys.js");

// stored argument arrays
var nodeArgv = process.argv;
var command = process.argv[2];
var searchFor = process.argv[3];
// TEST
console.log(nodeArgv);
console.log(command);
console.log(searchFor);

// put multiple words together for queryURLs
var fullSearchFor = "";
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        fullSearchFor = fullSearchFor + "+" + nodeArgv[i];
    } else {
        fullSearchFor = fullSearchFor + nodeArgv[i];
    }
}
// TEST
console.log(nodeArgv.length);
console.log(fullSearchFor);

/************************************
BANDS IN TOWN
************************************/
/** CONCERT-THIS with Artist/Band Name **/
var queryBIT = "https://rest.bandsintown.com/artists/" + fullSearchFor + "/events?app_id=" + keys.bandsintown;

// TEST
console.log(queryBIT);

/************************************
SPOTIFY
************************************/
/** SPOTIFY-THIS-SONG with Song Name**/
var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: fullSearchFor }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var songs = data.tracks.items;
    console.log(data.tracks.items[0].name);
    // .album.name 
    // .preview_url
    // .artists
    // 
});

/************************************
OMDB
************************************/
/** MOVIE-THIS with Movie Name **/
var queryMovie = "http://www.omdbapi.com/?t=" + fullSearchFor + "&y=&plot=short&apikey=" + keys.omdb;

// TEST
console.log(queryMovie);


/************************************
OMDB
************************************/
/** DO-WHAT-IT-SAYS **/