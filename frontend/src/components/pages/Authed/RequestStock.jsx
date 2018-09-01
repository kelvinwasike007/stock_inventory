import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { toast, ToastContainer } from 'react-toastify'

class RequestStock extends Component
{
    render()
    {
        const options = {
            insertText: "New Requset",
            deleteText: "Drop Request"
        }
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        <h1>RequestStock</h1>
                    </div>
                   

<BootstrapTable cellEdit={{mode:'click', blurToSave:true, }}  striped hover insertRow={true} options={options} exportCSV={true} selectRow={{ mode: 'checkbox' }} deleteRow={true} search={true}  pagination>
<TableHeaderColumn isKey dataField='order_id' >Order ID</TableHeaderColumn>
<TableHeaderColumn dataField='stock_group_id'>Stock Name </TableHeaderColumn>
 
<TableHeaderColumn dataField='notes' >Order Description </TableHeaderColumn>

<TableHeaderColumn dataField='request_date'>Date Of Requests </TableHeaderColumn>    
<TableHeaderColumn dataField='approval_status' > Approve </TableHeaderColumn>
</BootstrapTable>

  <ToastContainer />
                </div>
            </div>
        )
    }
}

export default RequestStock;