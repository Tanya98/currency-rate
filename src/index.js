import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import сurrencies from './reducers/currency-reducer';
import rates from './reducers/rate-reducer';
const moment = require('moment');
import Widget from './components/widget';

const initialState = {
    сurrencies: [],
    rates: []
}

let store = createStore(combineReducers({ сurrencies, rates }), initialState);

ReactDOM.render(
    <Provider store={store}>
        <div className="container">
            <div className="form">
                <Widget />
            </div>
        </div>
    </Provider>,
    document.getElementById('root')
)
