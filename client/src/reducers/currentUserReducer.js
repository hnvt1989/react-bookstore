import _ from 'lodash';
import {
  FETCH_CURRENT_USER_BOOKS
} from '../actions/types';

const INTIAL_STATE = {
  wishes: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_BOOKS:
      console.log(_.mapKeys(action.payload, 'id'));
      return {
        ...state, wishes: _.mapKeys(action.payload, 'id')
      };
    default:
      return state;
  }
};
