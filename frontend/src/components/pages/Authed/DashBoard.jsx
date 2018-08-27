import React, { Component } from 'react';

class DashBoard extends Component
{
    render()
    {
        return (
            <div className="main-app">
                <div className="container">
                <div className="breadcrumb"> Stock Inventory / Dashboard</div>    
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card bg-info">
                                <div className="row">
                                    <div className="col-md-6 text-center"><br/>
                                        <div className="ico icon-tags icon-4x"></div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Available Stock</h4>
                                        <p>13</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>    
                        <div className="col-md-4">
                            <div className="card bg-success">
                                <div className="row">
                                    <div className="col-md-6 text-center"><br/>
                                        <div className="ico icon-shopping-cart icon-4x"></div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Active Stock Requests</h4>
                                        <p>0</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>    
                        <div className="col-md-4">
                            <div className="card bg-danger">
                                <div className="row">
                                    <div className="col-md-6 text-center"><br/>
                                        <div className="ico icon-ticket icon-4x"></div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Pending Returns</h4>
                                        <p>6</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>    
                </div>
                </div>
                </div>    
        )
    }
}

export default DashBoard;