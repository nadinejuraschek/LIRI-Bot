// require npm packages
import * as dotenv from 'dotenv';

import { concertThis, movieThis, spotifyThisSong } from './operations/index.js';

import fs from 'fs';

dotenv.config();

// stored argument arrays
const nodeArgv = process.argv;
let command = process.argv[2];

// put multiple words together for queryURLs
let fullSearchFor = "";
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        fullSearchFor = fullSearchFor + "+" + nodeArgv[i];
    } else {
        fullSearchFor = fullSearchFor + nodeArgv[i];
    }
}

/************************************
DO WHAT IT SAYS
************************************/
/** DO-WHAT-IT-SAYS **/
const doWhatItSays = () => {
    fs.readFile('random.txt', "utf8", function (error, data) {
        const txt = data.split(',');
        command = txt[0];
        fullSearchFor = txt[1];
        runLIRI();

        // log to log.txt
    });
}

/************************************
MAIN CODE
************************************/
const runLIRI = () => {
    if (command === "concert-this") {
        console.log("Your command is: " + command);
        concertThis(fullSearchFor);
    } else if (command === "movie-this") {
        console.log("Your command is: " + command);
        movieThis(fullSearchFor);
    } else if (command === "spotify-this") {
        console.log("Your command is: " + command);
        spotifyThisSong(fullSearchFor);
    } else if (command === "do-what-it-says") {
        console.log("Your command is: " + command);
        doWhatItSays(fullSearchFor);
    }
};

runLIRI();