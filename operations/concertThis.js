import axios from "axios";
import { logResult } from "../utils/logResult.js";
import moment from "moment";

/************************************
BANDS IN TOWN
CONCERT-THIS with Artist/Band Name
************************************/
const printResult = (artist, date, venueCity, venueName) => {
    const command = '=============== CONCERT-THIS ===============\n';
    return `${command}${artist} is playing next at ${venueName} in ${venueCity} on ${date}.`;
}

const handleResult = async (res) => {
    const result = res.data[0];
    const {
        artist: { name: artist },
        venue: { city: venueCity, name: venueName },
    } = result;
    const date = moment(result.datetime).format("MM/DD/YYYY");

    const message = printResult(artist, date, venueCity, venueName);
    await logResult(message);
    console.log(message);
};

export const concertThis = (fullSearchFor) => {
    const searchTerm = fullSearchFor === '' ? "Celine+Dion" : fullSearchFor;
    const queryBIT = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=" + process.env.BANDSINTOWN_ID;
    axios.get(queryBIT).then(res => handleResult(res));
};