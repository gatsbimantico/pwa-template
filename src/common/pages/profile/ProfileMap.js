import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default ({}) => (
  <Switch>
    <Route exact path="/u" render={() => (<div>User Profile</div>)} />
    <Route render={() => (<div>Not Found</div>)} />
  </Switch>
);
