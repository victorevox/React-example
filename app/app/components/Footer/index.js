import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from "prop-types";

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectLocation } from '../../../internals/templates/containers/App/selectors';


export class Footer extends React.Component {

  isAdmin = () => {
    return this.props.location && /^\/admin/.test(this.props.location.pathname);
  }

  render() {
    if(this.isAdmin()) return null;
    return (
      <Wrapper>
        <section>
          <FormattedMessage {...messages.licenseMessage} />
        </section>
        <section>
          <LocaleToggle />
        </section>
        <section>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
            }}
          />
        </section>
      </Wrapper>
    );
  }

}

Footer.PropTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object
}

function mapStateProps(state) {
  return {
    location: makeSelectLocation()(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateProps, mapDispatchToProps);

export default compose(withConnect)(Footer);