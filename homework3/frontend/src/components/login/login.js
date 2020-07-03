import React, {useContext, useState} from 'react';
import classes from './login.css';
import StrapiServiceContext from "../strapi-service-context";
import { connect } from "react-redux";
import { userAuthenticated } from "../../actions";

const Login = ({ userAuthenticated }) => {

    const strapiService = useContext(StrapiServiceContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        strapiService.loginUser(email, password)
            .then(response => {
                userAuthenticated(response.data.jwt,
                    response.data.user.username,
                    response.data.user.id);
            });
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <form className={classes['login-form']} onSubmit={onSubmit}>
            <legend>Login</legend>
            <div className="form-group">
                <label htmlFor="loginInputEmail">Email address</label>
                <input type="email" className="form-control" id="loginInputEmail" aria-describedby="emailHelp"
                       placeholder="Enter email" onChange={onEmailChange} value={email}/>
            </div>
            <div className="form-group">
                <label htmlFor="loginInputPassword">Password</label>
                <input type="password" className="form-control" id="loginInputPassword"
                       placeholder="Password" onChange={onPasswordChange} value={password}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>

        </form>
    );
}

const mapDispatchToProps = {
    userAuthenticated
}

export default connect(undefined, mapDispatchToProps)(Login);
