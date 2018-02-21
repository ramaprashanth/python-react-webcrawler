import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Main from '../components/Main'
import Home from '../components/Home/Home'
import PageOne from '../components/PageOne'

import FormContainer from '../containers/Form/FormContainer'
import ResultsContainer from '../containers/Results/ResultsContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/pageone' component={PageOne}/>
      <Route path='/form' component={FormContainer}/>
      <Route path='/results' component={ResultsContainer}/>
    </Route>
  </Router>
);

export default routes
