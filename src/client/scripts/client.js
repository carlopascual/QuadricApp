/**********************************************************************
* Client.js
***********************************************************************
*
* Description: 
*
* Renders the attatched element to DOM; included in the boilerplate
* 
***********************************************************************
*/

import App from '../../app';

var attachElement = document.getElementById('react-app');

var state = {};

var app;

app = new App({state: state});

app.renderToDOM(attachElement);