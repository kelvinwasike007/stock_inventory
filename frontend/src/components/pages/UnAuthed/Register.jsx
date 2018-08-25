import React, { Component } from 'react';
import RegisterForm from '../../forms/RegisterForm';
class Register extends Component
{
    render()
    {
        return (

            <div className="container">
                <div className="py-3 col-md-5">
                    
                    <div className="card">
 
  <div className="card-body">
    <h3 className="card-title">Create WorkSpace</h3>
    <RegisterForm />
  </div> 
</div>
                </div>
            </div>    
        )
    }
}

export default Register;