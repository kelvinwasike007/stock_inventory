import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Components
//navbar
import Navbar from './Navs/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
//The Application Layout
class App extends Component
{
    render()
    {
        return(
            <BrowserRouter>
            <div>
            <Navbar />
            <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} /> 
            <Route path="/dashboard" component= {Dashboard} />            
            <Route component={Error} />
</Switch>
            </div>
            
            </BrowserRouter>
        )
    }
}

export default App;