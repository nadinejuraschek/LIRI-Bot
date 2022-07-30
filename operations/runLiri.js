import { concertThis, movieThis, spotifyThisSong } from './index.js';

const red = "\x1b[31m";
const yellow = "\x1b[33m";
const resetBg = '\x1b[0m';

export const runLIRI = (command, searchTerm) => {
  switch(command) {
    case "concert-this":
      console.log(yellow, "Your command is: " + command, resetBg);
      return concertThis(searchTerm);
    case "movie-this":
      console.log(yellow, "Your command is: " + command, resetBg);
      return movieThis(searchTerm);
    case "spotify-this":
      console.log(yellow, "Your command is: " + command, resetBg);
      return spotifyThisSong(searchTerm);
    default:
      console.log(red, 'Please use a valid command.');
      return;
  }
};