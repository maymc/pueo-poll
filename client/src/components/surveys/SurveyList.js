import React, { Component } from 'react';
import { connect } from 'react-redux';    //wire up to redux so that we can call an action creator to fetch list of surveys
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  //Lifecycle method, make sure the fetchSurveys action creator is called anytime this component is rendered to the screen
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    // For every survey, return one of these cards
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">
              {survey.title}
            </span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {/* Help method responsible for rendering list of all the diff surveys */}
        {this.renderSurveys()}
      </div>
    );
  }
}

//Pull in list of surveys
function mapStateToProps(state) {

  //return an object that contains our list of surveys
  return { surveys: state.surveys };
}


export default connect(mapStateToProps, { fetchSurveys })(SurveyList);