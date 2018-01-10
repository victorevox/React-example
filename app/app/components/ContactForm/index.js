/**
*
* ContactForm
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from 'reselect';
import { makeSelectNotificationSystem } from "containers/App/selectors";

export class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      message: "",
      address: ""
    }
  }

  componentDidMount() {
    console.log(this.props.notificationSystem);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    console.log(e, this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" value={this.state.email} name="email" onChange={this.handleInputChange} className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password">Name</label>
              <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} className="form-control" id="name" placeholder="Name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address" >Address</label>
            <input type="text" name="address" value={this.state.address} onChange={this.handleInputChange} className="form-control" id="address" placeholder="1234 Main St" />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Message</label>
            <textarea value={this.state.message} name="message" onChange={this.handleInputChange} className="form-control" id="message">

            </textarea>
          </div>
          {/* <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div> */}
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ContactForm.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  notificationSystem: makeSelectNotificationSystem(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(ContactForm);