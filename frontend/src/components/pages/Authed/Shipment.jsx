import React, { Component } from 'react';
import ShipmentAdmin from './Shipmentviews/ShipmentAdmin';
import { getAccountType } from '../../../services/AuthentiCationService'
import ShipmentMember from './Shipmentviews/ShipmentMember';

class Shipment extends Component
{
    render()
    {
        if (getAccountType() === "admin")
        {
            return <ShipmentAdmin />
        } else {
            return <ShipmentMember />
        }   
    }
}

export default Shipment;