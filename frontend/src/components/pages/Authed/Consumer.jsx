import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {toast, ToastContainer} from 'react-toastify'

class Consumer extends Component
{
    render()
    {
        const options = {
            insertText: "Add Consumer",
            deleteText: "Delete Consumer"
        }
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        <h1>Manage Consumer List</h1>
                    </div>
                    <BootstrapTable cellEdit={{mode:'click', blurToSave:true, }}  striped hover insertRow={true} options={options} exportCSV={true} selectRow={{ mode: 'checkbox' }} deleteRow={true} search={true}  pagination>
      <TableHeaderColumn isKey dataField='stock_group_id'>Consumer ID</TableHeaderColumn>
      <TableHeaderColumn dataField='stock_name' >Consumer Name</TableHeaderColumn>
            
  </BootstrapTable>

  <ToastContainer />
                </div>
            </div>
        )
    }
}

export default Consumer;