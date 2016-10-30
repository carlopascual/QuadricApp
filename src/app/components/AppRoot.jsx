/**********************************************************************
* AppRoot.jsx
***********************************************************************
*
* Description: 
*
* Root of Application, handles the main part of the website. 
* 
***********************************************************************
*/

import React from 'react';
import {Link} from 'react-router';
import Flexbox from 'flexbox-react';

import CompanyListContainer from './CompanyListContainer.jsx';
import ItemViewContainer from './ItemViewContainer.jsx'

import config from '../../../config/app';

class AppRoot extends React.Component {

    /*
    *   @Override constructor(props)
    *
    *   Description: constructor
    * 
    *   States:
    * 
    *   companyToRender: Is null when there is no company to render; otherwise,
    *                    has the attributes for the company to be rendered.
    */
    constructor(props) {

        super(props);

        this.state = { companyToRender : null };

        this.handleCompanyEntryClickCallback = this.handleCompanyEntryClickCallback.bind(this);
        this.modalClosedCallback = this.modalClosedCallback.bind(this);
    }

    /*
    *   handleCompanyEntryClickCallback(String id)
    *
    *   Description: Sets state to id retrieved from the CompanyListContainer.
    */
    handleCompanyEntryClickCallback(id) {
        this.setState({companyToRender : id});
    }

    /*
    *   modalClosedCallback()
    *
    *   Description: Set the companyToRender to null when the modal is closed.
    */
    modalClosedCallback() {
        this.setState({companyToRender : null});
    }

    /*
    *   @Override render()
    *
    *   Description: Render method
    */
    render() {

        var pageStyle = {
            paddingTop: "100px",
            paddingBottom: "100px",
            backgroundColor: "#f9f9f9"
        };
    
        var companyListContainerStyle = {
            backgroundColor: "#FFFFFF",
            width: "88%",
            maxWidth: "910px",
            paddingTop:"10px",
            paddingBottom:"10px"
        }

        return (
            <div style={pageStyle}>

                <div className="container" style={companyListContainerStyle}>
                    <CompanyListContainer handleCompanyEntryClickCallback={this.handleCompanyEntryClickCallback}/>
                </div>

                <ItemViewContainer 
                    itemToRender={this.state.companyToRender} 
                    modalClosedCallback={this.modalClosedCallback}
                /> 
    
                {this.props.children}

            </div>
        );
    }
}

export default AppRoot;