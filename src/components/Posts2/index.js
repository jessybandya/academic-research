import React, { useState, useEffect } from 'react'
import Posts from './Posts';
import './style.css';
import { db } from './../firebase';
import { auth } from './../firebase';

import { useHistory } from 'react-router-dom';

function Posts1() {
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


    // document.title = 'Facebook';

    

    useEffect(() => {
        db.collection('forms').where("read","==", true).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    console.log(posts)

    
    return (
        <div className="posts">
            {
                posts.map(({ id, post }) => (
                    < Posts key={id} field={post.field} formId={id} ownerDisplayName={post.ownerDisplayName} ownerEmail={post.ownerEmail} ownerId={post.ownerId} ownerPhotoURL={post.ownerPhotoURL} timestamp={post.timestamp} topic={post.topic} user={user} read={post.read} location={post.location} max={post.max} min={post.min}   topic1={post.topic1} field1={post.field1} location1={post.location1}
                    />
                ))
            }
        </div>
    )
}

export default Posts1