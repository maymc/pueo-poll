import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

  //helper method that inspects the this.props.auth property and then depending on its value it will return some different JSX to show inside this ul component
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login With Google</a></li>
        );
      default:
        return <li><a href="/api/logout">Logout</a></li>;
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Pueo Poll
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

//gets called with entire state object out of the redux store
function mapStateToProps({ auth }) {
  return {
    auth
  };

}
export default connect(mapStateToProps)(Header);