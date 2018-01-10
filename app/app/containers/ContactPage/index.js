/**
 *
 * ContactPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import ContactForm from "components/ContactForm/Loadable";
import { compose } from 'redux';
import PrettyHeading from "components/PrettyHeading";
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ContactPage</title>
          <meta name="description" content="Description of ContactPage" />
        </Helmet>
        <PrettyHeading title={'Contact Page'}></PrettyHeading>
        <div className="container">
          <ContactForm></ContactForm>
        </div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ContactPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'contactPage', saga });

export default compose(
  withSaga,
  withConnect,
)(ContactPage);
