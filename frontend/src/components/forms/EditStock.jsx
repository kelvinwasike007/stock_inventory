import React, { Component } from 'react';

class EditStock extends Component
{
    render()
    {
        const { stock_details } = this.props;
        console.log(stock_details)
        return (
            
<div className="modal fade" id={stock_details.stock_group_id}  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog " role="document">
    <div className="modal-content bg-warning">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Stock</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
            <div className="form-group">
                <label>Stock Name</label>
                <input type="text" value={stock_details.stock_name} name="stock_name" className="form-control"  placeholder="Enter Stock Name" />
            </div>
            <div className="form-group">
                <label >Stock Id</label>
                <input type="text"  name="stock_id" value={stock_details.stock_group_id} className="form-control"  placeholder="Enter Stock Id" />
                </div>
                <div className="form-group">
                <label >Return State</label>
                <select type="text" value={stock_details.return_status} name="return_state" className="form-control" placeholder="Select Help State">
                        <option >Select Return State</option>
                        <option value="true">True</option>   
                        <option value="False">False</option>                
                </select>        
            </div>    
            <div className="form-group">
                <label >Stock Description</label>
                <textarea type="text" value={stock_details.stock_description} className="form-control" name="stock_description" id="exampleInputPassword1" placeholder="Enter This Stock's Description" />                    
            </div>
            <button type="submit" className="btn btn-primary  btn-block"> Save Changes </button>
        </form>                
      </div>
    </div>
  </div>
</div> 
        )
    }

    
}

export default EditStock;