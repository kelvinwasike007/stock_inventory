import React, { Component } from 'react';
import Authentication from '../Services/Authentication';
import { Redirect } from 'react-router-dom';
const axios = require('axios');
//landing Component

class Login extends Component
{
    constructor(props) {
        super(props)
        
        this.state = {
            username: "",
            password: "",
            organization_id: "",
            msg: "",
            active: "",
            OrgData: [],
            redirect: "no"
        }

        this.getPassword = this.getPassword.bind(this);

        this.getUsername = this.getUsername.bind(this);

        this.loginUser = this.loginUser.bind(this);

        this.SelectChange = this.SelectChange.bind(this);
    }
    componentWillMount() {
        this.loadOrganization();
    }
    render()
    {
        if (this.state.redirect === "yes")
        {
            return <Redirect to="/dashboard" />
        }    
        return (

            <div  className="container">
                <hr/>
                <div className="col-md-6">
            <div  className="card text-white bg-secondary mb-3">
                        <div className="card-header"> <u><h1 className="page-header">Login To WorkSpace</h1></u>
             </div>
                        <div className="card-body">
                        <span className={this.state.active}>{this.state.msg}</span>            
            <form className="form-group" onSubmit={this.loginUser}>
                                <label htmlFor="" >Select Your Organization Workpace</label>
                                <select className="form-control" onChange={this.SelectChange}>
                                <option value="">Select Organization</option>    
                                    {this.state.OrgData.map((OrgDetail, index) => {
                                        return <option key={OrgDetail.id} value={OrgDetail.id}>{OrgDetail.name}</option>
                })}                  
            </select>
            <label htmlFor="">Username</label>
            <input type="text" className="form-control" value={this.state.username} onChange={this.getUsername} placeholder="Enter Your Username"  id="" />
            <label htmlFor="">Password</label>
            <input type="password" className="form-control" value={this.state.password} onChange={this.getPassword} placeholder="Enter Password"  id="" />
            <hr/>
            <button  className="btn btn-primary btn-lg btn-block">Sign In</button>
        </form>
            </div>
                    </div>
                    </div>    
            </div>    
            
        )
        
}
    loginUser(e)
    {
        e.preventDefault();
        //get Login Info
        var username = this.state.username, password = this.state.password, organization_id = this.state.organization_id;
        var Credentials = {
            username: username,
            password: password,
            organization_id: organization_id
        };
        axios({
            method: 'POST',
            url: '/api/users/clients/login',
            data: Credentials
        }).then(
            
            res => {
                if (res.data.msg === "Authenticated") {
                    var organizationId = res.data.organization_id, Token = res.data.Token, user_id = res.data.user_id;
                    
                    var user_data = {
                        organization_id: organizationId,
                        user_id: user_id,
                        Token: Token
                    };
                    Authentication.setSession(user_data);
                    this.setState({ redirect: "yes" });
                } else {
                    //wrong password
                    this.setState({ msg: res.data.info, active: "badge badge-danger"});
                }
            }
        );
    }

    SelectChange(e)
    {
        this.setState({ organization_id: e.target.value });
        
    }

    getUsername(e)
    {
        this.setState({ username: e.target.value });
    }

    getPassword(e)
    {
        this.setState({ password: e.target.value });
    }
    
    loadOrganization()
    {
        axios({
            method: 'GET',
            url: '/api/clients/read'
        }).then(
            res => {
               this.setState({OrgData: res.data})
                
            }
        ) 
    }
}

export default Login;