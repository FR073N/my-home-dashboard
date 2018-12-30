// Types
export const MODULE_TYPES = {
    ADD_MODULE: 'ADD_MODULE',
    ADD_MODULE_SUCCESS: 'ADD_MODULE_SUCCESS',
    REMOVE_MODULE: 'REMOVE_MODULE',
    GET_MODULES: 'GET_MODULES',
    GET_MODULES_SUCCESS: 'GET_MODULES_SUCCESS',
    GET_MODULES_ERROR: 'GET_MODULES_ERROR',
};

// Actions
export const addModule = (service, params) => ({
    type: MODULE_TYPES.ADD_MODULE,
    payload: {service, params}
});

export const removeModule = (id) => ({
    type: MODULE_TYPES.REMOVE_MODULE,
    id: id
});

export const getModules = () => ({
    type: MODULE_TYPES.GET_MODULES
});

// Reducer
let initialState = {
    loading: false,
    list: [],
    lastUpdate: null,
};

const moduleReducer = (state = initialState, {type, action = {}}) => {
    switch (type) {

        case MODULE_TYPES.ADD_MODULE_SUCCESS:

            if(state.list == null) {
                state.list = [];
            }

            state = Object.assign({}, state, {
                loading: false,
                list: [
                    ...state.list,
                    {
                        service: action.service,
                        apiKey: action.apiKey,
                        city: action.city,
                        country: action.country,
                        data: {
                            temp: action.temp,
                        }
                    }
                ]
            });

            localStorage.setItem('modules', JSON.stringify(state.list));

            return state;

        case MODULE_TYPES.REMOVE_MODULE:

            let newList = state.filter((data, i) => i !== action.id);
            localStorage.setItem('modules', newList);
            return newList;

        case MODULE_TYPES.GET_MODULES:
            state = Object.assign({}, state, {
                loading: true
            });

            return state;

        case MODULE_TYPES.GET_MODULES_SUCCESS:

            state = Object.assign({}, state, {
                loading: false,
                list: action.list,
                lastUpdate: Date.now()
            });

            return state;

        case MODULE_TYPES.GET_MODULES_ERROR:
            state = Object.assign({}, state, {
                loading: false
            });

            return state;

        default:
            return state;
    }

};

export default moduleReducer;
