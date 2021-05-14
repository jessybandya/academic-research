import React, { useState,useEffect } from 'react'
import { db } from "./../firebase";
import FormSelect from './../forms/FormSelect';
import {useParams, Link} from 'react-router-dom';
import Header from "./../Header";
import {auth} from "./../firebase";
import {useHistory} from "react-router-dom";

function Resform() {
  const history = useHistory("");
  const [posts, setPosts] = useState([]);

  const {currentUser} = auth

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
    const [response, setResponse1] = useState("");
   const [post, setPost] = useState(null);
   let { id } = useParams();


   const responseReturn = (event) => {
    event.preventDefault();
    let errors = {};

    db.collection('resform').where("fromId", "==", auth.currentUser.uid).where("formId", "==",id ).get().then(
      snap => {
        if (snap.docs.length > 0) {
          alert("You have participated already!")
        }
        else if (!response.trim()) {
          errors.response = alert("You can't submit with an empty field");
         } else {
            db.collection('resform').add({
                //
              timestamp:  Date.now(),
              fromPhotoURL: auth.currentUser.photoURL,
              fromDisplayName: auth.currentUser.displayName,
              fromEmail:auth.currentUser.email,
              fromId:auth.currentUser.uid,
              userName:auth.currentUser.displayName,
              response: response,
                  read: false,
                  read1: true,
                  formId: id,
                  ownerFormId: post.ownerId,
      
             
            }).then(ref => alert("Response submitted successfully"))
            setResponse1("");
        }
      }
    )
  }

    useEffect(() => {
        db.collection('forms').doc(id).get().then(
            snapshot => setPost(snapshot.data())
        ).catch(
        )
        
     
    }, []);


    return (
        <div>
            <Header  user={user}/>
            <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <p><h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">
          {post?.field &&(<>Field: {post?.field}</>)}
          {post?.field1 &&(<>Field: {post?.field1}</>)}
        </h5></p>
        
      </div>
      <p><h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">{post?.topic &&(<>Topic: {post?.topic}</>)}?
          {post?.topic1 &&(<>Topic: {post?.topic1}</>)}</h5></p>

      <div class="modal-body">
        <form>
          <div class="form-group">
      
            <input type="text" onChange={(e) => {
                                setResponse1(e.target.value);
                            }} class="form-control" id="recipient-name"  placeholder="Your Response"/>
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        <button type="button"  data-toggle="modal" data-target="#exampleModa" data-whatever="@fat" style={{background: "white",color: "#FE2E9A"}} onClick={responseReturn} class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>

        </div>
    )
}

export default Resform
