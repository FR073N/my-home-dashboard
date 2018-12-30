import "./index.css";
import 'semantic-ui-css/semantic.min.css';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from "./app";
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

// Using the initial state params with local storage
let initialState = {};
const persistedState = localStorage.getItem('reduxState');

if (persistedState) {
    initialState = JSON.parse(persistedState)
}

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();