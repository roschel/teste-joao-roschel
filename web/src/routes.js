import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login';
import Main from './Main';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
        </Switch>
    </BrowserRouter>
)

export default Routes;