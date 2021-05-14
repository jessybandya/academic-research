import { useEffect,useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, facebookProvider } from "../firebase";
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login';
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../../features/user/userSlice";

const Facebooklogin = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  // const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/");
      }
    });
  }, [user]);

  const handleAuth = () => {
    if (!user) {
      auth
        .signInWithPopup(facebookProvider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/login");
        })
        .catch((err) => alert(err.message));
    }
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );
  };
 

  return (
    <div>
      
{/* <GoogleButton style={{background: "#FE2E9A",marginLeft: "40px"}}
        onClick={handleAuth}
      /> */}
      {/* <button >Facebook Login</button> */}
      <div style={{background: "",marginTop: "10px",maxWidth: "100%"}}>
      <FacebookLogin class="btn btn-primary btn-block mb-3"
   onClick={handleAuth}
   />
      </div>
 
  
    
    </div>
  );
};



export default Facebooklogin;
