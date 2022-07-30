// require npm packages
import * as dotenv from 'dotenv';

import { doWhatItSays, runLIRI } from './operations/index.js';

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
MAIN CODE
************************************/
if (command === "do-what-it-says") {
  console.log("Your command is: " + command);
  doWhatItSays(fullSearchFor);
} else {
  runLIRI(command, fullSearchFor);
}
