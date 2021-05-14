import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Resform from "../../Resform";
import FormSelect from '../../forms/FormSelect';


function Posts({field, formId, ownerDisplayName, ownerEmail, ownerId, ownerPhotoURL, timestamp, topic, user,read}) {


  // const [response1, setResponse1] = useState("");
    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }

    return (
      <>
      
        <div style={{flexWrap: "wrap"}}>
         
            <div class="card text-center">
  <div style={{color: "#FE2E9A"}} class="card-header">
    Ongoing Survey
  </div>
  <div class="card-body">
    <h5 style={{color: "#FE2E9A"}}  class="card-title">Field: {field}</h5>
    <p style={{color: "#FE2E9A"}}  class="card-text">Topic: {topic}</p>
    <div style={{display: "flex",color: "#FE2E9A"}}>
    <p style={{color: "#FE2E9A",justifyContent: "space-between",fontSize: "20px"}}  class="">Participants</p>
    <p style={{marginLeft: "10px",fontSize: "20px"}}> 20</p>
    </div>
    
    <Link to={`/respond/${formId}`}>
    <button type="button"  data-toggle="modal" data-target="#exampleModal4" data-whatever="@fat" style={{background: "#FE2E9A",color: "white"}} class="btn btn-primary">Participate</button>
    </Link>
  </div>
  <div style={{background: "#FE2E9A"}}  class="card-footer text-muted">
    <p style={{color: "whitesmoke"}}>{parseTimestamp(timestamp)}</p>
  </div>
</div>
<div  class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<Resform formId={formId}/>
</div>
        </div>
        </>
   
    )
}

export default Posts
