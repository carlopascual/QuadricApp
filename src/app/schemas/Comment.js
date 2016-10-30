/**********************************************************************
* Comment.js
***********************************************************************
*
* Description: 
*
* Mongoose Schema for Comments
* 
***********************************************************************
*/

var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  company: String,
  name: String,
  comment: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);