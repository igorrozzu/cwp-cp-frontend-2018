import axios from 'axios';
import {API_URI as uri} from '../config/AppConstants';
axios.defaults.withCredentials = true;

export async function getSeances(params) {
    return await axios.get(
        `${uri}/seances?movieId=${params.movieId}`
    );
}

export async function getCinemaSeats(params) {
    return await axios.get(
        `${uri}/cinemas/${params.cinemaId}/seats/free?seanceId=${params.seanceId}`
    );
}

export async function bookCinemaSeat(data) {
    return await axios.post(`${uri}/bookings`, {
        data: data
    });
}
