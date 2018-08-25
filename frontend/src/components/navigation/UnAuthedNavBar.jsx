import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UnAuthedNavBar extends Component
{
    render()
    {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{ backgroundColor:"orange" }}>
      <Link className="navbar-brand" to="/">Stock Inventory</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav text-right">
          <li className="nav-item active">
          <Link className="nav-link" to="/login" > Login <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
          <Link className="nav-link" to="/register" > Register <span className="sr-only">(current)</span></Link>
          </li>
                            
        </ul>                
      </div>
    </nav>
            </div>
        )
    }
}

export default UnAuthedNavBar;