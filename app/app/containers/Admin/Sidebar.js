import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeSelectLocation } from "containers/App/selectors";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    isLinkActive = (url) => {
        let reg = new RegExp(url,'ig')
        return this.props.location && reg.test(this.props.location.pathname)
    }

    render() {
        return (

            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                <ul className="nav nav-pills flex-column">
                    {this.props.links && this.props.links.map((link) => {
                        return (
                            <li key={`${link.url}`} className="nav-item" >
                                <Link className={`nav-link ${this.isLinkActive(link.url) ? 'active' : ''}`} to={link.url} >{link.name}
                                    {/* <span *ngIf="isLinkActive(link.url)" className="sr-only">(current)</span> */}
                                </Link>
                            </li >
                        )
                    })}
                </ul >
            </nav >
        )
    }
}

function mapStateProps(state) {
    return {
        location: makeSelectLocation()(state)
    }
}


Sidebar.PropTypes = {
    links: PropTypes.array.isRequired
}

export default connect(mapStateProps)(Sidebar);