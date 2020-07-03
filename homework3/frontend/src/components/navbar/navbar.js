import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./navbar.css"
import { userLoggedOut, themeChanged } from "../../actions";


const Navbar = ( { isLoggedIn, loggedInUser, userLoggedOut, themeChanged }) => {

    const logoutHandler = () => {
        userLoggedOut();
    }

    const welcomeUser = isLoggedIn ?
        <h5 className={classes['welcome-user']}>Welcome {loggedInUser}</h5> : null;


    const logoutAndCreatePhoto = isLoggedIn ?
        (
            <React.Fragment>
                <li className="nav-item">
                    <Link to="/create-photo" className="nav-link">Create Photo</Link>
                </li>
                <li className="nav-item" onClick={logoutHandler}>
                    <Link to="/" className="nav-link">Logout</Link>
                </li>
            </React.Fragment>
        ) : null;


    const authUser = isLoggedIn ? null : (
        <React.Fragment>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
        </React.Fragment>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to="/" className="navbar-brand" href="#">PhotoRate</Link>
            {welcomeUser}
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Main <span className="sr-only">(current)</span></Link>
                    </li>
                    {authUser}
                    {logoutAndCreatePhoto}
                    <li className="nav-item">
                        <span className="badge badge-light mt-2 ml-1" onClick={() => themeChanged("light")}>
                            Light
                        </span>
                        <span className="badge badge-dark mt-2 ml-1" onClick={() => themeChanged("dark")}>
                            Dark
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        loggedInUser: state.loggedInUser
    };
}

const mapDispatchToProps = {
    userLoggedOut,
    themeChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
