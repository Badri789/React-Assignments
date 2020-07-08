import React from "react";
import Head from "next/head";
import Header from "./header/header";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Head>
                <title>Covid19 App</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
                      integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
                      crossOrigin="anonymous" />
            </Head>
            <Header />
            {children}
            <style global jsx>{`
            * {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
            }
            body {
              background-color: #e7e7e7;
              margin: 0 auto;
            }
            i {
                margin-right: 5px;
            }
        `}</style>
        </React.Fragment>
    );
}

export default Layout;
