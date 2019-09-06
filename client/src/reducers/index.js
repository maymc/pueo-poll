//index.js allows us to import the reducers directory which by convention with import statements will automatically give us any fiel inside that directory called index.js

import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// important aspect of the combineReducers call - the object being passed in whatever keys we provide to the object are going to represent the keys that exist inside of our state
//Want to name each key appropraitely
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
