/**********************************************************************
* Company.js
***********************************************************************
*
* Description: 
*
* Mongoose Schema for Company
* 
***********************************************************************
*/

var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
	order: Number,
  	name: String,
  	image: String,
  	rating: Number,
  	sector: String,
  	location: String,
  	description: String
});

module.exports = mongoose.model('Company', companySchema);