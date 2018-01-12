/**
*
* ContactForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Form, Text, TextArea, StyledText } from 'react-form';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from 'reselect';
import { makeSelectNotificationSystem } from "containers/App/selectors";
import "./form.css"

export class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      message: "",
      address: ""
    }
    this.formApi = null;
  }


  componentDidMount() {

  }

  errorValidator = (values) => {
    const validateName = (name) => {
      return !name ? 'Name is required.' : null;
    };
    const validateEmail = (email) => {
      return !email ? 'Last name is required.' : null;
    };
    const validateMessage = (message) => {
      return !message ? 'Gender is required.' : null;
    };
    return {
      name: validateName(values.name),
      email: validateEmail(values.email),
      message: validateMessage(values.message),
    };
  }


  onSubmit = (formValues, e , formApi) => {
    // e && e.preventDefault && e.preventDefault();
    this.notificationSystem = this.props.notificationSystem;
    if (this.notificationSystem) {
      this.notificationSystem.addNotification({
        message: 'Form Valid',
        level: 'success'
      });
    }
    console.log(formApi);

  }

  render() {
    return (
      <div>
        <Form validateError={this.errorValidator} onSubmit={this.onSubmit} getApi={(form => this.formApi = form)}>
          {formApi => (
            <form onSubmit={formApi.submitForm} id="form1" noValidate>
              <div className="form-row">
                <div className={`form-group col-md-6 ${formApi.errors.email? 'has-danger': ''}`}>
                  <label htmlFor="email">Email</label>
                  {/* <input type="email" value={this.state.email} name="email" onChange={this.handleInputChange} className="form-control" id="email" placeholder="Email" /> */}
                  <Text required className={`form-control ${formApi.errors.email && (formApi.touched.email || formApi.submitted)? 'is-invalid': ''}`} field="email" id="email" placeholder="Enter email" />
                  <div className="invalid-feedback">{formApi.errors.email}</div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="password">Name</label>
                  <Text required className="form-control" className={`form-control ${formApi.errors.name && (formApi.touched.name || formApi.submitted)? 'is-invalid': ''}`} field="name" id="name" placeholder="Enter name" />
                  <div className="invalid-feedback">{formApi.errors.name}</div>                  
                  {/* <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} className="form-control" id="name" placeholder="Name" /> */}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address" >Address</label>
                {/* <input type="text" name="address" value={this.state.address} onChange={this.handleInputChange} className="form-control" id="address" placeholder="1234 Main St" /> */}
                <Text className="form-control" field="address" id="address" placeholder="Enter address" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <TextArea required className="form-control" className={`form-control ${formApi.errors.message && (formApi.touched.message || formApi.submitted)? 'is-invalid': ''}`} field="message" id="message" />
                <div className="invalid-feedback">{formApi.errors.message}</div>                                  
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          )}
        </Form>
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