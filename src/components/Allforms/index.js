import React from 'react'
import Posts from "./../Posts1";
import Header from "./../Header";
import {useHistory} from "react-router-dom";
function Allforms({user}) {

  const history = useHistory('');
  if(user === false){
      history.push("/login");
  }
    return (
        <div>
            <Header user={user}/>
            <div style={{background: "white"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel"></h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <h1 style={{color: "white"}}><Posts user={user}/></h1>
      </div>
      
    </div>
  </div> 
    )
}

export default Allforms
