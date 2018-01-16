import { AuthHelper } from "utils/auth";
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
// const isAuthenticated = () => true;

const AUTHENTICATE_ROUTE = '/authenticate';
const HOME_ROUTE = '/';

export const AuthRoute = ({ component, roles, ...props }) => {
    const { isPrivate } = component;
    if (AuthHelper.isAuthenticated(roles)) {
        //User is Authenticated
        return <Route { ...props } component={component} />;

    }
    return <Redirect to={AUTHENTICATE_ROUTE} />;
};

AuthRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]),
    roles: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
};