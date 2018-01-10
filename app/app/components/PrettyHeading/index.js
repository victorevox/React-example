/**
*
* PrettyHeading
*
*/

import React from 'react';
import { PropTypes } from "prop-types";
// import styled from 'styled-components';


class PrettyHeading extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h2 className="display-4">{this.props.title}</h2>
          { this.props.description && 
            <p className="lead">{this.props.description}</p>
          }
        </div>
      </div>
    );
  }
}

PrettyHeading.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default PrettyHeading;
