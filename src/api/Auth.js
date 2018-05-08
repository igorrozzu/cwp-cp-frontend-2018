import * as constants from '../config/AppConstants';
import axios from 'axios';
axios.defaults.withCredentials = true;


export async function Register(data) {

    return await axios.post(constants.API_URI + '/users/register', {
        data: data
    });
}
