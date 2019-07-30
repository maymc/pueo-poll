import axios from 'axios';    //used to make AJAX requests

//Import action types
import { FETCH_USER } from './types';

//action creator- initiates change inside of the redux side of the app, used to modify the state that is contained inside the redux store
//dispatch is a function passed in by redux thunk if it sees that a function is being returned in the action creator instead of a normal action
// export const fetchUser = () => {
//   function (dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   }
// }

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};