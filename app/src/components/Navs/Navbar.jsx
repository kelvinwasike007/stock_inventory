import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 

class Navbar extends Component
{
    render()
    {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand">Stock Inventory</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                        <NavLink to="/" className="nav-link">Home </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav text-right">
                        <li className="nav-item ">
                        <NavLink to="/login" className="nav-link">Login </NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink to="/register" className="nav-link">Register </NavLink>
                        </li>
                    </ul>
                    </div>
            </nav>
        )
    }

}

export default Navbar;