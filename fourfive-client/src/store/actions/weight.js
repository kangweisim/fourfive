import { LOAD_WEIGHTS } from '../actionTypes';
import { addError } from "./errors";
import { apiCall } from '../../services/api';


export const loadWeights = weights => ({
    type: LOAD_WEIGHTS,
    weights
  });
  

export function fetchWeights(name) {
    return dispatch => {
        return apiCall("GET", `api/users/${name}/weighs`)
            .then(res => {
                dispatch(loadWeights(res))
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}