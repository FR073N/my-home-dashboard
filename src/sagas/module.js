import { call, put, takeLatest, select } from 'redux-saga/effects';

import { MODULE_TYPES } from '../reducers/module';

const fetchJSON = (url, options = {}) =>
    new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(response => ((response.status < 200 || response.status > 299) ? reject(response) : response))
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error));
    });

function* addModule({payload: { service, params }}) {

    const getToken = (state) => state.authentication.token;
    const token = yield select(getToken);

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/xhtml',
            'Content-Type': 'application/json',
        },
     /*   body: JSON.stringify({
            publicId: publicId,
        }), */
    };

    try {
        let result;
        switch(service) {
            case "openWeatherMap":
                console.log(params);

                let corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
                let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

                let city = 'q=' + params.city + ',' + params.country;
                let apiKey = 'APPID=' + params.apiKey;
                let units = 'units=' + params.units;

                let mergedUrl = corsAnywhereUrl + apiUrl + '?' + city + '&' + apiKey + '&' + units;

                result = yield call(fetchJSON, mergedUrl, options);

                const { name, main, sys,  } = result;

                yield put({ type: MODULE_TYPES.ADD_MODULE_SUCCESS, action : {
                        service: service,
                        temp: main.temp,
                        city: name,
                        country: sys.country,
                        apiKey: apiKey,
                    } });
                break;
        }

    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = 'Something went wrong';
        }
    }
}

function* getModules() {

    const getToken = (state) => state.authentication.token;
    const token = yield select(getToken);

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    try {
        const list = yield call(fetchJSON, 'http://social-desk.snowpact.com/api/social-networks', options);

        yield put({ type: MODULE_TYPES.GET_MODULES_SUCCESS, action : {list} });

    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = 'Something went wrong';
        }

        yield put({ type: MODULE_TYPES.GET_MODULES_ERROR });
    }

}

function* Saga() {
    yield takeLatest(MODULE_TYPES.ADD_MODULE, addModule);
    yield takeLatest(MODULE_TYPES.GET_MODULES, getModules);
}

export default Saga;