import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from "prop-types";

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import { Link } from "react-router-dom";
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "containers/Auth/actions";
import { makeSelectLocation } from '../../../internals/templates/containers/App/selectors';
import { AuthHelper } from 'utils/auth';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function


  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  isAdmin = () => {
    return this.props.location && /^\/admin/.test(this.props.location.pathname);
  }

  isAuthenticated = (roles) => {
    return AuthHelper.isAuthenticated(roles, this.props.authenticatedUser);
  }

  logout = () => {
    this.props.dispatch && this.props.dispatch(logout())
  }

  render() {
    let links = [
      {
        name: "Contact", url: "/contact"
      },
      {
        name: "Blog", url: "/blog"
      },
    ];
    let showSearch = false;
    let user = {
      username: "test username",
    }

    return (
      <div>
        { !this.isAdmin() && 
          <A href="https://twitter.com/mxstbr">
            <Img src={Banner} alt="react-boilerplate - Logo" />
          </A>
        }
        <NavBar>
          <nav className={`navbar navbar-expand-md navbar-dark bg-dark ${this.isAdmin()? 'fixed-top' : ''}`} >
            <a className="navbar-brand" href="javascript:void(0)">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <HeaderLink className="nav-link" to="/">Home</HeaderLink>
                </li>
                {links.map((link, index) => {
                  return (<li key={index} className="nav-item" >
                    <HeaderLink className="nav-link" to={link.url}>{link.name}</HeaderLink>
                  </li>)
                })}

              </ul>
              <div className="justify-content-end">
                <div className="row">
                  <div className="col">
                    {this.isAuthenticated() &&
                      <ul className="navbar-nav mr-auto pr-3">
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#!" onClick={(e) => { this.setState({ showMenu: !this.state.showMenu }) }} id="dropdown01" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">{user.username}</a>
                          <div onClick={e => this.setState({showMenu: !this.state.showMenu})} className={`dropdown-menu ${this.state.showMenu ? 'show' : ''}`} aria-labelledby="dropdown01" id="drop-opt">
                            { this.isAuthenticated(["admin"]) && 
                              <Link className="dropdown-item" to="/admin">Admin</Link>
                            }
                            <Link className="dropdown-item" to="/profile">Profile</Link>
                            <a className="dropdown-item" onClick={this.logout} href="#" >Logout</a>
                          </div>
                        </li>
                      </ul>
                    }
                    {!this.isAuthenticated() &&
                      <Link to="/authenticate" style={{ color: '#fff' }}>
                        <button type="button" className="btn btn-primary btn-sm">
                          Login/Signup
                        </button>
                      </Link>
                    }
                  </div>
                </div>
              </div>
              {showSearch &&
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              }
            </div>
          </nav>
        </NavBar>
      </div>
    );
  }
}

Header.PropTypes = {
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

export default compose(withConnect)(Header);
