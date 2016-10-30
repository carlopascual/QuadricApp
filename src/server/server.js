/**********************************************************************
* server.js
***********************************************************************
*
* Description: 
*
* Handles routhing
* 
***********************************************************************
*/

'use strict';

import path from 'path';
import koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import route from 'koa-router';
import render from './lib/render';

import Company from '../app/schemas/Company.js';
import Comment from '../app/schemas/Comment.js';

import mongoose from 'mongoose';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

var app = koa();
app.use(bodyParser());

var router = route();

// mongoose.promise = global.Promises; // stop warnings from depreciated promisses from occurring
mongoose.connect('mongodb://localhost/quadric');

app.use(logger());


// Routes

// [GET]: Retrieve Home
router.get('/',home);

function *home() {
  this.body = yield render('home', {name: 'weiwei sun'});
}

// [GET]: Retrieve List of Companies

router.get('/api/companies', getCompanyList);

function *getCompanyList() {

	var self = this;

	// retrieves the companies in ascending order
	yield Company.find({}).sort({order:"asc"}).then(function(response) { 

		var companies = response; 
		self.body = companies; 
	});
}

// Comments

// [POST]: Posts comment 
router.post('/api/comment', postComment);

function *postComment() {

	var self = this;

	var response = this.request.body;

	var comment = new Comment(
		{
			name: response.name, 
			comment: response.comment,
			company: response.company
		});

	yield comment.save(function(err,comment) {
		if(err) console.error("an error saving the comment has occurred");

		self.body = {
			name: comment.name, 
			comment: comment.comment, 
			company: comment.company, 
			date: comment.date
		};
	});
}

// [GET]: Get list of comments to render
router.get('/api/getcomments/:id', test);

function *test() {

	var self = this;

	var response = this.params.id;

	// retrieves the comments sorted chronologically [earlier is first]
	yield Comment.find({company: response}).sort({date:"desc"}).then(function(response) { 

		var comments = response; 
		self.body = comments;
	});
}

app.use(router.routes());

// Serve static files
app.use(serve(path.join(__dirname, '../../dist')));

if (module.parent) {
  app.listen(3000);
  console.log('listening on port 3000...');
}