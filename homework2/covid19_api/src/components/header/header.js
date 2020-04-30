import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {

    return (
        <div className="header d-flex">
            <h3>
                <Link to="/">
                    <i className="fas fa-virus"></i>
                    Covid19 Stats
                </Link>
            </h3>

            <ul className="d-flex">
                <li>
                    <Link to="/summary">
                        <i className="fas fa-globe"></i>
                        Summary
                    </Link>
                </li>
                <li>
                    <Link to="/dayone/confirmed">Day One Confirmed</Link>
                </li>
                <li>
                    <Link to="/dayone/recovered">Day One Recovered</Link>
                </li>
                <li>
                    <Link to="/dayone/deaths">Day One Deaths</Link>
                </li>
            </ul>
        </div>
    );

}


export default Header;
