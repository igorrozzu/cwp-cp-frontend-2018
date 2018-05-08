import {API_URI as uri} from '../config/AppConstants';
import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getAll(params) {
    return await axios.get(
        `${uri}/cinemas?page=${params.page}&limit=${params.limit}`
    );
}
