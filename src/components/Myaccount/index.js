import React, {useState,useEffect} from 'react'
import "./style.css";
import { db, auth } from "./../firebase";
import Header from "./../Header";
import {useParams} from "react-router-dom";
import {Avatar, Badge} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Myposts from "./../Myposts1";
import {useHistory} from "react-router-dom";


function Myaccount() {

  
  const history = useHistory('');

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
    let { id } = useParams();
    const [post, setPost] = useState([]);

    const [followersCount1, setFollowers1]= useState(0);
    useEffect(() => {
      db.collection('resform').where("ownerFormId", "==",id).where("read1","==", true)
     .onSnapshot(snapshot => (
      setFollowers1(snapshot.docs.length)
     ))
  }, []);

    const [followersCount, setFollowers]= useState(0);
    useEffect(() => {
      db.collection('forms').where("ownerId", "==",id).where("read1","==", false)
     .onSnapshot(snapshot => (
      setFollowers(snapshot.docs.length)
     ))
  }, []);

    useEffect(() => {
        db.collection('users').doc(id).get().then(
            snapshot => setPost(snapshot.data())
        ).catch(
        )
        
     
    }, []);

 
    return (
        <div>
            <Header user={user} />
            <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div  class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div style={{background: "#FE2E9A"}} class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src={user?.photoURL} style={{height: "80px",borderRadius: "50px",width: "80px"}} class="img-radius" alt="User-Profile-Image"/> </div>
                                <h6 class="f-w-600">{user?.displayName}</h6>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 style={{color: "#FE2E9A"}} class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p style={{color: "#FE2E9A"}} class="m-b-10 f-w-600">Username</p>
                                        <h6 class="text-muted f-w-400">{user?.displayName}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p style={{color: "#FE2E9A"}} class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400">{user?.email}</h6>
                                    </div>
                                </div>
                                <h6 style={{color: "#FE2E9A"}} class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p style={{color: "#FE2E9A"}} class="m-b-10 f-w-600">Number Of My forms</p>
                                        <h6 class="text-muted f-w-400">{followersCount}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p style={{color: "#FE2E9A"}} class="m-b-10 f-w-600">Number of Participants</p>
                                        <h6 class="text-muted f-w-400">{followersCount1}</h6>
                                    </div>
                                </div>
                                {/* <Button style={{background: "#FE2E9A",color: "white",marginTop: "60px"}} class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" variant="contained" color="primary">
        My Forms
      </Button> */}
      <button type="button"  data-toggle="modal" data-target="#exampleModal4" data-whatever="@fat" style={{background: "#FE2E9A",color: "white",marginTop: "60px"}} class="btn btn-primary">My Forms</button>
      <div  class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style={{color: "#FE2E9A"}} id="exampleModalLabel">My Forms</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
          <Myposts />
</div>
<div class="modal-footer">
        <button type="button" style={{background: "#FE2E9A",color: "white"}} class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
</div>
</div>

                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    )
}

export default Myaccount
