import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import photoReducer from './reducers/reducer';

export const reducers = combineReducers({
    photoReducer: photoReducer,
    routing: routerReducer
});
