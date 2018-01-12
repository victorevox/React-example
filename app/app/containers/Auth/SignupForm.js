
import { Form, Text, TextArea } from "react-form";
import React from 'react';
import PropTypes from 'prop-types';

export default function SignupForm(props) {

    console.log(props);

    function signupErrorValidator(values) {
        const validateUsername = (username) => {
            return !username ? 'Username is required.' : null;
        };
        const validateConfirmPass = (pass, values) => {
            return pass !== values.password ? 'Password must match, please veryfy' : null;
        }
        const validateEmail = (email) => {
            return !email ? 'Email is required.' : null;
        };
        const validatePassword = (password) => {
            return !password ? 'Password is required.' : null;
        };
        let validation = {
            username: validateUsername(values.username),
            confirmpass: validateConfirmPass(values.confirmpass, values),
            email: validateEmail(values.email),
            password: validatePassword(values.password),
        };
        console.log(validation);
        return validation;
    }

    return (
        <Form preSubmit={props.preSubmit} validateError={signupErrorValidator} dontValidateOnMount={false} onSubmit={props.onSubmit} onSubmitFailure={props.onSubmitFailure}>
            {formApi => (
                <form onSubmit={formApi.submitForm} id="form1" noValidate>
                    <div className="heading mt-5 mb-3">
                        <h2>Authenticate</h2>
                    </div>
                    <div className={`form-group ${formApi.errors.email ? 'has-danger' : ''}`}>
                        <label htmlFor="email">Email</label>
                        <Text className={`form-control ${formApi.errors.email && (formApi.touched.email || formApi.submitted) ? 'is-invalid' : ''}`} field="email" id="email" placeholder="Enter email" />
                        <div className="invalid-feedback">{formApi.errors.email}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" >Username</label>
                        <Text className="form-control" field="username" className={`form-control ${formApi.errors.username && (formApi.touched.username || formApi.submitted) ? 'is-invalid' : ''}`} id="username" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Text type="password" className="form-control" className={`form-control ${formApi.errors.password && (formApi.touched.password || formApi.submitted) ? 'is-invalid' : ''}`} field="password" id="password" placeholder="Enter password" />
                        <div className="invalid-feedback">{formApi.errors.password}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmpass">Confirm Password</label>
                        <Text type="password" className="form-control" className={`form-control ${formApi.errors.confirmpass && (formApi.touched.confirmpass || formApi.submitted) ? 'is-invalid' : ''}`} field="confirmpass" id="confirmpass" placeholder="Enter password confirmation" />
                        <div className="invalid-feedback">{formApi.errors.confirmpass}</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </Form>
    )
}


SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    preSubmit: PropTypes.func,
    onSubmitFailure: PropTypes.func,
};