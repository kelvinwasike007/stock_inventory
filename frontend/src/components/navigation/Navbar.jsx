import React, { Component } from 'react';
import { authCheck } from '../../services/AuthentiCationService';
import AuthedNavBar from './AuthedNavBar';
import UnAuthedNavBar from './UnAuthedNavBar';
class Navbar extends Component
{
    render()
    {
        if (authCheck())
        {
            return <AuthedNavBar />
        } else {
            return <UnAuthedNavBar />
        }    
    }
}

export default Navbar;