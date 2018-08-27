import React, { Component } from 'react';

class Error extends Component
{
    render()
    {
        return (
            <div className="main-app">
                <div className="container">
                    <div className="jumbotron bg-danger">
                        <div className="">
                            <h1> <span className="icon-hand-right icon-2x"></span> Error 404</h1>
                            <p>
                                Location Not Found
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error;