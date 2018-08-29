import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getUsers, Validate, addUser, updateUser, deleteUserAccount } from '../../../services/manageUsersService';
import { getSession } from '../../../services/AuthentiCationService';
const accounts = ['admin', 'member'];

class manageUsers extends Component
{
    
    constructor() {
        super();
        this.state = {
            usersData: [],
            data:  {errorDump: "",
            errorMode:""}
        }
        this.InsertHeader = this.InsertHeader.bind(this);
        this.getAccounts = this.getAccounts.bind(this);
        this.createUser = this.createUser.bind(this);
        this.setStates = this.setStates.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
    }
    componentWillMount()
    {
        this.getAccounts()
    }

    setStates(data)
    {
      this.setState({ data }) 
      this.getAccounts()
    }
  
    deleteUser(row) {
      var creds;
      var session = getSession();
  
      creds = {
        Token: session.Token,
        user_id: session.user_id,
        organization_id: session.organization_id
      }
  
      var delete_data = {
        _user_id: row,
        organization_id: creds.organization_id,
        Token: creds.Token,
        user_id: creds.user_id
      }
  
      deleteUserAccount(delete_data).then(
        (response) => {
          var data = {
            errorDump: response.msg,
            errorMode: "alert alert-danger"
          }
  
          this.setStates(data)
        }
        
      );
  }

    updateAccount(row, cellName, cellValue)
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
          _user_id: row.user_id,
          username: cellValue,
          organization_id: creds.organization_id,
          Token: creds.Token,
          user_id: creds.user_id
        }
    
        //post Data
        updateUser(update_data).then(
          (response) => {
            var data = {
              errorDump: response.msg,
              errorMode: "alert alert-info"
            }
    
            this.setStates(data)
          }
          )
    }

    createUser(row)
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
            username: capture_data.username,
            ac_type: capture_data.ac_type
          }  
      
          
      
          addUser(user_data).then(
            (response) => {
              var data = {
                errorDump: response.msg,
                errorMode: "alert alert-info"
              }
      
              this.setStates(data)
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
              <h3>New Account</h3>
              <button className='btn btn-info' onClick={ onClose }>Exit</button>
            </div>
          );
    }
    render()
    {
        const options = {
            exportCSVText: 'Export Records',
            deleteText: 'Delete Accounts',
            insertText: 'New Account',
            insertModalHeader: this.InsertHeader,
            afterInsertRow: this.createUser,
            afterDeleteRow: this.deleteUser
        }
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">Stock Inventory / Manage Users</div>
                    <div className={this.state.data.errorMode}> {this.state.data.errorDump}</div>
                    <BootstrapTable selectRow={{mode: 'checkbox'}} cellEdit={{mode: 'click', blurTosave: true, afterSaveCell:this.updateAccount}} options={options} pagination exportCSV={true} data={this.state.usersData} insertRow={true}  deleteRow={true} search={true} >
                        <TableHeaderColumn isKey dataField='user_id' >User ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='username' editable={{validator: Validate}}> Username </TableHeaderColumn>
                        <TableHeaderColumn dataField='ac_type' editable={{type: 'select', options:{values: accounts}}} > Account Type </TableHeaderColumn>
                    </BootstrapTable>    
                </div>
            </div>
        )
    }
    getAccounts()
    {
      var creds;
      var session = getSession();

      creds = {
        Token: session.Token,
        user_id: session.user_id,
        organization_id: session.organization_id
      }

      getUsers(creds).then(
        (response) =>
        {
          this.setState({
            usersData: response
          })
        }  
      )
  }
}

export default manageUsers;