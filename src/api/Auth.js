export class Auth {
    static isAuthed() {
        if (localStorage.getItem('token') === null) return false;
        //if (Number(localStorage.getItem('expiresAt')) > (new Date()).getTime()) return false;
        return true;
    }

    static login(data) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('expiresIn', data.expiresIn);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('localId', data.localId);
    }

    static logout() {
        const email = localStorage.getItem('email');
        localStorage.clear();
        localStorage.setItem('email', email);
    }
}
