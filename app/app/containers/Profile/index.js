/**
 *
 * Profile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from "reselect";
import { makeSelectAuthenticatedUser } from 'containers/Auth/selectors';
import ProfileImageUpload from "components/ProfileImageUpload";


export class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    
  }
  
  componentDidMount() {
    console.log(this.props);
  }

  getUserName() {
    return this.props.authenticatedUser && this.props.authenticatedUser.username || this.props.authenticatedUser && this.props.authenticatedUser.email;
  }

  render() {
    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-4">
            <ProfileImageUpload></ProfileImageUpload>
          </div>
          <div className="col-sm-8">
            <h2>Welcome back {this.getUserName()}</h2>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authenticatedUser: PropTypes.object
};

// const mapStateToProps = (createStructuredSelector({
//   // authenticatedUser: makeSelectAuthenticatedUser()
//   authenticatedUser: () => {username: "test"}
// }));
const mapStateToProps = (state) => {
  return {
    authenticatedUser: makeSelectAuthenticatedUser()(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Profile);
