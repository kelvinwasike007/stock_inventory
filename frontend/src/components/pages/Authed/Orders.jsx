import React, { Component } from 'react';
import { getAccountType } from '../../../services/AuthentiCationService';
import AdminView from './OrderViews/AdminView';
class Orders extends Component
{
    render()
    {
        if (getAccountType() === "admin")
        {
            //return the admin view
           return <AdminView />
        } else {
            //return member view
        }
    }
}

export default Orders;