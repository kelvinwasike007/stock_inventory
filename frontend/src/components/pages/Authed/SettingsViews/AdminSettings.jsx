import React, { Component } from 'react';
import { getWorkSpaceInfo } from '../../../../services/SettingsService';
import { getSession } from '../../../../services/AuthentiCationService';
import { toast, ToastContainer } from 'react-toastify';
import { emptyFieldValidate } from '../../../../services/ValidationService';

class AdminSettings extends Component
{
    constructor(){
        super()
        this.state =
        {
                workspaceData: [],
                password: "",
                password_one: "",
                password_confirm: "",
                username: ""
        }

        this.getWorkSpaceFields = this.getWorkSpaceFields.bind(this);
        this.saveAccount = this.saveAccount.bind(this);
        this.saveField = this.saveField.bind(this);
    }

    componentWillMount()
    {
        this.getWorkSpaceFields()
    }

    saveAccount(e)
    {
        e.preventDefault();
        if (!emptyFieldValidate(this.state.password))
        {
            toast.warn("Enter Password In Order To Save Changes", { postion: toast.POSITION.TOP_RIGHT });
        } else if (this.state.password_one !== this.state.password_confirm)
        {
            toast.warn("Password Does Not The Same", { postion: toast.POSITION.TOP_RIGHT });            
        } else {
            if (!this.state.password)
            {
                //save with password
            } else {
                //save Without Password
            }
            toast.success("Account Was Updated", { postion: toast.POSITION.TOP_RIGHT });            
            

        } 
    }

    saveField(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }
    render()
    {
        return (
            <div className="main-app">
                <div className="container">
                <div className="breadcrumb">
                       <h3>Setting</h3>
                    </div>
                    <ToastContainer />
                   
                    <div className="breadcrumb bg-success">
                        Account Settings
                    </div>

                    <form className="col-md-7" onSubmit={this.saveAccount}>
                <div className="form-group">
                <label>Set Your Username</label>

                    {
                        this.state.workspaceData.map((data, key) => (
                    
                    <input type="text" onChange={this.saveField} key={data} Value={data.username}  name="uername" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Username" />
                    
                        ))
                    }
          
                </div>
                <div className="form-group">
                    <label >Enter Old Password</label>
                    <input type="password" onChange={this.saveField} name="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Current Password" />
                </div>
                <div className="form-group">
                    <label >New Password</label>
                    <input type="password" onChange={this.saveField} className="form-control"  name="passowrd_one" id="exampleInputPassword1" placeholder="Enter New Password" />
                        </div>
                        <div className="form-group">
                    <label >Confirm New Password</label>
                    <input type="password" onChange={this.saveField} className="form-control"  name="password_confirm" id="exampleInputPassword1" placeholder="Confirm New Password" />
                </div>        
                <button type="submit" className="btn btn-primary  btn-block"> <span className="icon-ok-circle"></span> Update Account Details</button>
            </form>
                </div>
                <hr/>
            </div>

        )
    }

    getWorkSpaceFields()
    {
        var creds;
        var session = getSession();
  
        creds = {
          Token: session.Token,
          user_id: session.user_id,
          organization_id: session.organization_id
        }
  
        getWorkSpaceInfo(creds).then(
          (response) =>
          {
            if(response.length === 0)
            {

            } else {
              this.setState({ workspaceData: response              
            })           
            }
          }  
        )

       
    }
}

export default AdminSettings;