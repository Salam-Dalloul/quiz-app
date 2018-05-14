import axios from 'axios';

import {
  GET_QLIST_IN_PROGESS,
  GET_QLIST_SUCESS,
  GET_QLIST_FAILURE
} from '../../constants/actionTypes';

const getQListInProgress = () => ({
  type: GET_QLIST_IN_PROGESS
});

const getQListSuccess = results => ({
  type: GET_QLIST_SUCESS,
  payload: results
});

const getQListFailure = error => ({
  type: GET_QLIST_FAILURE,
  payload: error
});

export const getQList = () => dispatch => {
  dispatch(getQListInProgress());
  axios.get('https://opentdb.com/api.php?amount=10')
    .then(
      response => {
        if (response >= 400) {
          return new Error('Error Fetching The Questions List');
        }
        const { results } = response.data;
        dispatch(getQListSuccess(results));

      }
    ).catch(error => {
      return dispatch(getQListFailure(error));
    });
};
