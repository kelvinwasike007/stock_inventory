import React, { Component } from 'react';
import validateService from '../Services/validation';

const axios = require('axios');

class Register extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            organization: "",
            contact: "",
            email: "",
            msg: "",
            active: ""
        }
        this.registerOrganization = this.registerOrganization.bind(this);
        this.getOrganization = this.getOrganization.bind(this);
        this.getAbout = this.getAbout.bind(this);
        this.getEmail = this.getEmail.bind(this);
    }

    render()
    {
        return (
            
            <div className="app">
                <hr/>
            <div className="container">
                <div className="col-md-6">
            <div className="card text-white bg-secondary mb-3">
                        <div className="card-header"> <u><h1 className="page-header">Register WorkSpace</h1></u>
             </div>
                        <div className="card-body">
                            <span className={this.state.active}>{this.state.msg}</span>            
                    <form className="form-group" onSubmit={this.registerOrganization}>
                        <label htmlFor="">Enter  Organization Name</label>
                        <input type="text" className="form-control" placeholder="Enter Your Organization Name" value={this.state.organization} onChange={this.getOrganization} id="" />
                        <label htmlFor="">About Organization</label>
                        <textarea type="text" className="form-control" placeholder="Enter More Details About Your Organization" value={this.state.contact} onChange={this.getAbout} id="" />
                        <label htmlFor="">Enter Email</label>
                        <input type="text" className="form-control" placeholder="Enter Organization Email" onChange={this.getEmail} value={this.state.email} id="" />
                        <hr/>
                        <button  className="btn btn-primary btn-lg btn-block">Register Workspace</button>
                    </form>
                    </div>
                    </div>
                    </div>    
            </div>   
            </div>
        )
    }

    registerOrganization(e)
    {
        
        e.preventDefault();
        var organization = this.state.organization, contact = this.state.contact, email = this.state.email;
        if (validateService.checkIfEmpty(organization) || validateService.checkIfEmpty(email) || validateService.checkIfEmpty(contact))
        {
            axios({
                method: 'POST',
                url: '/api/clients/register',
                data: {
                    organization: organization,
                    email: email,
                    contact: contact
                }
                
            }).then(
                response => {
                    this.setState({msg: response.data.msg, active: "badge badge-light"})
                }
            ) 
        } else {
            this.setState({msg: "Please Fill Up All Fields", active: "badge badge-light"})
        }   
    }

    getOrganization(e) {
        this.setState({organization: e.target.value})
    }

    getEmail(e)
    {
        this.setState({email: e.target.value})
    }

    getAbout(e)
    {
        this.setState({contact: e.target.value})
    }
}

export default Register;