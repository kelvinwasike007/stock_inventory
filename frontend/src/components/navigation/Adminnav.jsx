import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Adminnav extends Component
{
    render()
    {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                   <h6>Administrator WorkSpace</h6>
                </div>

                <ul className="list-unstyled components">
                    <li> <Link to="/dashboard"> <i className="icon-dashboard"></i> <span> </span> Dashboard </Link></li>
                    <li> <Link to="/manageStock" > <i className="icon-tag"></i> <span></span> Manage Stock </Link></li>
                    <li><Link to="/manageUsers" ><i className="icon-group"></i> <span> </span> Manage Users</Link></li>
                    <li> <Link to="/orders" ><i className="icon-shopping-cart"></i> <span> </span> Order Requests </Link></li>
                    <li><Link to="/shipment" ><i className="icon-tasks"></i> <span> </span> Shipment Manifest </Link> </li>
                    <li><Link to="/supplier"><i className="icon-truck"></i> <span> </span> Supplier Info </Link></li>
                    <li> <Link to="/settings"><i className="icon-wrench"></i> Settings</Link> </li>
                    <li> <i className="icon-envelope-alt"></i> Messages</li>
                </ul>
            </nav>
        )
    }
}

export default Adminnav;