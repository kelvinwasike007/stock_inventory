import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {toast, ToastContainer} from 'react-toastify'
class ShipmentMember extends Component
{
    render()
    {
        const options = {
            insertText: "Add Shipment Log",
            deleteText: "Delete Shipment Log"
        }
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        <h1>Manage Shipments</h1>
                    </div>
                 
<BootstrapTable cellEdit={{mode:'click', blurToSave:true, }}  striped hover insertRow={true} options={options} exportCSV={true} selectRow={{ mode: 'checkbox' }} deleteRow={true} search={true}  pagination>
      <TableHeaderColumn isKey dataField='stock_group_id'>Stock Group ID</TableHeaderColumn>
      <TableHeaderColumn dataField='stock_name' >Amount</TableHeaderColumn>
      <TableHeaderColumn dataField='stock_name' >Units</TableHeaderColumn>
      <TableHeaderColumn dataField='stock_name' >Cost</TableHeaderColumn>        
      <TableHeaderColumn dataField='stock_name' >Date Of Shipment</TableHeaderColumn>                  
            
  </BootstrapTable>

  <ToastContainer />
                </div>
            </div>
        )
    }
}

export default ShipmentMember;