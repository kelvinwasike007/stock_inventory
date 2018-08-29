import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/navigation/Navbar';
import Login from './components/pages/UnAuthed/Login'
import Register from './components/pages/UnAuthed/Register';
import Home from './components/pages/UnAuthed/Home';
import Sidenav from './components/navigation/Sidenav';
import StockManagement from './components/pages/Authed/StockManagement';
import manageUsers from './components/pages/Authed/manageUsers';
import './main.css';
import DashBoard from './components/pages/Authed/DashBoard';
import Error from './components/pages/Error';
import Orders from './components/pages/Authed/Orders';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class App extends Component
{
  render()
  {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Sidenav />    
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={DashBoard} />  
          <Route path="/register" component={Register} />
          <Route path="/manageStock" component={StockManagement} />  
          <Route path="/manageUsers" component={manageUsers} />  
          <Route path="/orders" component={Orders} />
          <Route component={Error} />
        </Switch>
        </div>  
      </BrowserRouter>  
      )
  }
}

export default App;