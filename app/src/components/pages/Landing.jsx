import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../assets/Lnding.css';
//landing Component

class Landing extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
        this.redirectPage = this.redirectPage.bind(this);
    }

    render()
    {
        if (this.state.redirect)
        {
            return <Redirect to="/register" />
        }    
        return (
            <div className="app">
            <div className="jumbotron landing">
                <h1 className="display-1">Stock Inventory System</h1><h1 className="display-5">by WesEmpire</h1>
                <p className="lead">Take Control Of Your OwnerShip Using Our Easy To Use System...</p>
                <hr className="my-4"/>
                <p>Are You Ready ?</p>
                <p className="lead">
                        <a className="btn btn-outline-primary btn-lg" onClick={this.redirectPage} role="button">Get Started</a>
                </p>
            </div> 
                <hr />
    <h4 className="text-center"> <u>Why Us?</u> </h4>                

            <section className="container">
                    <div className="row">
                        <div className="col-md-4">
                        <div className="card">
  <div className="card-body">
    <h4 className="card-title">Card title</h4>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a  className="card-link">Card link</a>
    <a  className="card-link">Another link</a>
  </div>
</div>
                        </div>        
                        <div className="col-md-4">
                        <div className="card">
  <div className="card-body">
    <h4 className="card-title">Customer Support </h4>
    <h6 className="card-subtitle mb-2 text-muted">Feeling Stuck ?</h6>
    <p className="card-text">The System Has An easy to use customer support in times for assistance.Your comfort is our pride</p>
    <a  className="card-link">Card link</a>
    <a  className="card-link">Another link</a>
  </div>
</div>
                        </div>        
                        <div className="col-md-4">
                        <div className="card">
  <div className="card-body">
    <h4 className="card-title">Card title</h4>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a  className="card-link">Card link</a>
    <a  className="card-link">Another link</a>
  </div>
</div>
                        </div>        
            </div>
                </section>
                <hr/>
            </div>    
            
        )
    }

    redirectPage(e)
    {
        this.setState({ redirect: true });
    }
}

export default Landing;