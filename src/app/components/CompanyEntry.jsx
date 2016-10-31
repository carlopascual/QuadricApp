/**********************************************************************
* CompanyEntry.jsx
***********************************************************************
*
* Description: 
*
* A single entry found on the main page.
* 
***********************************************************************
*/

import React from 'react';

import Flexbox from 'flexbox-react';
import Image from 'react-bootstrap/lib/Image';

import EllipsisText from 'react-ellipsis-text';

class CompanyEntry extends React.Component {

    /*
    *   @Override constructor(props)
    *
    *   Description: constructor
    *
    *   States:
    *   
    *   hover: is 'true' when the mouse is on the page, is 'false' otherwise
    */
    constructor(props) {
        super(props);
        this.state = {hover: false};

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
    }

    /*
    *   mouseOver()
    *
    *   Description: Sets state to 'true' on mouseOver();
    */
    mouseOver() {
        this.setState({ hover: true });
    }

    /*
    *   mouseOut()
    *
    *   Description: Sets state to 'false' on mouseOut();
    */
    mouseOut() {
        this.setState({ hover: false });
    }

    /*
    *   mouseClick()
    *
    *   Description: Call the handleCompanyEntryClickCallback.
    */
    mouseClick() {
        this.props.handleCompanyEntryClickCallback(this.props.data.name);
    }

    /*
    *   @Override render()
    *
    *   Description: render
    */
    render () {

        var hoverColor = "#FFFFFF";
        var display = "none";

        if(this.state.hover) {
            hoverColor = "#f9f9f9";
            display = "inline";
        }

        var innerDiv = {
            backgroundColor: hoverColor,
            height: "265px",
            width: "220px",
            float: "left"
        }

        var imageStyle = {
            display: "flex",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "200px",
            marginLeft: "10px",
            marginTop: "10px"
        }

        var captionStyle = {
            backgroundColor: hoverColor,
            marginLeft: "10px",
            minHeight: "45px",
            width: "200px"
        }

        var highlightToggleStyle = {
            display: display,
            float:"right"
        }

        var entry = this.props.data;

        var sectorLocationText = entry.sector + ", " + entry.location;

        return(
            <div>
                <div style={innerDiv} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.mouseClick}>
                    <div style={imageStyle}>
                        <Image src={entry.image}/>
                    </div>
                    <div style={captionStyle}>
                        <div style={{marginTop: "5px"}}>
                            <strong>{entry.name} {entry.rating}</strong><span style={highlightToggleStyle}>&#9662;</span><br></br>
                            <EllipsisText text={sectorLocationText} length={29}/>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}

CompanyEntry.propTypes = {handleCompanyEntryClickCallback: React.PropTypes.func.isRequired};

export default CompanyEntry;