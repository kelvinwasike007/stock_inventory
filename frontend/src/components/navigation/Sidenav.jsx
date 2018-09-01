import React, { Component } from 'react';
import { authCheck, getAccountType } from '../../services/AuthentiCationService';
import Adminnav from './Adminnav';
import Membernav from './Membernav';
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
                return <Membernav />
            }  
            
        } else {
            return <span></span>
        }   

    }
}

export default Sidenav;