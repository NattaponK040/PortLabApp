import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {Provider} from 'react-redux'
import App from "./views/App";
import store from "./store";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={() => <App/>}/>

            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
