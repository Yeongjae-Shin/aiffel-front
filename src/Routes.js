import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthCheck from './lib/hoc/AuthCheck';

import Login from './components/login/Login';
import Forum from './components/forum/forum';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';

import dotenv from 'dotenv';

const Routes = () => {
  dotenv.config();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forum" component={AuthCheck(Forum, true)} />
        <Route exact path="/forum/:id" component={AuthCheck(Post, true)} />
        <Route exact path="/profile" component={AuthCheck(Profile, true)} />
      </Switch>
    </Router>
  );
};

export default Routes;
