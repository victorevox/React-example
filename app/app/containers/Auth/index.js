/**
 *
 * Auth
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAuth from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loginUser, makeLoginUserRequest, makeSignupUserRequest } from "./actions";
import { Form, Text, TextArea } from "react-form";
import Button from "components/Button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { makeSelectLocation, makeSelectGlobal } from "containers/App/selectors";

export class Auth extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props, { history }) {
    super(props);
  }

  componentDidMount() {
    this.history = this.props.history ? this.props.history : null;
    this.location = this.props.location ? this.props.location : null;
    this.setDefaultAuthType();
  }

  componentDidUpdate() {
    this.setDefaultAuthType()
  }

  setDefaultAuthType() {
    if(!this.isAuthTypeDefined()) {
      if (this.location && this.history) {
          this.history.push('/authenticate?auth_type=login')
      }
    }
  }

  componentWillMount() {
  }

  isAuthTypeDefined() {
    if(this.props && this.props.location && this.props.location.search !== undefined && /auth_type/.test(this.props.location.search) ) {
      return true
    }
    return false;
  }

  parseQueryParams(params) {
    let parsedObject = {};
    params.substring(1).split('&').map(item => {
      let splited = item.split('=');
      let field = splited && splited.length && splited[0];
      let value = splited && splited.length && splited[1];
      if (field && value) {
        parsedObject[field] = value;
      }
    });
    return parsedObject
  }

  changeAuthType = () => {
    switch (this.getAuthType()) {
      case "login":
        this.changeToSignup();
        break;
      case "signup":
        this.changeToLogin();
        break;

      default:
        break;
    }
  }

  onSubmit = (values, e, form) => {
    console.log(form);
    if (this.isLogin()) {
      this.props.dispatch(makeLoginUserRequest(form.values));
    }
    else {
      this.props.dispatch(makeSignupUserRequest(form.values));
    }
  }

  changeToSignup = () => {
    this.history && this.history.push && this.history.push('/authenticate?auth_type=signup')
  }

  changeToLogin = () => {
    this.history && this.history.push && this.history.push('/authenticate?auth_type=login')
  }

  getAuthType() {
    let queryParams = this.props.location && this.props.location.search && this.parseQueryParams(this.props.location.search);
    return queryParams && queryParams["auth_type"];
  }

  isLogin() {
    return this.getAuthType() === "login";
  }

  isSignup() {
    return this.getAuthType() === "signup";
  }


  onSubmitFailure = (errors, formApi) => {
    console.log(errors);
  }

  render() {
    return (
      <div className="container p-2">
        {this.isLogin() &&
          <LoginForm onSubmitFailure={this.onSubmitFailure} onSubmit={this.onSubmit} />
        }
        {this.isSignup() &&
          <SignupForm onSubmitFailure={this.onSubmitFailure} onSubmit={this.onSubmit} />
        }
        <br />
        <hr />
        <div style={{ textAlign: "center" }}>
          <h3>Or</h3>
        </div>
        <Button onClick={this.changeAuthType}>{this.isLogin() ? 'Signup' : 'Login'}</Button>
      </div>
    );
  }
}

Auth.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = (createStructuredSelector({
  global: makeSelectGlobal()
}));


function mapDispatchToProps(dispatch) {
  return {
    loginUser: (data) => { loginUser() },
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default withRouter(compose(
  // withReducer,
  withSaga,
  withConnect,
)(Auth));
