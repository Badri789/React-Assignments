import React from "react";
import Login from "../components/login/login";
import Gallery from "../components/gallery";
import { connect } from "react-redux";

const MainPage = ({ isLoggedIn }) => {

    const content = isLoggedIn ? <Gallery /> : <Login/>;

    return (
        <div>
            {content}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
    };
}

export default connect(mapStateToProps)(MainPage);

