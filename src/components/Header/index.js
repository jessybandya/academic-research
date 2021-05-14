import React,{useEffect,useState} from 'react';
import {auth} from "./../firebase";
import {Avatar, Badge} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';

import './style.css';


function Header({user}) {
    const history = useHistory("");
    const {currentUser} = auth;
    const [school, setSchool] = useState("");



    const logout = () => {
        if (user) {
          auth.signOut();
          history.push("/login");
        }
      }

    return (
        <div>
            {currentUser &&(
            <nav  style={{background: "#FE2E9A"}} class="navbar navbar-expand-lg navbar-light ">
            <Link to="/">
  <a class="navbar-brand" style={{color: "white"}} href="#">AcademyResearch</a>
  </Link>
              <button style={{color: "white"}} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span style={{color: "white"}} class="navbar-toggler-icon"></span>
              </button>
            
              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item active">
                    <a class="nav-link" href="#"> <span class="sr-only">()</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#"></a>
                  </li>
                </ul>
                <div class="dropdown" style={{border: " #FE2E9A solid 2px"}}>
                    <a style={{color: "white"}} class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to={`/myaccount/${auth?.currentUser?.uid}`}>
                      <a class="dropdown-item" style={{color: "#FE2E9A"}}  href="#">My Account</a>
                      </Link>
                      <a class="dropdown-item" style={{color: "#FE2E9A"}}  href="#" onClick={logout}>Logout</a>
                    </div>
                  </div>
                <form class="form-inline my-2 my-lg-0">
                    <h5 style={{color: "white"}}  class=" mr-sm-2" >{user?.displayName}</h5>
                  {/* <input class="form-control mr-sm-2" type="search" placeholder="Search"/> */}
                  {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit"></button> */}
                  <Avatar src={user?.photoURL}/>
                  
                </form>
              </div>
            </nav>
            )}

{!currentUser &&(
            <nav style={{background: "#FE2E9A"}} class="navbar navbar-expand-lg navbar-light ">
            <a class="navbar-brand" style={{color: "white"}} href="#">AcademyResearch</a>
              <button style={{color: "white"}} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span style={{color: "white"}} class="navbar-toggler-icon"></span>
              </button>
            
              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item active">
                    <a class="nav-link" href="#"> <span class="sr-only">()</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#"></a>
                  </li>
                </ul>
                
                   
                    <a href="/login" style={{color: "white"}}  class=" mr-sm-2" >SignIn</a>
                  
                  <a style={{color: "white"}} href="/register">Create account</a>
              </div>
            </nav>
            )}    

        </div>
    )
}

export default Header
