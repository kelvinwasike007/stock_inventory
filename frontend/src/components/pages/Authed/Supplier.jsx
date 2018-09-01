import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getSession } from '../../../services/AuthentiCationService';
import { getSuppliers, updateSupplier, addSupplier, deleteSupplier} from '../../../services/SupplierService';
import {toast, ToastContainer} from 'react-toastify'
class Supplier extends Component
{
    constructor()
    {
        super()
        this.state = {
            supplierData: [],
            data: {
                errorDump: "",
                errorMode: ""
            }
        }
        this.getSupplierData = this.getSupplierData.bind(this);
        this.updateSupplierInfo = this.updateSupplierInfo.bind(this);
        this.createSupplier = this.createSupplier.bind(this);
        this.deleteSupplierInfo = this.deleteSupplierInfo.bind(this);
        this.setStates = this.setStates.bind(this);
    }
    componentWillMount()
    {
        this.getSupplierData()
    }
  
    setStates(data)
    {
      this.setState(data);  
  }

    deleteSupplierInfo(row)
    {
        var creds;
        var session = getSession();
    
        creds = {
          Token: session.Token,
          user_id: session.user_id,
          organization_id: session.organization_id
        }
    
        var delete_data = {
          supplier_id: row,
          organization_id: creds.organization_id,
          Token: creds.Token,
          user_id: creds.user_id
        }
    
        deleteSupplier(delete_data).then(
          (response) => {
            var data = {
              errorDump: response.msg,
              errorMode: "alert alert-danger"
            }
    
            toast.success(data.errorDump, {position: toast.POSITION.TOP_RIGHT})
            this.getSupplierData()  
          }
          
        );
    }

    InsertHeader(onClose)
    {
        const headerStyle = {
            fontWeight: 'bold',
            fontSize: 'large',
            textAlign: 'center',
            backgroundColor: '#eeeeee'
          };
          return (
            <div className='modal-header' style={ headerStyle }>
              <h3>New Supplier</h3>
              <button className='btn btn-info' onClick={ onClose }>Exit</button>
            </div>
          );
    }
    createSupplier(row)
    {
        let newRowStr = {};
        
          for (const prop in row) {
            newRowStr[prop] = row[prop];
          }
          newRowStr = JSON.stringify(newRowStr)
          var capture_data = JSON.parse(newRowStr);
          var creds;
          var session = getSession();
      
          creds = {
            Token: session.Token,
            user_id: session.user_id,
            organization_id: session.organization_id
          }
      
          var user_data = {
            organization_id: creds.organization_id,
            user_id: creds.user_id,
            Token: creds.Token,
            supplier_id: capture_data.supplier_id,
            supplier_name: capture_data.supplier_name,
            contact: capture_data.contact
          }  
      
          
      
          addSupplier(user_data).then(
            (response) => {
              var data = {
                errorDump: response.msg,
                errorMode: "alert alert-info"
              }
      
              toast.success(data.errorDump, {position: toast.POSITION.TOP_RIGHT})
              this.getSupplierData() 
            }
          );
    }

    updateSupplierInfo(row, cellName, cellValue)
    {
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
          supplier_id: row.supplier_id,
          updateValue: cellValue,
          updateColumn:cellName,
          organization_id: creds.organization_id,
          Token: creds.Token,
          user_id: creds.user_id
        }
    
        //post Data
        updateSupplier(update_data).then(
          (response) => {
            var data = {
              errorDump: response.msg,
              errorMode: "alert alert-info"
            }
            toast.success(data.errorDump, {position: toast.POSITION.TOP_RIGHT})
            
            this.getSupplierData()   
          }
          )
    }
    render()
    {
        const options = {
            insertText: "Add Supplier",
            deleteText: "Remove Supplier(s)",
            exportCSVText: "Export Data",
            insertModalHeader: this.InsertHeader,
            afterInsertRow: this.createSupplier,
            afterDeleteRow: this.deleteSupplierInfo
        }
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        Supplier Information
                    </div>
                    <div className={this.state.data.errorMode}> {this.state.data.errorDump}</div>
                        <BootstrapTable selectRow={{mode: 'checkbox'}} cellEdit={{mode: 'click', blurTosave: true, afterSaveCell:this.updateSupplierInfo}} options={options} pagination exportCSV={true} data={this.state.supplierData} insertRow={true}  deleteRow={true} search={true} >
                        <TableHeaderColumn isKey dataField='supplier_id' >Supplier ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='supplier_name' > Supplier Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='contact'  > Supplier Contact </TableHeaderColumn>
                    </BootstrapTable> 
                    <ToastContainer /> 
                </div>
            </div> 
        )
    }
  

    getSupplierData()
    {
        var creds;
        var session = getSession();
  
        creds = {
          Token: session.Token,
          user_id: session.user_id,
          organization_id: session.organization_id
        }
  
        getSuppliers(creds).then(
          (response) =>
          {
            if(response.length === 0)
            {

            } else {
              this.setState({
              supplierData: response
            })
            }
          }  
        )
    }
}

export default Supplier;