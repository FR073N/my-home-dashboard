import { combineReducers } from 'redux';
import contacts from './contact';
import authentication from './authentication';
import module from './module';

import { reducer as formReducer } from 'redux-form'

const appReducer = combineReducers({
    contacts: contacts,
    authentication: authentication,
    module: module,
    form: formReducer
});

const rootReducer = (state, action) => {
    // Handle a root reducer for global actions like user logout
    if (action.type === 'ERROR') {
        state = undefined;
    }

    return appReducer(state, action)
};

export default rootReducer;
