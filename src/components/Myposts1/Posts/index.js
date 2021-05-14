import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom";
import Resform from "../../Resform";
import FormSelect from '../../forms/FormSelect';
import {db,auth} from "./../../firebase"

function Posts({field, formId, ownerDisplayName, ownerEmail, ownerId, ownerPhotoURL, timestamp, topic, user,read,location,min,max,location1,topic1,field1}) {

  const [posts1, setPosts1] = useState([]);

  const [response1, setResponse1] = useState("");

  const [followersCount, setFollowers]= useState(0);
  useEffect(() => {
    db.collection('resform').where("formId", "==",formId).where("read1","==", true)
   .onSnapshot(snapshot => (
    setFollowers(snapshot.docs.length)
   ))
}, []);


  useEffect(() => {
    db.collection('forms').where('read', '==', false)
   .onSnapshot(snapshot => (
    setPosts1(snapshot.docs.length)
   ))
}, []);

    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }

    const update = (e) => {
      e.preventDefault();

      // Add a new document in collection "cities"
      var washingtonRef = db.collection("forms").doc(formId);

      // Set the "capital" field of the city 'DC'
      return washingtonRef.update({
          read: true,
      })
      .then(() => {
          alert("Form successfully been closed!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });


  }
  
  const deleteForm = (event) => {
        
    event.preventDefault();

    db.collection('forms').doc(formId).delete().then(function() {
        alert("Form successfully deleted!");
    }).catch(function(error) {
        alert("Error removing post: ", error);
    });
    
}

    return (
        <div style={{flexWrap: "wrap"}}>
     
      
      <div class="modal-body">
      <div class="card text-center">
  
  {(read == true) &&(
    <div style={{color: "#FE2E9A"}} class="card-header">
  <p>Completed Survey</p>
  </div>

                                  )}
  {(read == false) &&(
 <div style={{background: "#fa98c9",color: "white"}} class="card-header">

  <p>Ongoing Survey</p>
  </div>
                                  )}                                
  <div class="card-body">
    <h5 style={{color: "#FE2E9A"}}  class="card-title">{field &&(<>Field: {field}</>)}
      {field1 &&(<>Field: {field1}</>)}</h5>
    <p style={{color: "#FE2E9A"}}  class="card-text">{topic &&(<>Topic: {topic}</>)}
      {topic1 &&(<>Topic: {topic1}</>)}</p>
    <div style={{display: "flex",color: "#FE2E9A"}}>
    <p style={{color: "#FE2E9A",justifyContent: "space-between",fontSize: "20px"}}  class="">Participants</p>
    <p style={{marginLeft: "10px",fontSize: "20px"}}> : {followersCount}</p>
    <p style={{color: "#FE2E9A",marginLeft: "10px",fontSize: "18px"}}>{location &&(<>(Location: {location}</>)} {min &&(<>(age: {min}-{max})</>)}
      {location1 &&(<>(Location: {location1}</>)} {min &&(<>(age: {min}-{max})</>)}</p>

    </div>
    <button style={{background: "#FE2E9A",color: "white"}} data-toggle="modal" data-target="#exampleModal12" >Delete</button>
    
    {/* {posts1 ?(
                                    
                                  <button style={{background: "#FE2E9A",color:"white"}} onClick={update} >Completed</button>
                                 
                                 ):(
                                  <button style={{background: "#FE2E9A",color:"white"}} onClick={update} >Close</button>
                                  )} */}
                                  {(read == true) &&(
                               <button style={{background: "white",color:"#FE2E9A"}} onClick={update} >Completed</button>

                                  )}
                                  {(read==false) &&(
                               <button style={{background: "#FE2E9A",color:"white"}} onClick={update} >Close</button>
                               )}


<div class="modal fade" id="exampleModal12" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style={{color: "red"}} id="exampleModalLabel">Alert!!!</h5>
        
      </div>
      <div  style={{color: "red"}} class="modal-body">
        Are you sure! you want to delete?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" style={{background: "red",color:"white"}} onClick={deleteForm} >Yes</button>
        <button type="button" class="btn btn-primary" style={{background: "white",color:"red"}} data-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>
  </div>
  <div style={{background: "#FE2E9A"}}  class="card-footer text-muted">
    <p style={{color: "whitesmoke"}}>{parseTimestamp(timestamp)}</p>
  </div>
</div>
      </div>
        </div>
    )
}

export default Posts
