import React from 'react';
import './index.css';
import {Spin} from "antd";
class PageLoader extends React.Component{
    render() {
        return (
            <div className={"container-loader"}>
                <div className="page-loader">
                    <Spin size="large" tip="Welcome to PortLab"/>
                </div>
            </div>
        );
    }
}

export default PageLoader;