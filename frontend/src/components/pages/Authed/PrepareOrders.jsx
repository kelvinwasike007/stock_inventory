import React, { Component } from 'react';

class PrepareOrders extends Component
{
    render()
    {
        return (
            <div className="main-app">
                <div className="container">
                    <div className="breadcrumb">
                        <h1>Prepare Orders</h1>
                    </div>
                    <h3>List Of Orders</h3>
                    <table className="table table-bordered">
                        <thead>
                            <th>Orders By Date</th>
                            <th>Actions</th>
                        </thead>

                        <tbody>
                            <tr>
                                <td>No Orders Requested</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PrepareOrders;