/**
 *
 * Admin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAdmin from './selectors';
import reducer from './reducer';
import saga from './saga';
import Sidebar from "./Sidebar";
import PostsList from "./Posts/PostsList";
import PostCompose from "./Posts/PostCompose";

import { Switch, Route, Redirect } from 'react-router-dom';

import "./dashboard.css"
import { makeSelectLocation } from 'containers/App/selectors';


export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  links = [
    {
      url: '/admin/posts',
      name: 'Posts'
    },
    {
      url: '/admin/pages',
      name: 'pages'
    }
  ];

  shouldRedirect() {
    return this.props.location && /admin$/.test(this.props.location.pathname);
  }

  componentDidMount() {
    // if( ) {
    //   console.log("should redirect");

    // }
  }
  render() {
    if (this.shouldRedirect()) return <Redirect to="/admin/dashboard" />
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar links={this.links}></Sidebar>

          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-5">

            <Switch>
              <Route component={PostCompose} path="/admin/posts/create" />
              <Route component={PostsList} path="/admin/posts" />
              <Route component={PostsList} path="/admin/pages" />
            </Switch>

          </main>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  admin: makeSelectAdmin(),
  location: makeSelectLocation()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'admin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
