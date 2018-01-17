/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import Admin from "containers/Admin/Loadable";
import Profile from "containers/Profile/Loadable";
import Auth from "containers/Auth";
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ContactPage from "containers/ContactPage/Loadable";
import Header from 'components/Header';
import Footer from 'components/Footer';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { appLoaded, setNotificationSystem } from './actions';
import { setTimeout } from 'timers';
import { makeSelectNotificationSystem } from "./selectors";
import { AuthHelper } from "utils/auth";
import { loginUser } from "containers/Auth/actions";
import { makeSelectAuthenticatedUser } from "containers/Auth/selectors";
import { AuthRoute } from "containers/Auth/auth.middleware";

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export class App extends React.Component {

  constructor(prop) {
    super(prop)
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
    if(this.notificationSystem) this.props.dispatchSetNotificationSystem(this.notificationSystem);
    //check if JWT is on sotage, if so, authenticate the user
    if(AuthHelper.getToken()) this.props.dispatch && this.props.dispatch(loginUser({token: AuthHelper.getToken()}))
    this.props && this.props.dispatch(appLoaded());    
  }

  setNotificationSystem() {

  }

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <Header authenticatedUser={this.props.authenticatedUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/authenticate" component={Auth} />
          <AuthRoute roles={['user']} path="/profile" component={Profile} />
          <AuthRoute roles={['admin']} path="/admin" component={Admin} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
        <NotificationSystem ref="notificationSystem"></NotificationSystem>
      </AppWrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchSetNotificationSystem: (notificationSystem) => dispatch(setNotificationSystem(notificationSystem)),
    dispatch
  };
}

const mapStateToProps = createStructuredSelector({
  notificationSystem: makeSelectNotificationSystem(),
  authenticatedUser: makeSelectAuthenticatedUser(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(
  // withReducer,
  // withSaga,
  withConnect,
)(App));