/**********************************************************************
* CompanyList.jsx
***********************************************************************
*
* Description: 
*
* Maps each of the entries passed to a CompanyEntry.
* 
***********************************************************************
*/

import React from 'react';
import CompanyEntry from './CompanyEntry.jsx';

class CompanyList extends React.Component {

    /*
    *   @Override constructor(props)
    *   
    *   Description: Constructor
    */
    constructor(props) {
        super(props);

        this.handleCompanyEntryClickCallback = this.handleCompanyEntryClickCallback.bind(this);
    }

    /*
    *   handleCompanyClickCallback(id) 
    *
    *   Description: Callback to handle the Company Entry being clicked.
    */
    handleCompanyEntryClickCallback(id) {
        this.props.handleCompanyEntryClickCallback(id);
    }

    /*
    *   @Override render()
    *
    *   Description: Render method
    */
    render () {
        return(
          <div>
            {
              this.props.companies.map((data,i) => 
                <CompanyEntry key ={i} data={data} 
                  handleCompanyEntryClickCallback={this.handleCompanyEntryClickCallback}/>)
            }
          </div>
        );
    }
}

CompanyList.propTypes = {handleCompanyEntryClickCallback: React.PropTypes.func.isRequired};

export default CompanyList;