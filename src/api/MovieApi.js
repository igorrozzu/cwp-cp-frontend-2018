import axios from 'axios';
axios.defaults.withCredentials = true;
import {API_URI as uri} from '../config/AppConstants';

export async function getAllShowingMovies(params) {
    return await axios.get(
        `${uri}/movies?type=showing&page=${params.page}&limit=${params.limit}`
    );
}
