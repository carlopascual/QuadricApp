/**********************************************************************
* CommentList.jsx
***********************************************************************
*
* Description: 
*
* Maps each of the entries passed to a CommentEntry.
* 
***********************************************************************
*/

import React from 'react';

import CommentEntry from './CommentEntry.jsx';

class CommentList extends React.Component {

    /*
    *   @Override render()
    *
    *   Description: Render method
    */
    render () {
        return(
            <div>
            {
                this.props.comments.map((data,i) => 
                <CommentEntry key ={i} data={data}/>)
            }
            </div>
        );
    }
}

export default CommentList;