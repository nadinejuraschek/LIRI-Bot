import fs from 'fs';
import { runLIRI } from './index.js';

/************************************
DO WHAT IT SAYS
use command found in random.txt
************************************/
export const doWhatItSays = () => {
  fs.readFile('random.txt', "utf8", (error, data) => {
    if (error) throw Error;

    const txt = data.split(',');
    const command = txt[0];
    const fullSearchFor = txt[1];
    runLIRI(command, fullSearchFor);
  });
};