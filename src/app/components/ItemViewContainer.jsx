/**********************************************************************
* ItemViewContainer.jsx
***********************************************************************
*
* Description: 
*
* Data retrieval methods for the item view are located here.
* 
***********************************************************************
*/

import React from 'react';
import $ from 'jquery';

import ItemView from './ItemView.jsx';

var data = undefined; // database variable

class ItemViewContainer extends React.Component {

	/*
	*	@Override constructor(props)
	*
	*	Description: Constructor
	*	
	*	States:
	* 
	*	companyToRender: Is null when there is no company to render; otherwise,
	*				     has the attributes for the company to be rendered.
	*
	*	comments: 		 The comments to be retrieved for the specific company
	*					 to be rendered.
	*
	*/
	constructor(props) {

		super(props);
		
		this.state={companyToRender: null};

		this.modalClosedCallback = this.modalClosedCallback.bind(this);
		this.getCompanyToView = this.getCompanyToView.bind(this);
		this.handleCommentPosted = this.handleCommentPosted.bind(this);
		this.getComments = this.getComments.bind(this);
		this.setItemViewState = this.setItemViewState.bind(this);
	}

	/*
	* 	@Override componentDidMount()
	*
	*	Description: calls an AJAX request for the company list that needs to be
	*				 rendered.
	*/
	componentDidMount() {

		self = this;

		$.ajax({
			url: "/api/companies/",
		  	type: "GET",
		  	success: function(response) {
		    	data = response; // set database to response
		  	},
		  	error: function(xhr) {
		  		throw new Error('Error querying database for companies');
		  	}
		});
	}

	/*
	* 	@Override componentWillReceiveProps(nextProps)
	*
	*	Description: Gets the next company to view from the props				
	*/
	componentWillReceiveProps(nextProps) {
		this.getCompanyToView(data, nextProps.itemToRender);
	}

	/*
	* 	getCompanyToView(Array companyEntries, String companyName)
	*
	*	Description: Gets the next company to view from the props,
	*				 calls getComments() afterwards.				
	*/
	getCompanyToView(companyEntries, companyName) {

		if(companyEntries == undefined) {
			// no databaase has been set yet, so no companies to yet
			this.setState({companyToRender: null});
			return;
		};

		// search for company
		for (var i = 0, len = companyEntries.length; i < len; i++) {
			if(companyEntries[i].name == companyName) {

				this.getComments(companyEntries[i]);
				return;
			}
		}

		this.setState({companyToRender: null});
	}

	/*
	* 	getCommments(Company companyToRender)
	*
	*	Description: Retrieves the comments from the comment database via AJAX
	*				 and calls setItemViewState() afterwards.		
	*/
	getComments(companyToRender) {

		var self = this;

		$.ajax({
			url: "/api/getcomments/" + companyToRender.name,
		  	type: "get",
		  	success: function(response) {
		  		self.setItemViewState(companyToRender,response);
		  	},
		  	error: function(xhr) {
		  		throw new Error('An error retrieving entries has occurred.');
		 	}
		});
	}

	/*
	* 	setItemViewState(Company companyToRender, Array comments)
	*
	*	Description: Sets the next itemView using companyToRender and comments.
	*/
	setItemViewState(companyToRender, comments) {
		this.setState({
			companyToRender: companyToRender,
			comments: comments
		});
	}

	/*
	* 	handleCommentPosted(String name, String comment)
	*
	*	Description: calls an AJAX request for the company list that needs to be
	*				 rendered, then pushes the new value into the current state.
	*/
	handleCommentPosted(name, comment) {

		var self = this;

		$.ajax({
			url: "/api/comment/",
		  	type: "post",
		  	data: {
		  		name: name, 
		  		comment: comment, 
		  		company: this.state.companyToRender.name
		  	},
		  	success: function(response) {

		  		//create copy of current comment state
		  		var commentArray = self.state.comments.slice();

		  		//push to top of array
    			commentArray.unshift(response);

    			//reset the state to include the new comment
    			self.setState({comments: commentArray});

		  	},
		  	error: function(xhr) {
		    	throw new Error('An error saving a comment to the database has occurred.');
		  	}
		});
	}

	/*
	* 	modalClosedCallback()
	*
	*	Description: Callback to signal that the modal has been closed.
	*/
	modalClosedCallback() {
		this.props.modalClosedCallback();
	}

	/*
	* 	@Override render()
	*
	*	Description: Render method
	*/
	render () {
		
    	return(
			<div>
				<ItemView 
					modalClosedCallback={this.modalClosedCallback} 
					companyToRender={this.state.companyToRender}
					handleCommentPosted={this.handleCommentPosted}
					comments={this.state.comments}
				/>
    		</div>
    	);
  	}
}

ItemViewContainer.propTypes = {modalClosedCallback: React.PropTypes.func.isRequired};

export default ItemViewContainer;