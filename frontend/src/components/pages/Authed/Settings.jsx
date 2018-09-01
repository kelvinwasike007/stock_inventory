import React, { Component } from 'react';
import { getAccountType } from '../../../services/AuthentiCationService';
import AdminSettings from './SettingsViews/AdminSettings';
class Settings extends Component
{
    render()
    {
        if (getAccountType() === "admin")
        {
            //admin settings
            return <AdminSettings />
        } else {
            //members Settings
        }
    }
}

export default Settings;