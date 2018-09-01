import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getOrderRequest, updateApprovalStatus } from '../../../../services/OrdersService';
import { getSession } from '../../../../services/AuthentiCationService';
const status = ["pending", "approve", "revoked"];
class AdminView extends Component
{
    constructor()
    {
        super()
        this.state = {
            requestData: [],
            data: {
                errorDump: "",
                errorMode: ""
            }
        }

        this.getRequestData = this.getRequestData.bind(this);
        this.setStates = this.setStates.bind(this);
    }

    componentWillMount()
    {
        this.getRequestData()
    }

    updateRequestApproval(row, cellName, cellValue)
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
          order_id: row.order_id,
          updateValue: cellValue,
          updateColumn: cellName,
          organization_id: creds.organization_id,
          Token: creds.Token,
          user_id: creds.user_id
        }
    
        //post Data
        updateApprovalStatus(update_data).then(
          (response) => {
            var data = {
              errorDump: response.msg,
              errorMode: "alert alert-info"
            }
    
            this.setState(data)
          }
          )
    }

    setStates(data)
    {
        this.setState({ data }) 
    }
    render()
    {
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        Order Requests
                    </div>
                    <div className={this.state.data.errorMode}> {this.state.data.errorDump}</div>

                    <BootstrapTable  cellEdit={{mode: 'click', blurTosave: true, afterSaveCell:this.updateRequestApproval }} data={this.state.requestData}  pagination exportCSV={true}  search={true} >
                    <TableHeaderColumn isKey dataField='order_id' >Order ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='stock_group_id'>Stock Name </TableHeaderColumn>
                     
                    <TableHeaderColumn dataField='notes' >Order Description </TableHeaderColumn>
                    
                    <TableHeaderColumn dataField='request_date'>Date Of Requests </TableHeaderColumn>    
                    <TableHeaderColumn dataField='approval_status' editable={{ type: 'select', options:{values: status}}} > Approve </TableHeaderColumn>
                    </BootstrapTable>
                    
                </div>
            </div>
        )
    }

    getRequestData()
    {
        var creds;
        var session = getSession();
  
        creds = {
          Token: session.Token,
          user_id: session.user_id,
          organization_id: session.organization_id
        }
  
        getOrderRequest(creds).then(
          (response) =>
          {
            if(response.length === 0)
            {

            } else {
                this.setState({
                requestData: response
            })
            }
          }  
        )
    }
}

export default AdminView;