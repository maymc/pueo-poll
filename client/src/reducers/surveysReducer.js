//SurveysReducer: Purpose is to watch for this action and return the list of surveys

import { FETCH_SURVEYS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}