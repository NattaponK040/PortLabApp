import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import './pagelayout.css';

const PageLayout = (props) => {
    const {title, children} = props;
    return (
        <div className={"application-layout"}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <header className="header">
                <nav className="navbar navbar-expand-lg fixed-top py-3" style={{position: "static",backgroundColor:"white"}}>
                    <div className="container"><a href="/" className="navbar-brand text-uppercase font-weight-bold">
                        <img src="logo.png" alt="portlab portfolio" width={150}/>
                    </a>
                        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right"><i
                            className="fa fa-bars"></i></button>
                    </div>
                </nav>
            </header>
            <div className="content-layout">
                {children}
            </div>
        </div>
    );
}

PageLayout.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
}

export default PageLayout;

