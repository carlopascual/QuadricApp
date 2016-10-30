/**********************************************************************
* CompanyListContainer.jsx
***********************************************************************
*
* Description: 
*
*  Data retrieval methods for the CompanyList are located here.
* 
***********************************************************************
*/

import React from 'react';
import CompanyList from './CompanyList.jsx';
import $ from 'jquery';

class CompanyListContainer extends React.Component {

	/*
	* 	@Override constructor(props)
	*	
	*	Description: Constructor
	*
	*	States:
	*
	*	retrievedEntries: Is null when there is no company to render; otherwise
	*					  has the attributes for the company to be rendered.
	*/
	constructor(props) {
		super(props);
		this.state = ({ retrievedEntries: null });

		this.handleCompanyEntryClickCallback = this.handleCompanyEntryClickCallback.bind(this);
	}

	/*
    *   @Override componentDidMount()
    *
    *   Description: Retrieves the companies via AJAX.
    */
	componentDidMount() {

		var self = this;

		$.ajax({
			url: "/api/companies/",
			type: "get",
			success: function(response) {
				self.setState({retrievedEntries: response});
		  	},
		  	error: function(xhr) {
		    	throw new Error('An error retrieving entries has occurred.');
		  	}
		});
	}

	/*
	*	handleCompanyClickCallback(id) 
	*
	*	Description: Callback to handle the Company Entry being clicked.
	*/
	handleCompanyEntryClickCallback(id) {
		this.props.handleCompanyEntryClickCallback(id);
	}

	/*
	* 	@Override render()
	*
	*	Description: Render method
	*/
	render () {
		
    	if(!this.state.retrievedEntries) {
    		return<div></div>;
    	}

    	return <div><CompanyList companies={this.state.retrievedEntries} handleCompanyEntryClickCallback={this.handleCompanyEntryClickCallback}/></div>;
  	}
}

CompanyListContainer.propTypes = {handleCompanyEntryClickCallback: React.PropTypes.func.isRequired};

export default CompanyListContainer;