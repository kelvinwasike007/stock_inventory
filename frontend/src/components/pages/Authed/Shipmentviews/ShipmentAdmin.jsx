import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getShipments } from '../../../../services/ShipmentService';
import { getSession } from '../../../../services/AuthentiCationService';

class ShipmentAdmin extends Component
{
    constructor()
    {
        super()
        this.state = {
            manifestData: []
        }

        this.getManifestData = this.getManifestData.bind(this);
        this.setStates = this.setStates.bind(this);
    }

    componentWillMount()
    {
        this.getManifestData();
    }

    setStates(data)
    {
        this.setState({data})
    }
    render()
    {
        const options = {
            exportCSVText: 'Export Data'
        }
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        Shipment Manifest
                    </div>
                    <BootstrapTable selectRow={{mode: 'checkbox'}} cellEdit={{mode: 'click', blurTosave: true, afterSaveCell:this.updateAccount}} data={this.state.manifestData} options={options} pagination exportCSV={true} search={true} >
                        <TableHeaderColumn isKey dataField='stock_group_id' >Stock Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='Amount' > Amount </TableHeaderColumn>
                        <TableHeaderColumn dataField='Units' > Units </TableHeaderColumn>
                        <TableHeaderColumn dataField='Cost' > Cost </TableHeaderColumn>
                        <TableHeaderColumn dataField='date_of_shipment' > Date Of Shipment </TableHeaderColumn>
                    </BootstrapTable>  
                </div>
            </div>
        )
    }

    getManifestData()
    {
        var creds;
        var session = getSession();
  
        creds = {
          Token: session.Token,
          user_id: session.user_id,
          organization_id: session.organization_id
        }
  
        getShipments(creds).then(
          (response) =>
          {
            if(response.length === 0)
            {

            } else {
                this.setState({
            manifestData: response
          });
            }
          }  
        )
    }
}

export default ShipmentAdmin;