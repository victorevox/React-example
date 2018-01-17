import { AuthHelper } from "utils/auth";
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { makeSelectNotificationSystem } from "containers/App/selectors";
import { isEqual } from "lodash";

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
// const isAuthenticated = () => true;

const AUTHENTICATE_ROUTE = '/authenticate';
const HOME_ROUTE = '/';

export class AuthRouteClass extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ready: null
        }
    }

    componentDidUpdate(props, state, state2) {
        if (this.props.notificationSystem) {
            this.setState({
                ready: true
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // You can access `this.props` and `this.state` here
        // This function should return a boolean, whether the component should re-render.
        if(this.state.ready !== nextState.ready || !isEqual(this.props.notificationSystem, nextProps.notificationSystem) ) return true;
        if(this.props.path !== nextProps.path || !isEqual(this.props.component, nextProps.component) ) return true;
        if(!isEqual(this.props.location, nextProps.location)) return true;
        return false;
    }

    render() {
        const { component, roles, ...props } = this.props;
        const { isPrivate } = component;

        if (!this.props.notificationSystem && !this.state.ready) return null;
        if (AuthHelper.isAuthenticated(roles)) { // if met required roles pass
            //User is Authenticated
            return <Route { ...props } component={component} />;

        }
        if (AuthHelper.isAuthenticated()) { // if is authenticated without complaining roles then
            this.props.notificationSystem && this.props.notificationSystem.addNotification({
                message: "Unauthorized",
                level: "error"
            });
            return <Redirect to={HOME_ROUTE} />
        }
        this.props.notificationSystem && this.props.notificationSystem.addNotification({
            message: "Please login first",
            level: "warning"
        });
        return <Redirect to={AUTHENTICATE_ROUTE} />;
    }

};

AuthRouteClass.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]),
    roles: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    notificationSystem: PropTypes.object
};

function mapStateProps(state) {
    return {
        notificationSystem: makeSelectNotificationSystem()(state)
    }
}

export const AuthRoute = connect(mapStateProps)(AuthRouteClass);