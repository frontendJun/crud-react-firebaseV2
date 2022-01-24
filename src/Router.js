import React from 'react';
import App from './App';
import NotFound from './NotFound';
import Editors from './Editor'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/news/:tareaId' component={Editors} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;