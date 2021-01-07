import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
  // const reviewFields = _.map(formFields, field => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    )
  })

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <div>
        <div>
          <label>Survey Title</label>
          <div>{formValues.title}</div>
        </div>
      </div>
      <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
    </div>
  )
}

function mapStateToProps(state){
  console.log(state);
  return { formValues: state.form.surveyForm.values}
}

export default connect(mapStateToProps)(SurveyFormReview);
