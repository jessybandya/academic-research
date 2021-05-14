import { Link } from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import './style.css';
import { useDispatch, useSelector } from "react-redux";

import {auth, provider} from './../firebase';
import {useHistory} from 'react-router-dom';import Header from "./../Header";
import GoogleLogin from "./../Googlelogin";
import Facebooklogin from "./../Facebooklogin";
import Twitterlogin from "./../Twitterlogin";
import Gitlogin from "./../Gitlogin";


function Login() {





    const {currentUser} = auth
    const [email, setEmail] = useState('');
    const history = useHistory('');
    const [password, setPassword] = useState('');


    const login = (e)=> {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>{
          history.push(`/`); 
        })
        .catch((e) =>{
            if (
                e.message ===
                alert(e.message)
                
                
                ) {
                alert("The password is invalid or the user does not have a password");
            } else if (
                e.message ===
                alert(e.message)
            ) {
                history.push("/signup");
                window.scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }
        })
    }
    return (
        <div>
            <Header />
            <div class="container bg-white pb-5">
            <div class="col-lg-4 offset-lg-2 col-md-6 offset-md-3" style={{maxWidth: "100%"}}>
            <div class="pt-4">
                {/* <h6 style={{color: "lightblue"}}><span class="fa fa-superpowers text-primary px-md-2"></span>University Of nairobi</h6> */}
            </div>
        <div class="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <div class="pt-4">
                <h6><span class="fa fa-superpowers text-primary px-md-2"></span></h6>
            </div>
            <div class="mt-3 mt-md-5">
                <h5 style={{color: "#FE2E9A"}}>Log in to your account</h5>
                <form class="pt-4">
                    <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}} for="email">School Email</label> <input style={{color: "#6495ED"}} onChange={(e) => setEmail(e.target.value)}  type="email" name="" id="emailId" class="border-bottom border-primary"/> </div>
                    <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}} for="password">Password</label> <input style={{color: "#6495ED"}}  type="password" onChange={(e) => setPassword(e.target.value)}   name="passwrd" id="pwd" class="border-bottom border-primary"/> </div>
                    <div class="d-flex jusity-content-end pb-4">
                        <div class="ml-auto"> <a href="#" class="text-danger text-decoration-none"></a> </div>
                    </div> <input type="button" onClick={login} type="submit" value="Log in" style={{background: "#FE2E9A"}} class="btn btn-primary btn-block mb-3"/> 
                    <div style={{flexWrap: "wrap",display: "flex",maxWidth: "100%"}}>
                    <GoogleLogin class="btn btn-primary btn-block mb-3"/>
                    <Facebooklogin class="btn btn-primary btn-block mb-3"/>
                    </div>
                    
                    {/* <Twitterlogin />
                    <Gitlogin /> */}
                    <div class="register mt-5">
                        <p>Don't have an account? <a style={{color: "#FE2E9A"}} href="/register">Create an account</a></p>
                    </div>
                </form>
                                </div>

        </div>
    </div>
</div>
        </div>
    )
}

export default Login
