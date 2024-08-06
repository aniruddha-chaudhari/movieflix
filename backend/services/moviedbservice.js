import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';


export const fetchfromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
    };

    const response = await axios.get(url, options)

    if (response.status !== 200) {
        console.log('Error in fetching data from TMDB API' + response.statusText);
        return null;
    }

    return response.data;

}
