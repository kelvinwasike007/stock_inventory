import React, { Component } from 'react';
import { emailValidate, emptyFieldValidate } from '../../services/ValidationService';
import { addOrganization } from '../../services/AuthentiCationService';
import { Redirect } from "react-router-dom";
class RegisterForm extends Component {
    constructor() {
        super()
        this.state = {
            organization: "",
            email: "",
            about: "",
            promise: false
        }

        this.changeField = this.changeField.bind(this);
        this.saveOrganization = this.saveOrganization.bind(this);
    }
    render() {
        if (this.state.promise === true)
        {
            return <Redirect to="/login" />
        }    
        return (
            <form onSubmit={this.saveOrganization}>
                <div className="form-group">
                    <label>Organization</label>
                    <input type="text" className="form-control" name="organization" value={this.state.organization} onChange={this.changeField} aria-describedby="emailHelp" placeholder="Enter Your Organization Title" />
                </div>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="text" onChange={this.changeField} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Organization email" />
                </div>
                <div className="form-group">
                    <label >About Your Organization</label>
                    <textarea type="text" className="form-control" onChange={this.changeField} name="about" id="exampleInputPassword1" placeholder="About Your Organization" />
                </div>
                <button type="submit" className="btn btn-primary  btn-block"> Create WorkSpace</button>
            </form>
        )
    }

    changeField(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    saveOrganization(e) {
        e.preventDefault();
        if (!emptyFieldValidate(this.state.organization)) {
            console.log("enter organization")
        } else if (!emptyFieldValidate(this.state.email)) {
            console.log("Enter email")
        } else if (!emptyFieldValidate(this.state.about)) {
            console.log("Enter about")
        } else if (!emailValidate(this.state.email)) {
            console.log("Enter Right Email")
        } else {
            //make OrgData
            var OrgData = {
                organization: this.state.organization,
                email: this.state.email,
                contact: this.state.about
            }
            addOrganization(OrgData).then(
                (promise) => {
                    if (promise.status === undefined)
                    {
                        console.log(promise.msg)
                    } else if (promise.status === "success")
                    {
                        this.setState({ promise: true }) 
                    } else {
                        
                    }
                }
            )
        }

    }

}

export default RegisterForm;