import * as dotenv from 'dotenv';

import axios from "axios";
import { logResult } from "../utils/logResult.js";

dotenv.config();

/************************************
OMDB
MOVIE-THIS with Movie Name
************************************/
const omdbId = process.env.OMDB_ID;

const printResult = (actors, country, rating, languages, plot, score, title, year) => {
    const command = '=============== MOVIE-THIS ===============\n';
    return `${command}The movie you searched for is called '${title}'.\nIt was released in ${year}.\nIts imdb Rating is ${rating} and Rotten Tomatoes score is ${score}.\nThe movie was produced in ${country} and can be watched in these languages: ${languages}.\nActors in this movie are: ${actors}.\nHere is a summary of the plot:\n${plot}`;
};

const handleResult = async (res) => {
    const {
        data: {
            Actors,
            Country,
            imdbRating,
            Language,
            Plot,
            Ratings,
            Title,
            Year,
        },
    } = res;
    const rating = Ratings[1]?.Value;

    const message = printResult(Actors, Country, imdbRating, Language, Plot, rating, Title, Year);
    await logResult(message);
    console.log(message);
};

export const movieThis = (fullSearchFor) => {
    const searchTerm = fullSearchFor === '' ? "Mr.+Nobody" : fullSearchFor;
    const queryMovie = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=" + omdbId;
    axios.get(queryMovie).then(handleResult);
};