import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Adminnav extends Component
{
    render()
    {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                   <h5>Welcome Administrator</h5>
                </div>

                <ul className="list-unstyled components">
                    <li> <Link to="/dashboard"> <i className="icon-dashboard"></i> <span> </span> Dashboard </Link></li>
                    <li> <Link to="/manageStock" > <i className="icon-tag"></i> <span></span> Manage Stock </Link></li>
                    <li><Link to="/manageUsers" ><i className="icon-group"></i> <span> </span> Manage Users</Link></li>
                    <li><i className="icon-shopping-cart"></i> <span> </span> Order Requests</li>
                    <li><i className="icon-tasks"></i> <span> </span> Shipment Manifest</li>
                    <li><i className="icon-folder-close"></i> <span> </span> Manage Department </li>
                    <li> <i className="icon-wrench"></i> Settings</li>
                    <li> <i className="icon-envelope-alt"></i> Messages</li>
                </ul>
            </nav>
        )
    }
}

export default Adminnav;