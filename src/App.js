
import './App.css';
import React, {useEffect,useState} from "react";
import Home from "./components/Home";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"
import Header from "./components/Header";
import Posts from "./components/Posts1";
import Resform from "./components/Resform";
import Allforms from "./components/Allforms";
import Findings from "./components/Findings";
import Myaccount from "./components/Myaccount";
import Books from "./components/Books";
import {useHistory} from "react-router-dom"
import {auth} from "./components/firebase";
function App() {
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

 

  return (
    <div className="App">
     <Router>
       <Switch>
       <Route exact path="/myaccount/:id" component={Myaccount}/>
       <Route exact path="/">
           <Home user={user} />
         </Route>
         
       
         {/* <Route path="/login"
            render={ () => auth.currentUser ? <Redirect to="/" /> :(
              <Login />   
                 
           )}/>  

       <Route path="/"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Home user={user} />
                 
           )}/>   */}

       {/* <Route path="/register"
            render={ () => auth.currentUser ? <Redirect to="/register" /> :(
              <Register/>
                 
           )}/>   */}
           <Route exact path="/login" component={Login}/>
           <Route exact path="/register" component={Register}/>
           <Route exact path="/books" component={Books}/>
           <Route exact path="/respond/:id" component={Resform}/>
           <Route exact path="/allforms">
           <Allforms user={user} />
         </Route>
         <Route exact path="/findings">
           <Findings user={user} />
         </Route>
           <Route exact >
           <Header user={user} />
         </Route>
         <Route exact >
           <Resform user={user} />
         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
