import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Profile from './pages/Profile';
import Logon from './pages/Logon';
import Register from './pages/Register';
import NewIncidents from './pages/NewIncidents';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncidents} />
            </Switch>
        </BrowserRouter>
    );
}