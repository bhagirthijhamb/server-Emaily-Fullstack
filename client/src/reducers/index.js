import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';


export default combineReducers({
  auth: authReducer,
  // form is a special key for reduxForm (reducer) value
  form: reduxForm
})