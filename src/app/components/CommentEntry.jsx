/**********************************************************************
* CommentEntry.jsx
***********************************************************************
*
* Description: 
*
* An entry for a comment.
* 
***********************************************************************
*/

import React from 'react';

class CommentEntry extends React.Component {

    /*
    *   @Override render()
    *
    *   Description: Render method
    */
    render () {

        return(
            <div>
          	     <p>On {new Date(this.props.data.date).toDateString()}, <b>{this.props.data.name}</b> said: </p>
                 <p>{this.props.data.comment}</p>
          	     <hr></hr>
            </div>
        );
    }
}

export default CommentEntry;