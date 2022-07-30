import { concertThis, movieThis, spotifyThisSong } from './index.js';

export const runLIRI = (command, searchTerm) => {
  switch(command) {
    case "concert-this":
      console.log("Your command is: " + command);
      return concertThis(searchTerm);
    case "movie-this":
      console.log("Your command is: " + command);
      return movieThis(searchTerm);
    case "spotify-this":
      console.log("Your command is: " + command);
      return spotifyThisSong(searchTerm);
    default:
      console.log('Please use a valid command.');
      return;
  }
};