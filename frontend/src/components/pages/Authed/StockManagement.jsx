import React, { Component } from 'react';
import AddStock from '../../forms/AddStock';
import StockTable from '../../tables/StockTable';
import { getStocks } from '../../../services/StockService';
import { getSession } from '../../../services/AuthentiCationService';
class StockManagement extends Component
{
  constructor() {
    super()
    this.state = {
      stockData: []
    }
    this.getStock = this.getStock.bind(this);
  }

  componentWillMount()
  {
    this.getStock();
  }
    render()
    {
        return (
            <div className="main-app" >
                <div className="container">
                    <div className="breadcrumb bg-light">Stock Inventory / StockManagement</div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Add Stock Detail
</button>


<div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog " role="document">
    <div className="modal-content bg-warning">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add New Stock Detail</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
                      <AddStock />
      </div>
    </div>
  </div>
</div>    
<hr/>
<StockTable stock_data={this.state.stockData} />              
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
          this.setState({
            stockData: response
          })

          console.log(this.state.stockData)
        }  
      )
  }
}

export default StockManagement;