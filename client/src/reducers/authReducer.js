// authReducer.js - records whether or not the user is logged in
import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;    //this is the user model / empty string '' is a falsie value
    default:
      return state;
  }
}
