import axios from 'axios';    //used to make AJAX requests

//Import action types
import { FETCH_USER, FETCH_SURVEYS } from './types';

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

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);   //post request to send some information

  //after succesfully making post request to server and got response. In the response back to server, what type of action are we going to dispatch?
  //going to assume we get back the exact same user model so we use the same action as fetchUser
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchSurveys = () => async dispatch => {
  //Fetch all surveys from our backend db
  const res = await axios.get('/api/surveys');

  //Dispatch action, payload is the list of surveys that we got back from the request. Payload contains all the diff surveys our current user has made
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};