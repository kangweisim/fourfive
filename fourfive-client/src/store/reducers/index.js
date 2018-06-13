import { combineReducers } from 'redux';
import errors from './errors';
import weight from './weight';

const rootReducer = combineReducers({
    errors, weight
});

export default rootReducer;