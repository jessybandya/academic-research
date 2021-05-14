import React, {useState}  from 'react';
import Header from "./../Header";
import FormSelect from './../forms/FormSelect';
import { useHistory, Link } from 'react-router-dom';
import {auth,db} from './../firebase';

//email, displayName, photoUrl, school
function Register() {

    const history = useHistory("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [school, setSchool] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

    const register = (event) => {
        event.preventDefault();
        let errors = {};

        if (!firstName.trim()) {
            errors.firstName = alert('First name is required');
          } else if (!/^[A-Za-z]+/.test(firstName.trim())) {
              errors.firstName = alert('Enter a valid first name');
          }else if(!lastName.trim()){
            errors.lastName = alert('Last name is required');
        }else if(!school.trim()){
            errors.school = alert('University name is required');
        } else if (!/^[a-zA-Z0-9]+/.test(school.trim())) {
            errors.school = alert('');
        }else if (!email) {
            errors.email = alert('Student Email is required');
           } else if (!/\S+@[students]+\.[uonbi]+\.[ac]+\.[ke]+/.test(email)) {
             errors.email = alert('Student Email address is invalid\nFormat (...@students.uonbi.ac.ke)');
              }
              else if (!password) {
             errors.password = alert('Password is required');
          } else if (password.length < 8) {
             errors.password = alert('Password needs to be 8 characters or more');
          }  else if (!password1) {
             errors.password1 = alert('Confirm Password is required');
           } else if (password1 !== password) {
            errors.password1 = alert('Passwords do not match');
          }else{
            db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

                // resultSnapShot is an array of docs where "email" === "user_mail"
        
                if (resultSnapShot.size == 0) {
                    //Proceed
        
                    auth
                    .createUserWithEmailAndPassword(email, password)
                    .then((auth) => {
                        if (auth.user) {
                            auth.user.updateProfile({
                                displayName: firstName + " " + lastName,
                                photoURL: "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
                            }).then((s) => {
                                db.collection('users').doc(auth.user.uid).set({
                                    uid: auth.user.uid,
                                    displayName: firstName + " " + lastName,
                                    email: auth.user.email,
                                    photoURL: "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
                                    school:school,
                                    read: true,
                                    timestamp: Date.now()
                                })
                                    .then((r) => {
                                        history.push("/")
                                    })
                            })
                        }
                    })
                    .catch((e) => {
                        if (
                            e.message ===
                            alert(e.message)
                        ) {
                            alert("Please check your credentials again");
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
                    });
        
                } else {
                    //Already registered
                    alert("The email you enterd already in use")
                }
        
            })
          }
    }
    return (
        <div>
            <Header />
            <div class="">
    <div class="">
       
        <div class="col-lg-4 offset-lg-2 col-md-6 offset-md-3" style={{maxWidth: "70%"}}>
            <div class="pt-4">
                {/* <h6 style={{color: "lightblue"}}><span class="fa fa-superpowers text-primary px-md-2"></span>University Of nairobi</h6> */}
            </div>
            <div class="mt-3 mt-md-5">
                
                <h5 style={{color: "#FE2E9A"}}>Create an Account</h5>
                <form class="pt-4">
                <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}} for="text">First Name</label> <input style={{color: "#FE2E9A"}} type="text" onChange={(e) => {
                                setFirstName(e.target.value);
                            }} name="name1" id="emailId" class="border-bottom border-primary" required/> </div>
                    <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}}  for="text">Last Name</label> <input style={{color: "#FE2E9A"}} type="text" onChange={(e) => {
                                setLastName(e.target.value)
                            }} name="name3"  id="pwd" class="border-bottom border-primary" required/> </div>
           
                    <div style={{display: "flex",color: "#FE2E9A"}}>
                    <FormSelect style={{color: "#FE2E9A"}}
                        
                        
             label="Institution"
              
              options={[{
                value: "",
                name: ""
              },
              {
                value: "University Of Nairobi",
                name: "University Of Nairobi"
              }, {
                value: "Kenyatta University",
                name: "Kenyatta University"
              }, {
                value: "Jomo Kenyatta University",
                name: "Jomo Kenyatta University"
              }]} 
              required=""             onChange={(e) => setSchool(e.target.value)} type="text" 
            />
                      
          
                    </div>
                    
           

                    <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}} for="email">School Email</label> <input style={{color: "#FE2E9A"}} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" name="email" id="emailId" class="border-bottom border-primary"/> </div>
                    <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}} for="password"> Set Password</label> <input style={{color: "#FE2E9A"}} type="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} name="passwrd" id="pwd" class="border-bottom border-primary"/> </div>
                            <div class="d-flex flex-column pb-3"> <label style={{background: "#FE2E9A",color:"white",borderRadius: "10px"}} for="password">Confirm Password</label> <input style={{color: "#FE2E9A"}} type="password" onChange={(e) => {
                                setPassword1(e.target.value)
                            }} name="passwrd" id="pwd" class="border-bottom border-primary"/> </div>                 
                    
                    <div class="d-flex jusity-content-end pb-4">
   
                    </div> <input type="button" onClick={register}
                            type="submit" style={{background: "#FE2E9A"}} value="Sign up" class="btn btn-primary btn-block mb-3" /> 
                    <div class="register mt-5">
                        <p>Do you have an account? <a href="/login" style={{color: "#FE2E9A"}}>click here</a></p>
                    </div>
                </form>
                                </div>

        </div>
    </div>
</div>
        </div>
    )
}

export default Register
