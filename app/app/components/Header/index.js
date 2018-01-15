import React from 'react';
import { FormattedMessage } from 'react-intl';

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

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function


  constructor(props) {
    super(props)
    this.state = {
      showMenu : false
    }
  }

  isAuthenticated = () => {
    return this.props.authenticatedUser
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
        name: "Posts", url: "/posts"
      }
    ];
    let showSearch = false;
    let user = {
      username: "test username",
    }

    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark " >
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
                          <a className="nav-link dropdown-toggle" href="#!" onClick={(e) => {this.setState({showMenu: !this.state.showMenu})}} id="dropdown01" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">{user.username}</a>
                          <div className={`dropdown-menu ${this.state.showMenu? 'show' : ''}`} aria-labelledby="dropdown01" id="drop-opt">
                            <a className="dropdown-item" to="admin">Admin</a>
                            <a className="dropdown-item" to="profile">Profile</a>
                            <a className="dropdown-item" onClick={this.logout} href="#" >Logout</a>
                          </div>
                        </li>
                      </ul>
                    }
                    {!this.isAuthenticated() &&
                      <button type="button" className="btn btn-primary btn-sm">
                        <Link to="/authenticate" style={{ color: '#fff' }}>Login/Signup</Link>
                      </button>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Header);
