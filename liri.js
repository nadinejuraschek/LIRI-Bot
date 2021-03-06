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
// TEST
// console.log(nodeArgv);
// console.log(command);

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
// console.log(nodeArgv.length);
// console.log(fullSearchFor);

/************************************
BANDS IN TOWN
************************************/
/** CONCERT-THIS with Artist/Band Name **/
var queryBIT = "https://rest.bandsintown.com/artists/" + fullSearchFor + "/events?app_id=" + keys.bandsintown;

function concertThis() {
    if (fullSearchFor === "") {
        queryBIT = "https://rest.bandsintown.com/artists/" + "Celine+Dion" + "/events?app_id=" + keys.bandsintown;
        axios.get(queryBIT)
            .then(function (res) {
                var date = moment(res.data[0].datetime).format("MM/DD/YYYY");
                console.log(res.data[0].artist.name + " is playing next at " + res.data[0].venue.name + " in " + res.data[0].venue.city + " on " + date + ".");

                // log to log.txt
            });
    } else {
        axios.get(queryBIT)
            .then(function (res) {
                var date = moment(res.data[0].datetime).format("MM/DD/YYYY");
                console.log(res.data[0].artist.name + " is playing next at " + res.data[0].venue.name + " in " + res.data[0].venue.city + " on " + date + ".");

                // log to log.txt
            });
    }
};

// TEST
// console.log(queryBIT);

/************************************
SPOTIFY
************************************/
/** SPOTIFY-THIS-SONG with Song Name**/
var spotify = new Spotify(keys.spotify);

function spotifyThisSong() {
    if (fullSearchFor == "") {
        spotify.search({ type: 'track', query: 'The+Sign' }, function (err, data) {
            var songs = data.tracks.items;
            console.log("The song you searched for is called '" + songs[0].name + "'.");
            console.log("It is performed by '" + songs[0].artists[0].name + "' and can be found on the album '" + songs[0].album.name + "'.");
            console.log("Listen to a preview on Spotify: " + songs[0].external_urls.spotify);

            // log to log.txt
        });
    } else {
        spotify.search({ type: 'track', query: fullSearchFor }, function (err, data) {
            var songs = data.tracks.items;
            console.log("The song you searched for is called '" + songs[0].name + "'.");
            console.log("It is performed by '" + songs[0].artists[0].name + "' and can be found on the album '" + songs[0].album.name + "'.");
            console.log("Listen to a preview on Spotify: " + songs[0].external_urls.spotify);

            // log to log.txt
        });
    }
};

/************************************
OMDB
************************************/
/** MOVIE-THIS with Movie Name **/
var queryMovie = "http://www.omdbapi.com/?t=" + fullSearchFor + "&y=&plot=short&apikey=" + keys.omdb;

function movieThis() {
    if (fullSearchFor === "") {
        queryMovie = "http://www.omdbapi.com/?t=" + "Mr.+Nobody" + "&y=&plot=short&apikey=" + keys.omdb;
        axios.get(queryMovie)
            .then(function (res) {
                console.log("The movie you searched for is called '" + res.data.Title + "'.");
                console.log("It was released in " + res.data.Year + ".")
                console.log("Its imdb Rating is " + res.data.imdbRating + " and Rotten Tomatoes score is " + res.data.Ratings[1].Value + ".")
                console.log("The movie was produced in " + res.data.Country + " and can be watched in these languages: " + res.data.Language + ".")
                console.log("Here is a summary of the plot: " + res.data.Plot)
                console.log("Actors in this movie are: " + res.data.Actors)

                // log to log.txt
            });
    } else {
        axios.get(queryMovie)
            .then(function (res) {
                console.log("The movie you searched for is called '" + res.data.Title + "'.");
                console.log("It was released in " + res.data.Year + ".")
                console.log("Its imdb Rating is " + res.data.imdbRating + " and Rotten Tomatoes score is " + res.data.Ratings[1].Value + ".")
                console.log("The movie was produced in " + res.data.Country + " and can be watched in these languages: " + res.data.Language + ".")
                console.log("Here is a summary of the plot: " + res.data.Plot)
                console.log("Actors in this movie are: " + res.data.Actors)

                // log to log.txt
            });
    }
};

// TEST
// console.log(queryMovie);

/************************************
DO WHAT IT SAYS
************************************/
/** DO-WHAT-IT-SAYS **/
function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');
        command = txt[0];
        fullSearchFor = txt[1];
        runLIRI();

        // log to log.txt
    });
}

/************************************
MAIN CODE
************************************/
function runLIRI() {
    if (command === "concert-this") {
        console.log("Your command is: " + command);
        concertThis();
    } else if (command === "movie-this") {
        console.log("Your command is: " + command);
        movieThis();
    } else if (command === "spotify-this-song") {
        console.log("Your command is: " + command);
        spotifyThisSong();
    } else if (command === "do-what-it-says") {
        console.log("Your command is: " + command);
        doWhatItSays();
    }
};

runLIRI();