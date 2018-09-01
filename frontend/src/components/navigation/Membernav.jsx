import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Membernav extends Component
{
    render()
    {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                   <h6>Member WorkSpace</h6>
                </div>

                <ul className="list-unstyled components">
                <li> <Link to="/dashboard"> <i className="icon-dashboard"></i> <span> </span> Dashboard </Link></li>
                    <li> <Link to="/exchange" > <i className="icon-exchange"></i> <span></span> Exchange Stock </Link></li>
                    <li><Link to="/consumers" ><i className="icon-group"></i> <span> </span> Consumer List</Link></li>
                    <li> <Link to="/shipment" ><i className="icon-refresh"></i> <span> </span> Save Shipped Stock </Link></li>
                    <li><Link to="/request" ><i className="icon-mail-forward"></i> <span> </span> Request Stock </Link> </li>
                    <li><Link to="/prepare"><i className="icon-location-arrow"></i> <span> </span> Prepare Orders </Link></li>

                </ul>
            </nav>
        )
    }
}

export default Membernav;