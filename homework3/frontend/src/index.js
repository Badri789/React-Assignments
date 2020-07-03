import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/app/App";
import StrapiServiceContext from "./components/strapi-service-context";
import './index.css';
import StrapiService from "./service/strapiService";

const strapiService = new StrapiService();

import store from "./store/store";

const app = (
    <Provider store={store}>
        <StrapiServiceContext.Provider value={strapiService}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrapiServiceContext.Provider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));


