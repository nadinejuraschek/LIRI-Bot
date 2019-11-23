// require npm packages
require("dotenv").config();
const Spotify = require('node-spotify-api');
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

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

var venueName = "";
// console.log("Venue Name: " + res.venue.name);
var venueLocation = "";
// console.log("Location: " + res.venue.city)
var eventDate = moment().format("MM-DD-YYYY");
// console.log("Date: " + (res.datetime).moment().format("MM-DD-YYYY"))

// TEST
console.log(queryBIT);

/************************************
SPOTIFY
************************************/
/** SPOTIFY-THIS-SONG with Song Name**/
var spotify = new Spotify(keys.spotify);

/************************************
OMDB
************************************/
/** MOVIE-THIS with Movie Name **/
var queryMovie = "http://www.omdbapi.com/?t=" + fullSearchFor + "&y=&plot=short&apikey=" + keys.omdb;

// TEST
console.log(queryMovie);

var movieTitle = "";
// console.log("Movie Title: " + res.data.Title)
var releaseYear = "";
// console.log("Release Year: " + res.data.Year)
var imdbRating = "";
// console.log("imdb Rating: " + res.data.imdbRating)
var rottenTomatoesRating = "";
// console.log("")
var producerCountry = "";
// console.log("Country: " + res.data.Country)
var movieLanguage = "";
// console.log("Language: " + res.data.Language)
var moviePlot = "";
// console.log("Plot: " + res.data.Plot)
var actors = "";
// console.log("Actors: " + res.data.Actors)

/************************************
DO WHAT IT SAYS
************************************/
/** DO-WHAT-IT-SAYS **/



/************************************
MAIN CODE
************************************/
if (command === "concert-this") {
    console.log("Your command is: " + command);
    axios.get(queryBIT)
        .then(function (res) {
            console.log(res.artist.name + "is playing next at " + res.venue.name + " in " + res.venue.city + " on " + res.datetime);
        })
        .catch(function (err) {
            if (err) { }
        });
} else if (command === "movie-this") {
    console.log("Your command is: " + command);
    axios.get(queryMovie)
        .then(function (res) {
            console.log("The movie you are searching for is called '" + res.data.Title + "'.");
            console.log("It was released in " + res.data.Year + ".")
            console.log("Its imdb Rating is " + res.data.imdbRating + " and Rotten Tomatoes score is " + res.data.ratings[2].value + ".")
            console.log("The movie was produced in " + res.data.Country + " and can be watched in these languages: " + res.data.language + ".")
            console.log("Plot: " + res.data.Plot)
            console.log("Actors: " + res.data.Actors)
        })
        .catch(function (err) {
            fullSearchFor = "Mr.+Nobody";
            axios.get(queryMovie)
                .then(function (res) {
                    console.log("The movie you are searching for is called '" + res.data.Title + "'.");
                    console.log("It was released in " + res.data.Year + ".")
                    console.log("Its imdb Rating is " + res.data.imdbRating + " and Rotten Tomatoes score is " + res.data.ratings[2].value + ".")
                    console.log("The movie was produced in " + res.data.Country + " and can be watched in these languages: " + res.data.language + ".")
                    console.log("Plot: " + res.data.Plot)
                    console.log("Actors: " + res.data.Actors)
                })
        });
} else if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: fullSearchFor }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (fullSearchFor === "") {

        } else {
            var songs = data.tracks.items;
            console.log("The song you searched for is called '" + songs[0].name + "'.");
            console.log("It is performed by '" + songs[0].artists[0].name + "' and can be found on the album '" + songs[0].album.name + "'.");
            console.log("Listen to a preview on Spotify: " + songs[0].external_urls.spotify);
        }
    });
}

// if command === "movie-this"
// axios.get(queryMovie).then(function(res) {console.log("The title of the movie is: " + res.data.Title); ...}).catch(function(err) {if (err || command === "") {fullSearchFor = "Mr.+Nobody"; axios.get(queryMovie).then(function(res) {console.log(...)}).catch(function(err) {if (err)console.log()}});

// if 