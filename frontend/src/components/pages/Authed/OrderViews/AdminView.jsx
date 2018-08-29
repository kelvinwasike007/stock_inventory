import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class AdminView extends Component
{
    render()
    {
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        Order Requests
                    </div>

                    <BootstrapTable selectRow={{mode: 'checkbox'}} cellEdit={{mode: 'click', blurTosave: true, }}  pagination exportCSV={true}  search={true} >
                    <TableHeaderColumn isKey dataField='user_id' >Order ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='username'>Stock Name </TableHeaderColumn>
                     
                    <TableHeaderColumn dataField='username' >Order Description </TableHeaderColumn>
                    
                    <TableHeaderColumn dataField='username'> Requests </TableHeaderColumn>    
                    <TableHeaderColumn dataField='ac_type' editable={{ type: 'select' }} > Approve </TableHeaderColumn>
                    </BootstrapTable>
                    
                </div>
            </div>
        )
    }
}

export default AdminView;