# QuadricApp
A sample application created with React.js + Koa + MongoDB for an application for an internship at [Quadric](http://quadric.net/).

Uses a wonderful boilerplate created by wwsun, with a few extra things added. Check it out [here](https://github.com/wwsun/starter-node-react)! 

## Features
* Company list: based on the design specified
* A modal which, on click, displays further information about the company
* A simple, interactive comments section

## Running

### Setting up the database
This application uses a database named *quadric* via mongoDB so we'll have to set it up first. [Here is a tutorial on how to import json files into mongoDB.](https://docs.mongodb.com/getting-started/shell/import-data/) A json file as well as a readme for the sample setup can be found at *src/app/resources/json/*.

Note that you'll need to include the --jsonArray flag for our particular json file. A sample import statement with the proper attributes can also be found in the same folder.

Additional entries can be added into the database, and its icons should be stored inside the *src/app/resources/img* folder.

### Install dependencies
    npm install
    
### Build
    npm run build
    
### Start
    npm start
(Make sure your database is running!!)
### View

Open your browser, and visit `http://localhost:3000` for the results.