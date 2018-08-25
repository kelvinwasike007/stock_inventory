import React, { Component } from 'react';
import LoginForm from '../../forms/LoginForm';
class Login extends Component {
    render() {
        return (
            
            <div className="container">
                <div className="py-3 col-md-5">
                    
                    <div className="card">
 
                        <div className="card-body">
                            <h3 className="card-title">Login To WorkSpace</h3>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default Login;