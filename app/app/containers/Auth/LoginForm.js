import { Form, Text, TextArea } from "react-form";
import React from 'react';
import PropTypes from 'prop-types';


export default function LoginForm(props) {

    function loginErrorValidator(values) {
        const validateEmail = (email) => {
            return !email ? 'Email is required.' : null;
        };
        const validatePassword = (password) => {
            return !password ? 'Password is required.' : null;
        };
        let validation = {
            email: validateEmail(values.email),
            password: validatePassword(values.password),
        };
        console.log(validation);
        return validation;
    }

    return (
        <Form preSubmit={props.preSubmit} validateError={loginErrorValidator} dontValidateOnMount={false} onSubmit={props.onSubmit} onSubmitFailure={props.onSubmitFailure}>
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
                        <label htmlFor="password">Password</label>
                        <Text type="password" className="form-control" className={`form-control ${formApi.errors.password && (formApi.touched.password || formApi.submitted) ? 'is-invalid' : ''}`} field="password" id="password" placeholder="Enter password" />
                        <div className="invalid-feedback">{formApi.errors.password}</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </Form>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    preSubmit: PropTypes.func,
    onSubmitFailure: PropTypes.func,
};