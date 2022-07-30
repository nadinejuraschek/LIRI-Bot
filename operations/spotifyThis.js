import * as dotenv from 'dotenv';

import Spotify from 'node-spotify-api';
import { logResult } from '../utils/logResult.js';

dotenv.config();

/************************************
SPOTIFY
SPOTIFY-THIS-SONG with Song Name
************************************/
const spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
});

const printResult = (album, artist, name, url) => {
    const command = '=============== SPOTIFY-THIS ===============\n';
    return `${command}The song you searched for is called "${name}".\nIt is performed by "${artist}" and can be found on the album ${album}.\nListen to a preview on Spotify: ${url}`;
};

const handleResult = async (err, data) => {
    if (data) {
        const song = data?.tracks?.items[0];
        const { album, artists, external_urls, name } = song;
        const albumName = album.name;
        const artist = artists[0].name;
        const url = external_urls.spotify;

        const result = printResult(albumName, artist, name, url);

        if (result) {
            await logResult(result);
            console.log(result);
        }
    }

    if (err) throw err;
};

export const spotifyThisSong = (fullSearchFor) => {
    const searchTerm = fullSearchFor === '' ? "The+Sign" : fullSearchFor;
    spotify.search({ type: 'track', query: searchTerm }, handleResult);
};