import React, { Component } from 'react';

class Exchange extends Component
{
    constructor()
    {
        super()
        this.state = {
            mode: "give"
        }


        this.setModeGive = this.setModeGive.bind(this);
        this.setModeReturn = this.setModeReturn.bind(this);
    }



    setModeGive()
    {
        this.setState({ mode: "give" });
    }

    setModeReturn()
    {
        this.setState({ mode: "return" });
    }

    render()
    {
        if (this.state.mode === "give") {
            return (
                <div className="main-app">
                    <div className="container">
                        <div className="breadcrumb">
                            <h1>Exchange Point</h1>
                        </div>
                        <div className="jumbotron">
                            <h3>Choose Exchange Mode</h3>
                            <button className="btn btn-primary btn-lg" onClick={this.setModeGive} > <span className="icon-level-down"> </span> Check out Stock To Consumer</button> <button className="btn btn-success btn-lg" onClick={this.setModeReturn} > <span className="icon-level-up"> </span> Customer Return Stock</button>
                        </div>
                        <hr />
                        <div className="jumbotron">
                            <h3>Sell/Distribute Stock</h3>
                            <br />
                            <div className="row">
                                <div className="col-md-5">
                                    <form>
                                        <div>
                                        <div className="alert alert-danger">
                            State 13: Runtime Error :: Middleware Cannot Access Browser LocalStorage
                        </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-md-5">
                                <div className="alert alert-danger">
                            State 13: Runtime Error :: Middleware Cannot Access Browser LocalStorage
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )            
        } else {
            return (
                <div className="main-app">
                    <div className="container">
                        <div className="breadcrumb">
                            <h1>Exchange Point</h1>
                        </div>
                        <div className="jumbotron">
                            <h3>Choose Exchange Mode</h3>
                            <button className="btn btn-primary btn-lg" onClick={this.setModeGive} > <span className="icon-level-down"> </span> Check out Stock To Consumer</button> <button className="btn btn-success btn-lg" onClick={this.setModeReturn} > <span className="icon-level-up"> </span> Customer Return Stock</button>
                        </div>
    
                        <div className="alert alert-danger">
                            State 13: Runtime Error :: Middleware Cannot Access Browser LocalStorage
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Exchange;