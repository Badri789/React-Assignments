import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import classes from "./register.css";
import { useHistory } from "react-router-dom";
import StrapiServiceContext from "../strapi-service-context";
import { userAuthenticated } from "../../actions";

const Register = ({ userAuthenticated }) => {

    const strapiService = useContext(StrapiServiceContext);

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (password === confPassword) {
            strapiService.registerUser(username, email, password)
                .then(response => {
                    userAuthenticated(response.data.jwt,
                        response.data.user.username,
                        response.data.user.id);
                    history.push('/');
                });
        } else {
            alert("Passwords don't match!!!")
        }
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onConfPassChange = (e) => {
        setConfPassword(e.target.value);
    }

    return (
        <form className={classes['register-form']} onSubmit={onSubmit}>
            <legend>Register</legend>
            <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input type="text" className="form-control" id="inputUsername"
                       placeholder="Username" onChange={onUsernameChange}
                       value={username}/>
            </div>
            <div className="form-group">
                <label htmlFor="regInputEmail">Email address</label>
                <input type="email" className="form-control" id="regInputEmail" aria-describedby="emailHelp"
                       placeholder="Enter email" onChange={onEmailChange}
                       value={email}/>
            </div>
            <div className="form-group">
                <label htmlFor="regInputPassword">Password</label>
                <input type="password" className="form-control" id="regInputPassword"
                       placeholder="Password" onChange={onPasswordChange}
                       value={password}/>
            </div>
            <div className="form-group">
                <label htmlFor="regConfirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="regConfirmPassword"
                       placeholder="Confirm Password" onChange={onConfPassChange}
                       value={confPassword}/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
}

const mapDispatchToProps = {
    userAuthenticated
}

export default connect(undefined, mapDispatchToProps)(Register);
