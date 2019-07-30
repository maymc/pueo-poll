// App.js - single component, makes the rendering layer of the app, contains components to show on the screen
// contains React Router logic

import React, { Component } from 'react';
//BrowserRouter = brains of react router; tells react router how to behave (looks at current URL and changes the components on the screen at any given time)
// Route - react component that is used to set up a rule between a certain route that the user might visit inside our application and a set of components that will actually be visible
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/'

//dummy components
import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

//Functional component that returns jsx
class App extends Component {
  //Lifecycle method - componentDidMount - the instance this component is rendered then go ahead and fetch the user
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            {/* Pass in property 'exact' to make sure computer only uses the component for that exact route. Otherwise it will go through each route and try to match every single character in the path" */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />

          </div>
        </BrowserRouter>
      </div>
    );
  };
};

export default connect(null, actions)(App); 