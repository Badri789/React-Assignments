import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = ({ loggedIn }) => {

    const register = loggedIn ? null : 
    (
        <li className="nav-item">
            <Link className="nav-link" to="/register">
                Register
            </Link>
        </li>
    );

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
            <h3 className="logo" >
                <Link to="/" >
                    ReqResApi
                </Link>
            </h3>

            <ul className="navbar-nav mr-auto">
                {register}
            </ul>
        </div>
    );

}


export default Header;