/**********************************************************************
* CommentForm.jsx
***********************************************************************
*
* Description: 
*
* Form to submit a comment. Does not accept blank entries.
* 
***********************************************************************
*/

import React from 'react';

import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';


class CommentForm extends React.Component {

  /*
  * @Override constructor(props)
  *
  * Description: constructor
  */
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  * handleSubmit(event);
  *
  * Description: Processes the author and text values of the event
  *              and ensures that they are not left blank. Posts valid
  *              output via callback and clears the values on the form.
  */
  handleSubmit(event) {

    event.preventDefault(); //stops the page from refreshing

    var authorValue = event.target[0].value.trim();
    var textValue = event.target[1].value.trim();

    if(!authorValue || !textValue) return; // do nothing if any field is empty
    
    event.target[0].value = '';
    event.target[1].value = '';

    // push to the container to do our updates
    this.props.handleCommentPostedCallback(authorValue,textValue);
  }

  /*
  *   @Override render()
  *
  * Description: Render method
  */
  render () {

    var marginTopStyle = {
      marginTop : "10px"
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
            <FormGroup role="form">
              <ControlLabel>Name:</ControlLabel>
              <FormControl type="text" label="text" placeholder="Enter name"/>
              <ControlLabel style={marginTopStyle}>Comment:</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Enter comment"/>
              <Button type="submit" value="Post" style={marginTopStyle}> Submit </Button>
            </FormGroup>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {handleCommentPostedCallback: React.PropTypes.func.isRequired};

export default CommentForm;