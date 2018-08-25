import React, { Component } from 'react';
import { authCheck, getAccountType } from '../../services/AuthentiCationService';
import Adminnav from './Adminnav';
class Sidenav extends Component
{

    render()
    {
        if (authCheck())
        {
            //succeed
            if (getAccountType() === "admin")
            {
                return <Adminnav />
            } else {
                return <span><h1>Destributor</h1></span>
            }  
            
        } else {
            return <span></span>
        }   

    }
}

export default Sidenav;