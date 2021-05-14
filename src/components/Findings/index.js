import React, {useState,useEffect} from 'react'
import Posts from "./../Posts2";
import Header from "./../Header";
import {useHistory} from "react-router-dom"
import {db,auth} from "./../firebase"


function Findings() {
  const history = useHistory("");


  const [user, setUser] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    })
  }, [])
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

export default Findings
