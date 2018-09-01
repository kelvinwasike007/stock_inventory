import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getStocks, addStock, updateStock, deleteStock } from '../../../services/StockService';
import { getSession } from '../../../services/AuthentiCationService';
import {toast, ToastContainer} from 'react-toastify'

const return_type = ['True', 'False']

class StockManagement extends Component
{
  constructor() {
    super()
    this.state = {
      stockData: [],
     data:  {errorDump: "",
      errorMode:""}
    }
    this.getStock = this.getStock.bind(this);
    this.setStates = this.setStates.bind(this);
    this.onAfterInsertRow = this.onAfterInsertRow.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
  }

  componentWillMount()
  {
    this.getStock();
  }

  onAfterSaveCell(row, cellName, cellValue) {
    let rowStr = {};
    for (const prop in row) {
      rowStr[prop] = row[prop]
    }

    var creds;
    var session = getSession();

    creds = {
      Token: session.Token,
      user_id: session.user_id,
      organization_id: session.organization_id
    }

    var update_data = {}
    update_data = {
      stock_group_id: row.stock_group_id,
      updateColumn: cellName,
      updateValue: cellValue,
      organization_id: creds.organization_id,
      Token: creds.Token,
      user_id: creds.user_id
    }

    //post Data
    updateStock(update_data).then(
      (response) => {
        var data = {
          errorDump: response.msg,
          errorMode: "alert alert-info"
        }
        toast.warn(data.errorDump, {position: toast.POSITION.TOP_RIGHT})
        this.getStock()
      }
      )

  }
  
  onAfterInsertRow(row) {
    let newRowStr = {};
  
    for (const prop in row) {
      newRowStr[prop] = row[prop];
    }
    newRowStr = JSON.stringify(newRowStr)
    var stock_data = JSON.parse(newRowStr);
    var creds;
    var session = getSession();

    creds = {
      Token: session.Token,
      user_id: session.user_id,
      organization_id: session.organization_id
    }

    var stock_info = {
      organization_id: creds.organization_id,
      user_id: creds.user_id,
      Token: creds.Token,
      stock_group_id: stock_data.stock_group_id,
      stock_name: stock_data.stock_name,
      stock_description: stock_data.stock_description,
      return_status: stock_data.return_status
    }  

    

    addStock(stock_info).then(
      (response) => {
        var data = {
          errorDump: response.msg,
          errorMode: "alert alert-info"
        }

        toast.warn(data.errorDump, {position: toast.POSITION.TOP_RIGHT})
        this.getStock()
      }
    );


  }

  setStates(data)
  {
    this.setState({ data }) 
    this.getStock()
  }
  
  Validate(value, row)
  {
    const response = { isValid: false, notification: { type: 'success', msg: '', title:'' } }
    if (!value)
    {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'please fill in all fields'
      response.notification.title = 'Input Error'
    } else {
      response.isValid = true
    }
  
    return response;
  }

  deleteStock(row) {
    var creds;
    var session = getSession();

    creds = {
      Token: session.Token,
      user_id: session.user_id,
      organization_id: session.organization_id
    }

    var delete_data = {
      stock_ids: row,
      organization_id: creds.organization_id,
      Token: creds.Token,
      user_id: creds.user_id
    }

    deleteStock(delete_data).then(
      (response) => {
        var data = {
          errorDump: response.msg,
          errorMode: "alert alert-danger"
        }

        toast.warn(data.errorDump, {position: toast.POSITION.TOP_RIGHT})
        this.getStock()
      }
      
    );
}

  createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      fontWeight: 'bold',
      fontSize: 'large',
      textAlign: 'center',
      backgroundColor: '#eeeeee'
    };
    return (
      <div className='modal-header' style={ headerStyle }>
        <h3>Add New Stock</h3>
        <button className='btn btn-info' onClick={ onClose }>Exit</button>
      </div>
    );
}
    render()
    {
      const options = {
        afterInsertRow: this.onAfterInsertRow ,  // A hook for after insert rows
        insertModalHeader: this.createCustomModalHeader,
        insertText: 'New Stock',
        exportCSVText: 'Export Records',
        deleteText: 'Delete Stocks',
        afterDeleteRow: this.deleteStock
      };
      
        return (
            <div className="main-app" >
            <div className="container">
              <div className="breadcrumb">Manage Stocks</div>
              <div className={this.state.data.errorMode}> {this.state.data.errorDump}</div>
              <BootstrapTable cellEdit={{mode:'click', blurToSave:true, afterSaveCell:this.onAfterSaveCell}} data={this.state.stockData} striped hover insertRow={true} exportCSV={true} selectRow={{ mode: 'checkbox' }} deleteRow={true} search={true} options={options} pagination>
      <TableHeaderColumn isKey dataField='stock_group_id'>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='stock_name' editable={{validator:this.Validate}} >Stock Name</TableHeaderColumn>
      <TableHeaderColumn dataField='stock_description' editable={{validator:this.Validate, type: 'textarea'}}>Stock Description</TableHeaderColumn>          
      <TableHeaderColumn dataField='return_status' editable={{validator:this.Validate,type: 'select', options: {values: return_type}}}>Retutn Status</TableHeaderColumn>          
  </BootstrapTable>

  <ToastContainer />
            </div>
                          
            </div>
        )
    }
  
  
    getStock()
    {
      var creds;
      var session = getSession();

      creds = {
        Token: session.Token,
        user_id: session.user_id,
        organization_id: session.organization_id
      }

      getStocks(creds).then(
        (response) =>
        {
          if(response.length === 0)
          {
            
          } else {
            this.setState({
            stockData: response
          })
          }
        }  
      )
  }
}

export default StockManagement;