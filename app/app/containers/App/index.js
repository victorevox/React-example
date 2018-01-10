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
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ContactPage from "containers/ContactPage/Loadable";
import Header from 'components/Header';
import Footer from 'components/Footer';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setNotificationSystem } from './actions';
import { setTimeout } from 'timers';
import { makeSelectNotificationSystem } from "containers/App/selectors";

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

    this.notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });

    setTimeout(()=>{
      console.log(this.props);
      
    },1000)
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
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/contact" component={ContactPage} />
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
  };
}
console.log(makeSelectNotificationSystem);

const mapStateToProps = createStructuredSelector({
  notificationSystem: makeSelectNotificationSystem,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(App);