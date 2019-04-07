import React, { Component } from 'react';
import indexRoutes from './router/index.jsx';
import { renderRoutes } from './components/Route';
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import { Layout } from "antd";
import './assets/scss/style.css';

import { store } from "./store";

import {headerReducer} from './components/Header/header.reducer';

class App extends Component {
    componentDidMount(){
        store.injectReducer("HEARDER_REDUCER_STORE", headerReducer);
    }
    render() {
        return (
                <BrowserRouter>
                    <Layout>
                        {renderRoutes(indexRoutes, "")}
                    </Layout>
                </BrowserRouter>
        );
    }
}

export default App;
