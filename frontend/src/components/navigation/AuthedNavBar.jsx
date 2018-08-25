import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class AuthedNavBar extends Component
{
    constructor()
    {
        super()
        this.state = {
            redirect: false
        }

        this.logoutFunction = this.logoutFunction.bind(this);
        this.clickStock = this.clickStock.bind(this);
    }
    render()
    {
        if (this.state.redirect === true)
        {
            return <Redirect to="/" />
        }    
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{ backgroundColor:"orange"}}>
      <a className="navbar-brand text-white" id="sidebarActivate" href="" onClick={this.clickStock} >Stock Inventory</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav text-right">
                            <li className="nav-item active">
                                <a className="nav-link " href="" onClick={this.logoutFunction}> Logout <span className="sr-only">(current)</span></a>
          </li>
                            
        </ul>                
      </div>
    </nav>
            </div>
        )
    }

    logoutFunction(e)
    {
        e.preventDefault();
        localStorage.removeItem("user_data");
        this.setState({ redirect: true }); 
    }

    clickStock(e)
    {
        e.preventDefault();
    }
}

export default AuthedNavBar;