import React, { Component } from 'react';
import EditStock from '../forms/EditStock';
class StockTable extends Component
{
    render()
    {
        const { stock_data } = this.props;
        return (
            <div>
                <h4>List Of Stocks</h4>    
                <table id="dataTable" className="display table table-bordered">
  
                <thead>
                        <tr>
                        <th >Stock Id</th>
                        <th>Stock Name</th>
                        <th>Stock Description</th>
                        <th>Options</th>    
                        </tr>
                    </thead>
                <tbody>
                        {
                            stock_data.map((stock_detail) => 
                                <tr key={stock_detail.stock_group_id}>
                                    <td> {stock_detail.stock_group_id} </td>
                                    <td> {stock_detail.stock_name} </td>
                                    <td> {stock_detail.stock_description} </td>
                                    <td><button className="btn btn-info btn-sm" data-toggle="modal" data-target={"#" + stock_detail.stock_group_id}> <span className="icon-pencil"></span> Edit</button> <button className="btn btn-danger btn-sm"> <span className="icon-trash"></span> Delete</button></td>
                                    <EditStock stock_details={stock_detail} />
                                    </tr>
                            )
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>

</div>
            
        )
    }
}

export default StockTable;