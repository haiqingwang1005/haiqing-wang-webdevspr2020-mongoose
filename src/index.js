import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Switch,
    Route, Redirect
} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducers";
import thunkMiddleware from 'redux-thunk';
import EditPage from "./pages/editPage";
import ShortenPage from "./pages/shortenPage";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/shorten" component={ShortenPage}/>
                <Route path="/tiny/:shortenKey/:edit" component={EditPage}/>
                <Redirect exact from="/" to="shorten"/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

/*
<Route path="/edit" component={EditPage}/>
 */