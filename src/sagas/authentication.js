import { call, put, take, takeLatest } from 'redux-saga/effects';

import { AUTHENTICATION_TYPES } from '../reducers/authentication';

const fetchJSON = (url, options = {}) =>
    new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(response => ((response.status < 200 || response.status > 299) ? reject(response) : response))
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error));
    });

function* authorize({ payload: { login, password } }) {
    const options = {
        body: JSON.stringify({
            username: login,
            password: password
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const { token, refresh_token } = yield call(fetchJSON, 'http://social-desk.snowpact.com/api/login_check', options);
        yield put({ type: AUTHENTICATION_TYPES.AUTH_SUCCESS, action : {email: login, token: token, refreshToken: refresh_token} });
        localStorage.setItem('email', login);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refresh_token);
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = 'Something went wrong';
        }
        yield put({ type: AUTHENTICATION_TYPES.AUTH_FAILURE, action: {error: message } });
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }
}

function * logout () {
    while (true) {
        yield put({ type: AUTHENTICATION_TYPES.LOGOUT_SUCCESS });

        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }
}

function* Saga() {
    yield takeLatest(AUTHENTICATION_TYPES.AUTH_REQUEST, authorize);
    yield take(AUTHENTICATION_TYPES.LOGOUT_REQUEST, logout);
}

export default Saga;