import React from 'react';
import { withState } from '../../blog-context';
import { withRouter } from 'react-router-dom';
import * as actionTypes from '../../store/actionTypes';
import AuthService from '../../services/auth';
import './Auth.css';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'abc@123.com',
            password: 'abc123',
            isSignUp: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    authModeChangeHandler = () => {
        this.setState({ isSignUp: !this.state.isSignUp });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const data = { email: email, password: password };
        if (this.state.isSignUp) {
            AuthService.signup(data).then(res => {
                this.props.dispatch({ type: actionTypes.AUTH_SUCCESS, user: res })
                this.props.history.push('/');
            }).catch(err => {
                this.props.dispatch({ type: actionTypes.AUTH_FAIL, error: err.message })
            })
        } else {
            AuthService.login(data).then(res => {
                this.props.dispatch({ type: actionTypes.AUTH_SUCCESS, user: res })
                this.props.history.push('/');
            }).catch(err => {
                this.props.dispatch({ type: actionTypes.AUTH_FAIL, error: err.message })
            })
        }
    }

    render() {
        return (
            <div className="auth-form">
                <form onSubmit={this.formSubmitHandler}>
                    <p>Fill in the form below to login to your account.</p>
                    <div className="form-control">
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form-control">
                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <button type="submit" className="btn auth">
                        {this.state.isSignUp
                            ? "Sign Up"
                            : "Sign In"
                        }
                    </button>
                </form>

                <button className="btn auth-handler" onClick={this.authModeChangeHandler}>
                    {!this.state.isSignUp
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"
                    }
                </button>
            </div>
        );
    }

};

export default withRouter(withState(Auth));
