//SurveyForms shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {

  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>

        </form>
      </div>
    );
  }
}

//takes a single argument of values. Values is an object containing all the diff values coming off the form
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  //If redux form gets an empty object back then it assumes that the entire form is valid
  return errors;
}

export default reduxForm({
  validate,
  //ReduxForm only requires one option to be passed inside this object and that property is 'form'
  form: 'surveyForm',
  //this destroys the form anytime the survey form is unmounted or no longer shown on the screen. This is true by default. If it is false then it will not destroy the form
  destroyOnUnmount: false
})(SurveyForm);