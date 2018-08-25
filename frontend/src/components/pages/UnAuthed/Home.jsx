import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component
{
    render()
    {
        return (
            <div>
                      <div className="jumbotron logo">
        <div className="container">
          <h1 className="display-3">Stock Inventory System</h1>
          <p>Try the new WesEmpire's Stock Inventory System Now </p><br/>
          <p><Link className="btn btn-warning btn-lg" to="/register" role="button">Get Started <span className="icon-arrow-right"></span></Link></p>
        </div>
                </div>
                <div className="container">

        <div className="row">
                <div className="col-md-4">
            <div className="card text-center">    
                    <span className="icon-laptop icon-4x"></span>
            <h3>Responsive Application</h3>        
            <p>It really doesnt matter which device or platform you are using. You can accomplish task from any device in any place of the Earth </p>
            </div>          
          </div>
          <div className="col-md-4">
          <div className="card text-center">    
                  <span className="icon-hdd icon-4x"></span>
          <h3>Full Storage Support</h3>        
          <p>No Need To Worry About Data Storage and Accesability.  Get your data on the go hustle free !.Get All Customer and Supplier Data in one place with no hustle </p>
          </div>          
                </div>
                <div className="col-md-4">
            <div className="card text-center">    
                    <span className="icon-shield icon-4x"></span>
            <h3>Secure</h3>        
            <p>Your data is safe and well protected in our system. Easly Change Credentials in your plan and revoke some of your users easly</p>
            </div>          
          </div>        
        </div>

        <hr/>
        
                </div>  
                <footer className="footer">
        <div className="container">
          <span className="text-muted">WesEmpire 2018</span>
        </div>
      </footer>      
            </div>
        )
    }
}

export default Home;