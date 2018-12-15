import axios from 'axios';

export class Service {

    static apiKey = 'AIzaSyDsusrQ7SjIJjQMOvfoRw-6-dnLFqJj2BI';

    static register(email, password) {
        return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + Service.apiKey, {
            email, password
        })
    }

    static login(email, password) {
        return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + Service.apiKey, {
            email,
            password,
            returnSecureToken: true
        })
    }
}
