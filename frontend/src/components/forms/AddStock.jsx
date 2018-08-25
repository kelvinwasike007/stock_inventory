import React, { Component } from 'react';
import { getSession } from '../../services/AuthentiCationService';
import { emptyFieldValidate } from '../../services/ValidationService';
import { addStock } from '../../services/StockService';
class AddStock extends Component
{

    constructor()
    {
        super();
        this.state = {
            stock_name: "",
            stock_id: "",
            stock_description: "",
            return_state: ""
        }

        this.storeInput = this.storeInput.bind(this);
        this.postStock = this.postStock.bind(this);
    }
    render()
    {
        return (
            <form onSubmit={this.postStock}>
            <div className="form-group">
                <label>Stock Name</label>
                <input type="text" onChange={this.storeInput} name="stock_name" className="form-control"  placeholder="Enter Stock Name" />
            </div>
            <div className="form-group">
                <label >Stock Id</label>
                <input type="text" onChange={this.storeInput} name="stock_id" className="form-control"  placeholder="Enter Stock Id" />
                </div>
                <div className="form-group">
                <label >Return State</label>
                <select type="text" onChange={this.storeInput} name="return_state" className="form-control" placeholder="Select Help State">
                        <option >Select Return State</option>
                        <option value="true">True</option>   
                        <option value="False">False</option>                
                </select>        
            </div>    
            <div className="form-group">
                <label >Stock Description</label>
                <textarea type="text" onChange={this.storeInput} className="form-control"  name="stock_description" id="exampleInputPassword1" placeholder="Enter This Stock's Description" />
            </div>
            <button type="submit" className="btn btn-primary  btn-block"> Add Stock Info </button>
        </form>
        )
    }

    storeInput(e)
    {
        this.setState({ [e.target.name]: e.target.value });
        
    }

    postStock(e)
    {
        e.preventDefault();
        //gather data
        var session;
        session = getSession();
        var stock_info = {
            Token: session.Token,
            user_id: session.user_id,
            organization_id: session.organization_id,
            stock_name: this.state.stock_name,
            stock_group_id: this.state.stock_id,
            stock_description: this.state.stock_description,
            return_status: this.state.return_state
        }

        if (!emptyFieldValidate(stock_info.stock_name))
        {
            console.log("entet s_name")
        } else if (!emptyFieldValidate(stock_info.stock_group_id))
        {
            console.log("enter s_g_id")
        } else if (!emptyFieldValidate(stock_info.stock_description)) {
            console.log("enter decription")
        } else if (!emptyFieldValidate(stock_info.return_status))
        {
            console.log("enter status")
        } else {
            addStock(stock_info).then(
                (response) =>
                {
                    if (response.status === "pass")
                    {
                        console.log(response.msg)
                    } else {
                        console.log(response.msg)
                    }
                }    
            )
        }
    }
}

export default AddStock;