import React from 'react'

function Research() {
  
    return (
        <div>
            <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel"></h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <h1 style={{color: "white"}}>Research</h1>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        <button type="button"   data-toggle="modal" data-dismiss="modal" data-target="#exampleModal3" data-whatever="@fat" style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div> 
        </div>
    )
}

export default Research
