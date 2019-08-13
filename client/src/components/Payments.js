import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {

    return (
      <StripeCheckout
        name="Pueo Poll"
        description="$5 for 5 email credits"
        amount={500} //give me $5 in US currency in cents

        //not API token, this is expecting to receive a callback function and the callback function is called after we have successfully retrieved an auth token from the Stripe API
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);