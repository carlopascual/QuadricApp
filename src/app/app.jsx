/**********************************************************************
* App.jsx
***********************************************************************
*
* Description: 
*
* Runs the project; provided in the boilerplate
* 
***********************************************************************
*/

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import AppRoutes from './appRoutes.jsx';

class App {

  constructor(options) {
    this.state = options.state;
  }

  render (element) {
    var appRootElement = React.createElement(AppRoutes, {
      state: this.state
    });

    if (element) {
      ReactDOM.render(appRootElement, element);
      return;
    }

    return ReactDOMServer.renderToString(appRootElement);
  }

  renderToDOM(element) {
    if (!element) {
      throw new Error('App.renderToDOM: element is required!');
    }
    this.render(element);
  }

  renderToString() {
    return this.render();
  }

}

export default App;