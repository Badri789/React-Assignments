import React from "react";
import { Route } from "react-router-dom";
import Login from "../login";
import Navbar from "../navbar";
import Register from "../register";
import MainPage from "../../pages";
import CreatePhoto from "../create-photo";
import { connect } from "react-redux";
import {Helmet} from "react-helmet";

const App = ({ theme }) => {

    let myTheme;

    if (theme === 'light') {
       myTheme = (
            <Helmet>
                <link rel="stylesheet" href="https://bootswatch.com/4/litera/bootstrap.min.css" />
            </Helmet>
       );
    } else {
       myTheme = (
            <Helmet>
                <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css" />
            </Helmet>
        );
    }

    return (
        <div>
            {myTheme}
            <Navbar />
            <Route path="/" component={MainPage} exact/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/create-photo" component={CreatePhoto} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme
    };
}

export default connect(mapStateToProps)(App);


