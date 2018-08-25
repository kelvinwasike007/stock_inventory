import React, { Component } from 'react';
import { emptyFieldValidate } from '../../services/ValidationService';
import { getOrganizations, loginResponse, saveSession, authCheck } from '../../services/AuthentiCationService';
import { Redirect } from 'react-router-dom';
class LoginForm extends Component
{

    constructor()
    {
        super()
        this.state = {
            organization: "",
            username: "",
            password: "",
            organizations: [],
            errorMode: false,
            errorDump: "",
            redirect: false
        }
        this.changeField = this.changeField.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    componentWillMount()
    {
        //get Orgs

        getOrganizations().then((organizations) => {
            this.setState({organizations})
        })
 
    }
    render()
    {
        if (authCheck())
        {
            
            return <Redirect to="/dashboard" />
        }

        if (this.state.redirect === true)
        {
            window.location.reload();
            return <Redirect to="/dashboard" />
        }    
        return (
            <form onSubmit={this.loginUser}>
                <div className="form-group">
                    <label>Select Your Organization</label>
                    <select name="organization" className="form-control" id="" onChange={this.changeField} placeholder="Select Your Organization">
                        <option>Select Organization</option>
                        {
                            this.state.organizations.map((organization_item, index) => (
                                <option key={index} value={organization_item.organization_id} > {organization_item.organization_name} </option>
                            ))
                        }
                    </select>   
                </div>
                <div className="form-group">
                    <label >Username</label>
                    <input type="text" onChange={this.changeField} name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" onChange={this.changeField} name="password" id="exampleInputPassword1" placeholder="Enter Password" />
                </div>
                <button type="submit" className="btn btn-primary  btn-block">Login</button>
            </form>
        )
    }

    changeField(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    loginUser(e) {
        e.preventDefault();
        //Format Data for login

        console.log(this.state);

        var creds = {
            organization_id: this.state.organization,
            username: this.state.username,
            password: this.state.password
        }

        //validate

        if (!emptyFieldValidate(creds.username))
        {
            console.log("Please Fill In The Username")
        } else if (!emptyFieldValidate(creds.password))
        {
            console.log("Please Fill In The Password")
        } else if (!emptyFieldValidate(creds.organization_id))
        {
            console.log("Please Select Your Organization");
        } else {
            //Try The login
            
            loginResponse(creds).then(
                (response) =>
                {
                    console.log(response.msg)
                    if (response.msg === "Authenticated")
                    {
                        //login user
                        this.setState({ redirect: true });
                        console.log(this.state);
                        var user_data = {
                            Token: response.Token,
                            organization_id: response.organization_id,
                            user_id: response.user_id,
                            account_type: response.ac_type
                        }

                        saveSession(user_data);

                    } else {
                        this.setState({ errorMode: true, errorDump: response.info })
                        console.log(this.state);
                    }
                }    
            )

        }
    }
}

export default LoginForm;