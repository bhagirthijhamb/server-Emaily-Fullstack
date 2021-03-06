import React from 'react';
import _ from 'lodash';
import { reduxForm, Field, clearSubmitErrors } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from './../../utils/validateEmails';
import formFields from './formFields'; 

class SurveyForm extends React.Component {
  renderFields(){
    // return(
    //   <div>
    //     <Field label="Survey Title" type="text" name="title" component={SurveyField} />
    //     <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
    //     <Field label="Email Body" type="text" name="body" component={SurveyField} />
    //     <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
    //   </div>
    // )
    return _.map(formFields, ({ label, name }) => {
      return <Field component={SurveyField} type="text" label={label} name={name} key={name} />
    })
  }
  render(){
    return (
      <div>
        {/* <form onSubmit={this.props.handleSubmit(values => console.log(values))}> */}
        {/* <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}> */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/* <Field 
            type="text"
            name="surveyTitle" // value stored in refuxForm under the key 'surveyTitle'
            component="input"
            // component={SurveyField}
          /> */}
          { this.renderFields() }
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  // if(!values.title){
  //   errors.title = 'You must provide a title';
  // }
  
  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if(!values[name]){
      errors[name] = 'You must provide a value'
    }
  })


  return errors;
}

export default reduxForm({
  // validate: validate,
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);