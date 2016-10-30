/**********************************************************************
* AppRoot.jsx
***********************************************************************
*
* Description: 
*
* Routes for website
* 
***********************************************************************
*/

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import AppRoot from './components/AppRoot.jsx';

class AppRoutes extends React.Component {

  render () {

    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppRoot}>
        </Route>
      </Router>
    );
  }
}

export default AppRoutes;