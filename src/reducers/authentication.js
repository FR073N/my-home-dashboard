export const AUTHENTICATION_TYPES = {
    AUTH_REQUEST : 'AUTH_REQUEST',
    AUTH_SUCCESS : 'AUTH_SUCCESS',
    AUTH_FAILURE : 'AUTH_FAILURE',
    LOGOUT_REQUEST : 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS : 'LOGOUT_SUCCESS',
};

export const authorize = (login, password) => ({
    type: AUTHENTICATION_TYPES.AUTH_REQUEST,
    payload: { login, password }
});

export const logout = (login, password) => ({
    type: AUTHENTICATION_TYPES.LOGOUT_REQUEST,
    payload: { login, password }
});

const initialState = {
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    error: null
};

const authenticationReducer = (state = initialState, {type, action = {} }) => {
    switch (type) {
        case AUTHENTICATION_TYPES.AUTH_SUCCESS: {
            return { ...state,
                email: action.email,
                token: action.token,
                refreshToken: action.refreshToken,
            };
        }
        case AUTHENTICATION_TYPES.AUTH_FAILURE: {
            return { ...state, error: action.error }
        }
        case AUTHENTICATION_TYPES.LOGOUT_SUCCESS: {
            return { ...state,
                email: null,
                token: null,
                refreshToken: null,
            };
        }
        default:
            return state;
    }
};


export default authenticationReducer;