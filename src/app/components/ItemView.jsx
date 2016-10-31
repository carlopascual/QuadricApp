/**********************************************************************
* ItemView.jsx
***********************************************************************
*
* Description: 
*
* Item View which contains the company information, as well as the
* CommentForm and the CommentList.
*
* Notes: 
* 
* As of Oct 30, 2016, react-bootstrap's modal does not support calling
* calling the componentWillReceivePRops() method, which is the reason
* that the CommentForm and CommentList's containers were discarded and
* data processing instead done on the ItemViewContainer.
* 
***********************************************************************
*/

import React from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';

import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';

class ItemView extends React.Component {

	/*
	*	@Override constructor(props)
	*
	*	Description: constructor
	*	
	*	States:
	* 
	*	name: 		 name retrieved from the ItemViewContainer; set to null if no company is 
	*		         being retrieved
	*
	*	rating:      rating retrieved from the ItemViewContainer; set to null if no company is
	*			     being retrieved
	*
	*	sector:      sector retrieved from the ItemViewContainer; set to null if no company is
	*			     being retrieved
	*
	*	location:    location retrieved from the ItemViewContainer; set to null if no company is
	*				 being retrieved
	*
	*	description: description retrieved from the ItemViewContainer; set to null if no company 
	*				 is being retrieved
	*
	*	image: 		 imageFileName retrieved from the ItemViewContainer; set to 'blank.png' as a
	*				 placeholder image if no company is being retrieved
	*
	*	comments: 	 comments retrieved from the ItemViewContainer; set to [] if no company is
	*				 being retrieved
	*
	*	show:      	 shows the modal; set to 'true' if visible and 'false' otherwise
	*
	*/
	constructor(props) {
		super(props);

		this.state = {
			name: null, 
			rating: null, 
			sector: null, 
			location: null, 
			description: null, 
			image: this.props.blankImage,
			comments: [],
			show: false
		};

		this.modalClosedCallback = this.modalClosedCallback.bind(this);
		this.handleCommentPostedCallback = this.handleCommentPostedCallback.bind(this);
	}

	/*
	* 	@Override componentWillReceiveProps(nextProps)
	*
	*	Description: Sets its state the values specified in the props; sets these values to
	*				 null if otherwise			
	*/
	componentWillReceiveProps(nextProps) {
	
		if(!nextProps.companyToRender) {

			this.setState({
				name: null, 
				rating: null, 
				sector: null, 
				location: null, 
				description: null, 
				image: this.props.blankImage,
				comments: [],
				show: false
			});
		}
		else {

			var companyToRender = nextProps.companyToRender;

			this.setState({
				name: companyToRender.name, 
				rating: companyToRender.rating, 
				sector: companyToRender.sector, 
				location: companyToRender.location, 
				description: companyToRender.description, 
				image: companyToRender.image,
				comments: nextProps.comments,
				show: true
			});
		}
	}

	/*
    *   modalClosedCallback()
    *
    *   Description: Callback to signal that the modal has been closed.
    */
	modalClosedCallback() {
		this.props.modalClosedCallback();
	}

	/*
    *   modalClosedCallback()
    *
    *   Description: Callback to signal that the modal has been closed.
    */
	handleCommentPostedCallback(name,comment) {
		this.props.handleCommentPosted(name,comment);
	}

	/*
	* 	@Override render()
	*
	*	Description: Render method
	*/
	render () {

		var modalStyle = {
			display: "flex",
			position: "absolute",
			justifyContent: "center",
      		alignItems: "center",
      		overflowY: "scroll"
		}

		var backdropStyle = {
			position: "fixed",
			zIndex: 'auto',
			backgroundColor: '#000',
			opacity: 0.5
		};

		var dialogStyle = {
			width: "100%",
			backgroundColor: '#FFFFFF',
			padding: "20px",

		};

		var imagePlaceHolder = {
			float: "left",
			height: "200px",
			width: "200px",
			backgroundColor: "Black"
		};

		var textPlaceHolder = {
			float: "left",
			height: "200px",
			width: "450px",
			backgroundColor: "#FFFFFF"
		}

		var imageStyle = {
			float: "left",
	     	display: "flex",
	     	backgroundColor: "#FFFFFF",
	      	justifyContent: "center",
	      	alignItems: "center",
	      	height: "200px",
	      	width: "200px",
    	}

		var containerStyle = {
			width: "100%",
			backgroundColor:"#FFFFFF"
		}

		var commentContainerStyle = {
			width: "100%",
			height: "300px",
			backgroundColor: "#FFFFFF",
			overflowY: "scroll"
		}

		var informationStyle = {
			paddingTop: "42px",
			paddingLeft: "26px"
		}

		var hasNoStateStyle = {};
		
		if(this.state.comments.length > 0) {
			hasNoStateStyle.display = "none";
		}

		var companyToRender = this.state;

		return(
			<div>
				<Modal 
					bsSize="lg" 
					aria-labelledby='modal-label' 
					style={modalStyle} 
					show={companyToRender.show} 
					onHide={this.modalClosedCallback}
				>
				<div style={dialogStyle}>
					<div className="container" style={containerStyle}>
						<div style={imageStyle}>
							<Image src={companyToRender.image}/>
						</div>
						<div style={textPlaceHolder}>
							<div style={informationStyle}> 
								<h2>{companyToRender.name} <span style={{color: "#f29011"}}>{companyToRender.rating}</span></h2>
								<h3>{companyToRender.sector}, {companyToRender.location}</h3> 
							</div>
						</div>
					</div>
					<hr></hr>
					{companyToRender.description}
					<hr></hr>
					<h4>Comments:</h4>
					<hr></hr>
					<div className="container" style={commentContainerStyle}>
						<CommentForm handleCommentPostedCallback={this.handleCommentPostedCallback}/>
						<hr></hr>
						<div style={hasNoStateStyle}> Be the first one to comment! </div>
						<CommentList comments={this.state.comments} /> 
					</div>
				</div>
				</Modal>
			</div>
		);
  	}
}

ItemView.propTypes = {modalClosedCallback: React.PropTypes.func.isRequired};

export default ItemView;