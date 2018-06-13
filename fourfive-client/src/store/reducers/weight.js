import { LOAD_WEIGHTS } from '../actionTypes';

export default (state = { weight: null }, action) => {
    switch(action.type) {
        case LOAD_WEIGHTS:
            return  action.weights;
        default:
            return state;
    }
};