import React, { Component } from 'react';
import { getAccountType, getSession } from '../../../services/AuthentiCationService';
///import { ToastContainer, toast } from 'react-toastify';
import { getDashboardWidgets } from '../../../services/DashboardService';

import 'react-toastify/dist/ReactToastify.css';
class DashBoard extends Component
{
    constructor()
    {
        super();
        this.state = {
            widget: {
                stock: "N/A",
                products: "N/A",
                requests: "N/A",
                returns: "N/A"
            }
        }
        this.getDashboardData = this.getDashboardData.bind(this);
    }
    componentWillMount()
    {
        this.getDashboardData()
    }
    render()
    {
        if (getAccountType() === "admin")
        {
            return (
                <div className="main-app">
                    <div className="container">
                    <div className="breadcrumb"> <h3>Administrator Dashboard</h3> </div>    
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card bg-info">
                                    <div className="row">
                                        <div className="col-md-6 text-center"><br/>
                                            <div className="ico icon-tags icon-4x"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Available Stock : <b>{this.state.widget.stock}</b> </h6>
                                            <h6>Available Products:<b> {this.state.widget.products} </b></h6>
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
                                            <h5>Pending Stock Requests: <b>{this.state.widget.requests}</b></h5>
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
                                            <h5>Pending Stock Returns : <b>{this.state.widget.returns}</b></h5>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>    
                        </div>
                        <hr />
                <h4>Reports</h4>        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="btn btn-lg btn-success btn-block">
                                   <h3><span className="icon-barcode icon=4x"></span></h3> 
                                    <p>View Stock Reports</p>
                                </div>    
                                
                            </div>

                        <div className="col-md-4">
                                <div className="btn btn-lg btn-info btn-block">
                                   <h3><span className="icon-money icon=4x"></span></h3> 
                                    <p>View Expenditure Report</p>
                                </div>    
                                
                            </div>

                        <div className="col-md-4">
                                <div className="btn btn-lg btn-warning btn-block">
                                   <h3><span className="icon-globe icon=4x"></span></h3> 
                                    <p>View Exports Reports</p>
                                </div>    
                                
                            </div>
                        
                            
                        </div>  
                        
                        
                    </div>
                    </div>    
            )
        } else {
            return (
                <div className="main-app">
                    <div className="container">
                        <div className="breadcrumb">
                            <h3>Member Dashboard</h3>
                            <div className="alert alert-danger">
                            State 13: Runtime Error :: Middleware Cannot Access Browser LocalStorage
                        </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    getDashboardData()
    {
        var creds;
        var session = getSession();
  
        creds = {
          Token: session.Token,
          user_id: session.user_id,
          organization_id: session.organization_id
        }
  
        getDashboardWidgets(creds).then(
          (response) =>
          {
            this.setState({ widget:{ stock: response.Stock, products: response.Product, returns: response.returns, requests:response.request} })
          }  
        )

        
    }
}

export default DashBoard;