import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware)
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    sagaMiddleware.run(rootSaga);

    // When a changes occurs in the store, we save it into the local storage
    // TODO needs a proper save implementation
    store.subscribe(() => {
        localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    });

    return store;
}
