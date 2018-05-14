import {
  GET_QLIST_IN_PROGESS,
  GET_QLIST_SUCESS,
  GET_QLIST_FAILURE
} from '../../constants/actionTypes';

const initialState = {
  isFetching: false,
  qList: [],
  error: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_QLIST_IN_PROGESS:
      return {
        ...state,
        isFetching: true
      };
    case GET_QLIST_SUCESS:
      return {
        ...state,
        isFetching: false,
        error: {},
        qList: payload
      };
    case GET_QLIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    default:
      return state;
  }
};
