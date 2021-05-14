import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom";
import Resform from "../../Resform";
import FormSelect from '../../forms/FormSelect';
import {db} from "./../../firebase"

function Posts({field, formId, ownerDisplayName, ownerEmail, ownerId, ownerPhotoURL, timestamp, topic, user,read,location,max,min,location1,field1,topic1}) {

  const [followersCount, setFollowers]= useState(0);
  useEffect(() => {
    db.collection('resform').where("formId", "==",formId).where("read1","==", true)
   .onSnapshot(snapshot => (
    setFollowers(snapshot.docs.length)
   ))
}, []);

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
Completed Survey
</div>
<div class="card-body">
<h5 style={{color: "#FE2E9A"}}  class="card-title"> {field &&(<>Field: {field}</>)}
{field1 &&(<>Field: {field1}</>)}</h5>
<p style={{color: "#FE2E9A"}}  class="card-text">{topic &&(<>Topic: {topic}</>)}
{topic1 &&(<>Topic: {topic1}</>)}</p>
<div style={{display: "flex",color: "#FE2E9A"}}>
<p style={{color: "#FE2E9A",justifyContent: "space-between",fontSize: "20px"}}  class="">Participants</p>
<p style={{marginLeft: "10px",fontSize: "20px"}}> : {followersCount}</p>
<p style={{color: "#FE2E9A",marginLeft: "10px",fontSize: "18px"}}>
{location &&(<>(Location: {location}</>)} {min &&(<>(age: {min}-{max})</>)}
{location1 &&(<>(Location: {location1}</>)} {min &&(<>(age: {min}-{max})</>)}
</p>

</div>
{(read==true) &&(
<button type="button" style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Completed</button>

)}
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
